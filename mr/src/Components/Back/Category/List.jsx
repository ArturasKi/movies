import { useContext } from "react";
import Category from "./Category";
import BackContext from "../BackContext";

function List() {

    const {categories} = useContext(BackContext);

    return (
    <div className="cards">
        <div className="card">
            <div className="card-header">
              <h2>List of Categories</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    categories ? categories.map(c => <Category key={c.id} category={c}></Category>) : null
                    }
                </ul>
            </div>
          </div>
    </div>
    )
}

export default List;