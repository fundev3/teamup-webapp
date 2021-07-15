import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//import App from "./components/App/App";
import Resume from "./components/ResumeDetail/ResumeDetail";

ReactDOM.render(
  <React.StrictMode>
    <Resume userId="1" />
  </React.StrictMode>,
  document.getElementById("root")
);
