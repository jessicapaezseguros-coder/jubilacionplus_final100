// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <footer>
      Lic. Jessica Páez — Asesora Técnica en Seguros Personales<br />
      <a href="https://wa.me/59897113110" target="_blank">
        WhatsApp: +598 971 131 10
      </a>{" "}
      | © Jubilación+
    </footer>
  </React.StrictMode>
);
