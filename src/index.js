// import App from "./components/App/App";
import React from "react";
import ReactDOM from "react-dom";
import Resume from "./components/Resume/ResumeDetail/ResumeDetail";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Resume resumeId="https://jsonplaceholder.typicode.com/users/1"></Resume>
  </React.StrictMode>,
  document.getElementById("root")
);
