import { useState } from "react";
import { useContext } from "react";
import BackContext from "../BackContext";

function Create() {

  const { setCreateCategory } = useContext(BackContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = {title}; // pasakom iš ko susideda objektas;
    setCreateCategory(data); // po paspaudimo sukuriamas objektas;
    setTitle(''); // po paspaudimo Title input'o tekstas išsitrina;
  }


  return (
    <div className="cards">
      <div className="card">
        <div className="card-header">
          <h2>Create new Category</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)}></input>
            <small className="form-text text-muted">
              Enter category title here.
            </small>
          </div>
          <button type="button" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default Create;
