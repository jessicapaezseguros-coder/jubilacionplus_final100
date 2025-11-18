// -----------------------------------------------------------------------------
// App.tsx – Versión final restaurada (Proyecto Jubilación+)
// Monta únicamente el simulador, sin rutas ni pantallas adicionales.
// -----------------------------------------------------------------------------

import React from "react";
import "./App.css";
import Simulator from "./components/Simulator";

const App: React.FC = () => {
  return (
    <div className="app">
      <Simulator />
    </div>
  );
};

export default App;
