import React, { useState } from "react";
import "./Tooltip.css";

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [visible, setVisible] = useState(false);

  // Dentro del componente Tooltip
return (
  <div
    className="tooltip-container"
    onMouseEnter={() => setVisible(true)}
    onMouseLeave={() => setVisible(false)}
    onTouchStart={() => setVisible(!visible)}
  >
    <span className="tooltip-icon">i</span>
    {visible && <div className="tooltip-text">{text}</div>}
  </div>
);
};

export default Tooltip;
