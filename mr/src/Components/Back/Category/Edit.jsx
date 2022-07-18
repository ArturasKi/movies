import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {
  const { modalCategory, setEditCategory, setModalCategory } = useContext(BackContext);

  const [title, setTitle] = useState("");

  // paspaudus edit, modal data is null gauna objekta, pasikeicia modal data ir persirenderina viskas;
  useEffect(() => {
    if (null === modalCategory) {
      return;
    }
    setTitle(modalCategory.title);
  }, [modalCategory]);

  const handleEdit = () => {
    const data = { title, id: modalCategory.id }; // edit'e ID nesiredaguoja, paimamas toks koks buvo gautas kuriant;
    setEditCategory(data);
    setModalCategory(null);
  };

  if (modalCategory === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit Category</h2>
            <button
              type="button"
              className="close"
              onClick={() => setModalCategory(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <small className="form-text">
                Enter category title here.
              </small>
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalCategory(null)}>Close</button>
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Edit;