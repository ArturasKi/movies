import Nav from "../Nav";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

function Crud() {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-left">
            <Create />
          </div>
          <div className="col-left">
            <List />
          </div>
        </div>
      </div>
      <Edit/>
    </>
  );
}
export default Crud;
