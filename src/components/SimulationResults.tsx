// src/components/SimulationResults.tsx
import React from "react";

interface SimulationResultsProps {
  data: {
    activeSystem: string;
    age: number;
    retirementAge: number;
    income: number;
    pension: number;
    educationalTip: string;
    explanatoryTip: string;
  };
}

const SimulationResults: React.FC<SimulationResultsProps> = ({ data }) => {
  const { activeSystem, pension, educationalTip, explanatoryTip } = data;

  // Consejo educativo (1)
  const educationalAdvice = educationalTip;

  // Consejo explicativo (2)
  const explanatoryAdvice = explanatoryTip;

  // Consejo comercial (3)
  const advisoryAdvice = `Podés mejorar tu proyección combinando esta jubilación con un seguro de renta vitalicia o ahorro + vida, diseñado a medida de tu perfil profesional.
  Si querés conocer las opciones disponibles, escribime para analizarlo juntos.`;

  return (
    <div className="results-container">
      <h3>Resultados — {activeSystem}</h3>

      <div className="result-item">
        <span>Jubilación Estimada:</span>
        <span className="result-value">${pension.toFixed(0)}</span>
      </div>

      <div className="advice-block">
        <h4>Consejo Educativo</h4>
        <p>{educationalAdvice}</p>
      </div>

      <div className="advice-block">
        <h4>Explicación de tus Datos</h4>
        <p>{explanatoryAdvice}</p>
      </div>

      <div className="advice-block">
        <h4>Asesoramiento Personalizado</h4>
        <p>{advisoryAdvice}</p>
        <a
          href="https://wa.me/59897113110?text=Hola%20Jessica%2C%20vi%20mi%20simulaci%C3%B3n%20en%20Jubilaci%C3%B3n%2B%20y%20me%20gustar%C3%ADa%20analizar%20un%20seguro%20de%20renta%20o%20ahorro%20%2B%20vida."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          📱 Contactame por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default SimulationResults;
