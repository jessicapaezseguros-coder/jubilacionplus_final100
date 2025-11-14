import React from "react";
import "../styles/FloatingWhatsApp.css";

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/59897113110"
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        className="floating-whatsapp-icon"
      />
    </a>
  );
};

export default FloatingWhatsApp;
