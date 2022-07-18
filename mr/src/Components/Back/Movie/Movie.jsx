import { useContext } from 'react';
import BackContext from "../BackContext";


function Movie({movie}) {

    const { setDeleteMovie, setModalMovie } = useContext(BackContext);

    const handleDelete = () => {
      setDeleteMovie(movie);
    }

    const handleEdit = () => {
      setModalMovie(movie);
    }

  return (

      <>
        <div className='form-group'>
          <b>Movie title: {movie.title}{' '}</b>
          <b>Price: {movie.price.toFixed(2)} EUR{' '}</b>
          <b>Rating: {movie.rating.toFixed(1)}/10</b>
          <b>Category: {movie.cat}</b>
          {
            movie.photo ? <div className="photo-bin"><img src={movie.photo} alt='nice'/></div> : null
          }
        </div>
        <div className="buttons">
          <button type="button" onClick={handleEdit}>Edit</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
      </>
  );
}

export default Movie;
