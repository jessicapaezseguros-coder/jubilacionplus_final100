// src/components/App.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Simulator from "./Simulator";
import WhatsAppButton from "./WhatsAppButton";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Simulator />
      <Footer />
      {/* Botón flotante de WhatsApp (icono verde oficial en WhatsAppButton.tsx) */}
      <WhatsAppButton />
    </div>
  );
};

export default App;
