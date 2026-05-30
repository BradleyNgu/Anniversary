import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { preloadGifs } from "./assets/gifs.js";
import "./index.css";

preloadGifs();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
