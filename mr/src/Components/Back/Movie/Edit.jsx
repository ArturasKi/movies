import { useEffect, useState, useContext, useRef } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {
  const { modalMovie, setEditMovie, setModalMovie, categories, setDeletePhoto } = useContext(BackContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  // paspaudus edit, modal data is null gauna objekta, pasikeicia modal data ir persirenderina viskas;
  useEffect(() => {
    if (null === modalMovie) {
      return;
    }
    setTitle(modalMovie.title);
    setPrice(modalMovie.price);
    setRating(modalMovie.rating);
    setCategory(categories.filter(c => c.title === modalMovie.cat)[0].id);
    setPhotoPrint(modalMovie.photo);
  }, [modalMovie, categories]);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  const handleEdit = () => {
    const data = { 
      title, 
      id: modalMovie.id, 
      price: parseFloat(price), 
      rating: parseFloat(rating), 
      category: category,
      photo: photoPrint
    }; // edit'e ID nesiredaguoja, paimamas toks koks buvo gautas kuriant;
    setEditMovie(data);
    setModalMovie(null);
  };

  const handleDelete = () => {
    setDeletePhoto({id: modalMovie.id});
    setModalMovie(p => ({...p, photo: null}));
  }

  if (modalMovie === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog col-left scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit Category</h2>
            <button
              type="button"
              className="close"
              onClick={() => setModalMovie(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}></input>
              <small className="form-text">Edit category title here.</small>
        </div>
        <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}></input>
              <small className="form-text">Edit price here.</small>
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
              <label>Rating</label>
              <input type="text" className="form-control" value={rating} onChange={(e) => setRating(e.target.value)}></input>
              <small className="form-text">Edit rating here.</small>
        </div>
        <div className="form-group">
              <label>Photo</label>
              <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
              <small className="form-text text-muted">Upload photo</small>
            </div>
              {
                photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
              }
        <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
            <button type="button" className="btn btn-outline-primary" onClick={handleDelete}>Delete photo</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalMovie(null)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Edit;