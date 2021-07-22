import Project from "../ProjectForm/ProjectDetail";
import ProjectForm from "../ProjectForm/ProjectForm";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
