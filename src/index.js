import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Assuming your main App component is in the same directory as index.js
import "./index.css"; // You can import a global CSS file here

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
