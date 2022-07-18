import { useContext } from "react";
import Movie from "./Movie";
import FrontContext from "./FrontContext";

function List() {

    const { movies } = useContext(FrontContext);

    return (
    <div className="front">
        <div className="row">
              <h1 className="text_shadows">Movie Rental</h1>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    movies ? movies.map(m => <Movie key={m.id} movie={m}></Movie>) : null
                    }
                </ul>
        </div>
    </div>
    )
}

export default List;