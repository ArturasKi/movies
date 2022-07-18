import { useContext } from "react";
import Movie from "./Movie";
import BackContext from "../BackContext";

function List() {

    const {movies} = useContext(BackContext);

    return (
    <div className="cards">
        <div className="card">
            <div className="card-header">
              <h2>List of Movies</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    movies ? movies.map(m => <Movie key={m.id} movie={m}></Movie>) : null
                    }
                </ul>
            </div>
          </div>
    </div>
    )
}

export default List;