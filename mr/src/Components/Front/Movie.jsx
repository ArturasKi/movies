import { useState, useContext } from "react";
import FrontContext from "./FrontContext";

function Movie({movie}) {

  const { setRateNow } = useContext(FrontContext);

  const [rate, setRate] = useState('5');

  const rateIt = e => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: movie.id
    });
  }

  return (

      <>
        <div className='form-group-list text'>
          <div className="description">
            <h2>{movie.title}{' '}</h2>
            <p className="category">Price: {movie.price.toFixed(2)} EUR{' '}</p>
            <p className="category">Rating: {movie.rating.toFixed(1)}/10</p>
            <p className="category">{movie.category}</p>
            <b>
              {
                movie.rates_sum ? 'rate: ' + (movie.rates_sum / movie.rates).toFixed(2) : 'no rates yet'
              }
            </b>
            <div className="form-group">
                    <label>Rate it!</label>
                    <select value={rate} onChange={rateIt}>
                        {
                            [...Array(10)].map((_, i) => <option key={i} value={10 - i}>{10 - i}</option>)
                        }
                    </select>
            </div>
          </div>
          {
            movie.photo ? <div className="photo-bin-list"><img src={movie.photo} alt='nice'/></div> : null
          }
        </div>
      </>
  );
}

export default Movie;
