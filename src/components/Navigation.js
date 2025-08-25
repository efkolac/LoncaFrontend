import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            All-Time Sales
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/monthly"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Monthly Sales
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
