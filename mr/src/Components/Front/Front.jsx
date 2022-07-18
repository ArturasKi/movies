import "../../App.scss";
import FrontContext from "./FrontContext";
import List from "./List";
import { useEffect, useState } from "react";
import axios from "axios";

function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [categories, setCategories] = useState(null);
  const [movies, setMovies] = useState(null);
  const [rateNow, setRateNow] = useState(null);

  //READ CATEGORIES
  useEffect(() => {
    axios.get("http://localhost:3003/categories").then((res) => {
      setCategories(res.data);
    });
  }, [lastUpdate]);

  //READ MOVIES
  useEffect(() => {
    axios.get("http://localhost:3003/movies").then((res) => {
      setMovies(res.data);
    });
  }, [lastUpdate]);

  // CREATE RATE
  useEffect(() => {
    if (null === rateNow) return;
    axios
      .post("http://localhost:3003/rates" + rateNow.id, rateNow)
      .then((_) => {
        setLastUpdate(Date.now()); // irasymas, update;
      })
  }, [rateNow]);

  return (
    <FrontContext.Provider
      value={{
        categories,
        movies,
        setRateNow
      }}
    >
      <div className="container">
        <div className="row">
          <List />
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;
