import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProjectProvider } from "./contexts/projects.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  <React.StrictMode>
  <ProjectProvider>
    <App />
  </ProjectProvider>
  //</React.StrictMode>
);
