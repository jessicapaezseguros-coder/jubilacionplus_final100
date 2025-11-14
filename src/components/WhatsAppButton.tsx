import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/59897113110"
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="34"
        height="34"
      >
        <path
          fill="#25D366"
          d="M16.04 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.1 7L4 29l7-2c2 1.3 4.5 2 7.1 2 6.7 0 12-5.3 12-12S22.7 3 16.04 3zm6.9 16.9c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.3.2-2.1-.1-.5-.1-1.1-.4-1.9-.8-.8-.4-1.8-1.2-2.9-2.3-1-1-1.6-2-1.9-2.8-.2-.7-.2-1.3-.1-1.8.1-.4.4-.7.7-.9.2-.1.5-.3.8-.3h.6c.2 0 .5-.1.7.6.3.7.9 2.3 1 2.5.1.2.1.4 0 .5s-.1.2-.3.4-.5.5-.6.6-.2.2 0 .5c.3.5 1.3 2 2.9 3.2 1.3 1 2.3 1.3 2.7 1.5.3.1.5.1.6 0s.4-.2.7-.5c.3-.3.6-.3.8-.2.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.1.1.9-.2 1.6z"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
