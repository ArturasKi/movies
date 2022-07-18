import { NavLink } from "react-router-dom";
// import Messages from "./Messages";

function Nav() {
  return (
    <>
      <nav className="nav">
        <NavLink
          to="/admin/"
          className="nav-link"
          style={(
            { isActive } // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
          ) =>
            isActive
              ? {
                  color: "crimson",
                }
              : undefined
          }
        >
          Admin
        </NavLink>
        <NavLink
          to="/admin/categories"
          className="nav-link"
          style={(
            { isActive } // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
          ) =>
            isActive
              ? {
                  color: "crimson",
                }
              : undefined
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin/movies"
          className="nav-link"
          style={(
            { isActive } // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
          ) =>
            isActive
              ? {
                  color: "crimson",
                }
              : undefined
          }
        >
          Movies
        </NavLink>
      </nav>
      {/* <Messages/> */}
    </>
  );
}

export default Nav;
