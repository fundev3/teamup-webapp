import { NavLink } from "react-router-dom";
import React from "react";
import logoNavbar from "../../assets/logo-teamup1.png";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./NavBar.scss";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <div className="logo-content">
          <img alt="logo" src={logoNavbar} style={{ height: "42px" }} />
        </div>
        <div className="navbar-content">
          <NavLink
            activeStyle={{
              color: "#64ffda",
              fontWeight: "bold",
            }}
            className="navbar-label"
            exact
            style={{ color: "#ffffff", textDecoration: "none" }}
            to="/"
          >
            <Typography variant="h6">Home</Typography>
          </NavLink>
          <NavLink
            activeStyle={{
              color: "#64ffda",
              fontWeight: "bold",
            }}
            className="navbar-label"
            exact
            style={{ color: "#ffffff", textDecoration: "none" }}
            to="/projects"
          >
            <Typography variant="h6">Projects</Typography>
          </NavLink>
          <NavLink
            activeStyle={{
              color: "#64ffda",
              fontWeight: "bold",
            }}
            className="navbar-label"
            exact
            style={{ color: "#ffffff", textDecoration: "none" }}
            to="/resumes"
          >
            <Typography variant="h6">Resumes</Typography>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
