import { Home } from "./Home.jsx";
import NavBar from "./NavBar";
import { Typography } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <div className="content">
          <Switch>
            <Route component={Home} exact path="/"></Route>
            <Route exact path="/projects">
              <Typography
                style={{ color: "#9E9EAA", fontWeight: "700" }}
                variant="h4"
              >
                Projects coming soon!
              </Typography>
            </Route>
            <Route exact path="/resumes">
              <Typography
                style={{ color: "#9E9EAA", fontWeight: "700" }}
                variant="h4"
              >
                Resumes coming soon!
              </Typography>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
