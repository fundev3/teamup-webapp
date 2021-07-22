import { Home } from "./Home.jsx";
import NavBar from "./NavBar";
import Projects from "../Project/Projects";
import React from "react";
import ResumeCreation from "../Resume/ResumeCreation.jsx";
import { Typography } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    // TODO revisit route names
    <Router>
      <NavBar />
      <div className="content">
        <Switch>
          <Route component={Home} exact path="/"></Route>
          <Route component={Projects} exact path="/projects" />
          <Route exact path="/resumes">
            <Typography
              style={{ color: "#9E9EAA", fontWeight: "700" }}
              variant="h4"
            >
              Resumes coming soon!
            </Typography>
          </Route>
          <Route exact path="/projectlist"></Route>
          <Route exact path="/projectcreation"></Route>
          <Route exact path="/projectdetail/:id"></Route>
          <Route exact path="/resumelist"></Route>
          <Route
            className="layout-resume-creation"
            component={ResumeCreation}
            exact
            path="/resumecreation"
          ></Route>
          <Route exact path="/resumedetail/:id"></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
