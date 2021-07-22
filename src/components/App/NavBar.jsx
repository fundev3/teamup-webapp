import AppBar from "@material-ui/core/AppBar";
import { NavLink } from "react-router-dom";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./NavBar.scss";

function NavBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="navbar">
          <div className="logo-content">
            <Typography
              style={{
                fontSize: "1.7rem",
                fontWeight: "700",
                letterSpacing: "-0.08em",
              }}
            >
              TeamUp
            </Typography>
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
    </div>
  );
}

export default NavBar;
