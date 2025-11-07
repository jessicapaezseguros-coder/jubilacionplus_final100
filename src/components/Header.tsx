// src/components/Header.tsx
import React from "react";
import "../Styles/Header.css";
import logo from "/public/logo_jubilacion_plus_1024.png";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src={logo} alt="Logo Jubilación Plus" className="app-logo" />
        <div className="header-text">
          <h1 className="main-title">JUBILACIÓN +</h1>
          <h2 className="script-title">Anticipate</h2>
          <p className="subtitle">
            LIC. JESSICA PÁEZ <br />
            ASESORA TÉCNICA EN SEGUROS PERSONALES
          </p>
          <p className="tagline">Tu Futuro. Tu Plan.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
