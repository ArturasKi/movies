import { useContext } from 'react';
import BackContext from "../BackContext";


function Category({category}) {

    const { setDeleteCategory, setModalCategory } = useContext(BackContext);

    const handleDelete = () => {
      setDeleteCategory(category);
    }

    const handleEdit = () => {
      setModalCategory(category);
    }

  return (

      <>
        <div className="content">
          <b>{category.id}.{' '}</b>
          <b>{category.title}</b>
        </div>
        <div className="buttons">
          <button type="button" onClick={handleEdit}>Edit</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
      </>

  );
}

export default Category;
