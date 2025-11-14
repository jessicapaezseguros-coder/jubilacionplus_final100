import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        <span className="white">© 2025 Jubilación+</span> ·{" "}
        <span className="gold">
          Herramienta educativa con IA – “Anticipate” by Lic. Jessica Páez
        </span>
      </p>
      <p className="white">
        Esta simulación es ilustrativa. Para información oficial o cálculos
        formales, consultá la institución previsional correspondiente.
      </p>
      <p>
        <span className="gold">
          Lic. Jessica Páez – Asesora Técnica en Seguros Personales
        </span>{" "}
        · <span className="white">+598 97 113 110</span>
      </p>
    </footer>
  );
};

export default Footer;
