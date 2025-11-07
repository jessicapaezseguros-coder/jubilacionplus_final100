// src/components/CalculatorTabs.tsx
import React, { useState } from "react";
import SimulationResults from "./SimulationResults";

interface CalculatorTabsProps {
  onCalculate: (data: any) => void;
  calculationData: any;
  isCalculated: boolean;
}

const CalculatorTabs: React.FC<CalculatorTabsProps> = ({
  onCalculate,
  calculationData,
  isCalculated,
}) => {
  const [activeSystem, setActiveSystem] = useState<"BPS" | "Caja">("BPS");
  const [age, setAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [income, setIncome] = useState(500);
  const [isLiquid, setIsLiquid] = useState(false);
  const [yearsContributed, setYearsContributed] = useState(0);
  const [escalon, setEscalon] = useState(1);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const adjustedIncome = isLiquid ? income : income * 0.83; // Simula descuentos
    let pension = 0;
    let educationalTip = "";
    let explanatoryTip = "";

    if (activeSystem === "BPS") {
      pension = (adjustedIncome * 0.45 * (retirementAge - age)) / 35;
      educationalTip =
        "En el sistema BPS, tu jubilación depende de tu promedio de ingresos y de los años totales aportados. Cuantos más años, mayor será tu tasa de reemplazo.";
      explanatoryTip = `Con un ingreso ${isLiquid ? "líquido" : "nominal"} de $${income} y una edad actual de ${age}, tu jubilación proyectada a los ${retirementAge} años sería aproximadamente de $${pension.toFixed(
        0
      )}.`;
    } else {
      // Caja de Profesionales
      const escalonFactor = 1 + escalon * 0.05;
      const aportesSimulados = yearsContributed * 12;
      pension = adjustedIncome * 0.6 * escalonFactor;

      educationalTip =
        "En la Caja de Profesionales, podés calcular según los años aportados o el escalón actual. No hay mínimos obligatorios y el beneficio crece con el escalón alcanzado.";
      explanatoryTip = `Con ${yearsContributed} años aportados y un escalón ${escalon}, la jubilación estimada sería de $${pension.toFixed(
        0
      )}, considerando tu ingreso ${isLiquid ? "líquido" : "nominal"}.`;
    }

    const data = {
      activeSystem,
      age,
      retirementAge,
      income,
      pension,
      educationalTip,
      explanatoryTip,
    };

    setResults(data);
    onCalculate(data);
  };

  return (
    <div>
      {/* Selector de sistema */}
      <div className="system-selector">
        <button
          className={`system-button ${
            activeSystem === "BPS" ? "active" : ""
          }`}
          onClick={() => setActiveSystem("BPS")}
        >
          BPS
        </button>
        <button
          className={`system-button ${
            activeSystem === "Caja" ? "active" : ""
          }`}
          onClick={() => setActiveSystem("Caja")}
        >
          Caja de Profesionales
        </button>
      </div>

      {/* Campos comunes */}
      <div className="input-group">
        <label>Tu Edad Actual</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Edad Deseada para Jubilación</label>
        <input
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>
          Ingreso Mensual Nominal (antes de descuentos)
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>
          <input
            type="checkbox"
            checked={isLiquid}
            onChange={() => setIsLiquid(!isLiquid)}
          />{" "}
          Calcular sobre ingreso líquido (después de descuentos)
        </label>
      </div>

      {activeSystem === "Caja" && (
        <>
          <div className="input-group">
            <label>Años Aportados</label>
            <input
              type="number"
              value={yearsContributed}
              onChange={(e) => setYearsContributed(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Escalón Actual</label>
            <input
              type="number"
              value={escalon}
              onChange={(e) => setEscalon(Number(e.target.value))}
            />
          </div>
        </>
      )}

      <button className="calculate-button" onClick={handleCalculate}>
        Calcular Proyección
      </button>

      {/* Resultados */}
      {results && <SimulationResults data={results} />}
    </div>
  );
};

export default CalculatorTabs;
