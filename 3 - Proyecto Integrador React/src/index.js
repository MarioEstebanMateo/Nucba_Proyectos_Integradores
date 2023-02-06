import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Nabvar from "./components/Nabvar";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Nabvar />
    <App />
    <Footer />
  </React.StrictMode>
);
