import "../../App.scss";
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from './BackContext';
import Nav from "./Nav";
import CategoriesCrud from './Category/Crud';
import MoviesCrud from './Movie/Crud';
// import CreateMovie from "./Movie/Create";

function Back({ show }) {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [categories, setCategories] = useState(null);
  const [createCategory, setCreateCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [modalCategory, setModalCategory] = useState(null);

  const [movies, setMovies] = useState(null);
  const [createMovie, setCreateMovie] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [modalMovie, setModalMovie] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(null);

    // READ CATEGORY
    useEffect(() => {
      axios
        .get("http://localhost:3003/admin/categories")
        .then((res) => setCategories(res.data));
    }, [lastUpdate]);

    // READ MOVIE
    useEffect(() => {
      axios
        .get("http://localhost:3003/admin/movies")
        .then((res) => setMovies(res.data));
    }, [lastUpdate]);

    // CREATE CATEGORY
  useEffect(() => {
    if (null === createCategory) return;
    axios
      .post("http://localhost:3003/admin/categories", createCategory)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "success" });
      });
  }, [createCategory]);

    // CREATE MOVIE
  useEffect(() => {
    if (null === createMovie) return;
    axios
      .post("http://localhost:3003/admin/movies", createMovie)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "success" });
      });
  }, [createMovie]);

   // DELETE CATEGORY
   useEffect(() => {
    if (null === deleteCategory) return;
    axios
      .delete("http://localhost:3003/admin/categories/" + deleteCategory.id)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteCategory]);

   // DELETE MOVIE
   useEffect(() => {
    if (null === deleteMovie) return;
    axios
      .delete("http://localhost:3003/admin/movies/" + deleteMovie.id)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteMovie]);

   // DELETE PHOTO
   useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete("http://localhost:3003/admin/photos/" + deletePhoto.id)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deletePhoto]);

  // EDIT CATEGORY
  useEffect(() => {
    if (null === editCategory) return;
    axios
      .put("http://localhost:3003/admin/categories/" + editCategory.id, editCategory)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "info" });
      });
  }, [editCategory]);

  // EDIT MOVIE
  useEffect(() => {
    if (null === editMovie) return;
    axios
      .put("http://localhost:3003/admin/movies/" + editMovie.id, editMovie)
      .then((_) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((_) => {
        // showMessage({ text: error.message, type: "info" });
      });
  }, [editMovie]);

  return (
    <BackContext.Provider value={{
      categories,
      setCreateCategory,
      setDeleteCategory,
      setEditCategory,
      modalCategory,
      setModalCategory,
      movies,
      setCreateMovie,
      setDeleteMovie,
      setEditMovie,
      modalMovie,
      setModalMovie,
      setDeletePhoto
    }}>
      {show === "admin" ? (
        <>
        <div className="container">
          <Nav />
          <div className="admin-greet">
            <h1 className="text_shadows">WELCOME TO THE MOVIES RENTAL!</h1>
          </div>
        </div>
        </>
      ) : show === "categories" ? (
        <CategoriesCrud />
      ) : show === "movies" ? (
        <MoviesCrud />
      ) : null}
    
    </BackContext.Provider>
  );
}

export default Back;
