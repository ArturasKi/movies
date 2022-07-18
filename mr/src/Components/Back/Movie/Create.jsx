import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/getBase64';

function Create() {

  const { setCreateMovie, categories } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('0');
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }
  
  const handleCreate = () => {
    const data = {
      title, 
      price: parseFloat(price), 
      rating: parseFloat(rating),
      category: parseInt(category),
      photo: photoPrint
    }; // pasakom iš ko susideda objektas;
    setCreateMovie(data); // po paspaudimo sukuriamas objektas;
    setTitle(''); // po paspaudimo Title input'o tekstas išsitrina;
    setPrice(''); // po paspaudimo Title input'o tekstas išsitrina;
    setRating(''); // po paspaudimo Title input'o tekstas išsitrina;
    setCategory('');
    setPhotoPrint(null);
    fileInput.current.value = null;
  }

    return (
      <div className="cards">
        <div className="card">
          <div className="card-header">
            <h2>Create new Movie</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}
              ></input>
              <small>Enter movie title here.</small>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}
              ></input>
              <small>Enter price here.</small>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input type="text" className="form-control" value={rating} onChange={(e) => setRating(e.target.value)}
              ></input>
              <small>Enter rating here.</small>
            </div>
            <div className="form-group">
              <label>Categories</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="0">Select category</option>
                {
                  categories ? categories.map((c) => (<option key={c.id} value={c.id}>{c.title}</option>)) : null
                }
              </select>
            </div>
            <div className="form-group">
              <label>Photo</label>
              <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
              <small className="form-text text-muted">Upload photo</small>
            </div>
              {
                photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
              }
            <button type="button" onClick={handleCreate}>Create</button>
          </div>
        </div>
      </div>
      );
}

export default Create;