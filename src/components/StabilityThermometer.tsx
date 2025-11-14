import React from "react";
import "./StabilityThermometer.css";

type StabilityLevel = "critico" | "vulnerable" | "moderado" | "estable";

interface Props {
  /** nivel calculado por la lógica del simulador */
  level: StabilityLevel;
  /** texto corto debajo del título (“Crítico”, “Moderado”, etc.) */
  label: string;
  /** descripción educativa */
  description: string;
}

const SEGMENTS = 5;

// cantidad de segmentos encendidos por nivel
const ACTIVE_SEGMENTS: Record<StabilityLevel, number> = {
  critico: 1,
  vulnerable: 2,
  moderado: 3,
  estable: 4,
};

const StabilityThermometer: React.FC<Props> = ({
  level,
  label,
  description,
}) => {
  const activeCount = ACTIVE_SEGMENTS[level];

  return (
    <div className={`st-thermometer st-thermometer--${level}`}>
      <h3 className="st-title">Termómetro de estabilidad</h3>

      <div className="st-bar">
        {Array.from({ length: SEGMENTS }).map((_, index) => (
          <div
            key={index}
            className={
              "st-segment" +
              (index < activeCount ? " st-segment--active" : "")
            }
          />
        ))}
      </div>

      <p className="st-label">{label}</p>
      <p className="st-description">{description}</p>
    </div>
  );
};

export default StabilityThermometer;
