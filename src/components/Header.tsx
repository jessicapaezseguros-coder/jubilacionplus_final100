import React from "react";
import "./Header.css";
import logo1x from "../assets/logo_jubilacionplus.png";
import logo2x from "../assets/logo_jubilacionplus_2x.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-wrapper">
          <img
            src={logo1x}
            srcSet={`${logo1x} 1x, ${logo2x} 2x`}
            alt="Jubilación+ – Herramienta Educativa con IA"
            className="header-logo"
          />
        </div>

        <span className="header-byline">– by Lic. Jessica Páez</span>
      </div>
    </header>
  );
}
