import AlertService from "../../helpers/AlertService";
import { Home } from "./Home.jsx";
import NavBar from "./NavBar";
import ProjectDetails from "../projects/Details";
import ProjectEntry from "../projects/Entry";
import Projects from "../projects/Projects";
import React from "react";
import ResumeDetails from "../resumes/Details";
import ResumeEntry from "../resumes/Entry";
import Resumes from "../resumes/Resumes";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Projects} exact path="/projects" />
          <Route component={ProjectEntry} exact path="/projects/entry" />
          <Route component={ProjectDetails} exact path="/projects/:id" />
          <Route component={Resumes} exact path="/resumes" />
          <Route
            className="layout-resume-creation"
            component={ResumeEntry}
            exact
            path="/resumes/entry"
          />
          <Route component={ResumeDetails} exact path="/resumes/:id" />
        </Switch>
        <AlertService />
      </div>
    </Router>
  );
}

export default App;
