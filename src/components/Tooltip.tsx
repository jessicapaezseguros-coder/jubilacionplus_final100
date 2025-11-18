import React, { useState } from "react";
import "./Tooltip.css";

type TooltipProps = {
  text: string;
};

export default function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(!visible)} /* móvil */
    >
      <span className="tooltip-icon">ℹ️</span>

      {visible && (
        <span className="tooltip-bubble fade-in-tooltip">
          {text}
        </span>
      )}
    </span>
  );
}
