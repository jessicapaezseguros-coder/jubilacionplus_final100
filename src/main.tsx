// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";

// Punto de entrada principal de la aplicación
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
