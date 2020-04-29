import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-info">
    <NavLink className="navbar-brand" to="/">
      <img
        width="35"
        height="35"
        style={{ marginRight: "10px" }}
        src={require("../img/popcorn.png")}
        className="d-inline-block align-top logo"
        alt="Logo"
      />
      Hussam-React-Movies
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <NavLink exact className="navitem nav-link" to="/">
          search
        </NavLink>
        <NavLink className="navitem nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="navitem nav-link" to="/series">
          Series
        </NavLink>
      </ul>
    </div>
  </nav>
);

export default NavBar;
