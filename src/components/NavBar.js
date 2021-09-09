import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <div>
      <NavLink
        to="/"
        exact
        activeStyle={{
          fontWeight: "bold",
          color: "black",
        }}
      >
        Home
      </NavLink>
      {" - "}
      <NavLink
        to="/about"
        activeStyle={{
          fontWeight: "bold",
          color: "black",
        }}
      >
        About
      </NavLink>
      {" - "}
      <NavLink
        to="/discover"
        activeStyle={{
          fontWeight: "bold",
          color: "black",
        }}
      >
        Discover
      </NavLink>
    </div>
  );
}
