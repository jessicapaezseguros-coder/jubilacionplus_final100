// -----------------------------------------------------------------------------
// StabilityThermometer.tsx – Termómetro restaurado (estética congelada)
// Todo el CSS inline para respetar tu estructura actual del proyecto.
// -----------------------------------------------------------------------------

import React from "react";

interface Props {
  valor: number; // porcentaje de 0 a 100
}

const StabilityThermometer: React.FC<Props> = ({ valor }) => {
  const pct = Math.max(0, Math.min(100, valor));

  return (
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        background: "#ffffff",
        border: "2px solid #c9a449",
        borderRadius: "16px",
        padding: "18px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "1.1rem",
          color: "#2f3624",
        }}
      >
        Estabilidad del sistema
      </h3>

      <div
        style={{
          height: "260px",
          width: "60px",
          margin: "0 auto",
          borderRadius: "30px",
          background: "#e5e2d6", // beige claro
          overflow: "hidden",
          display: "flex",
          flexDirection: "column-reverse",
          border: "2px solid #c9a449",
        }}
      >
        <div
          style={{
            height: `${pct}%`,
            background:
              pct < 30
                ? "#b23a48" // rojo apagado institucional
                : pct < 60
                ? "#c9a449" // dorado suave
                : "#2f3624", // verde oscuro
            transition: "height 0.8s ease-in-out",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "14px",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#2f3624",
        }}
      >
        {pct}%
      </p>
    </div>
  );
};

export default StabilityThermometer;
