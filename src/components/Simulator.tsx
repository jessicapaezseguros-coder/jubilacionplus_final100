import React, { useState } from "react";
import QuestionsColumn from "./QuestionsColumn";
import Tooltip from "./Tooltip";
import Results from "./Results";
import "./Simulator.css";

type Regimen = "BPS" | "CP";

const ESCALONES_CAJA = [
  { value: "1esp", label: "1ra. Especial – cuota unificada $ 3.241" },
  { value: "1", label: "1ra – cuota unificada $ 6.447" },
  { value: "2", label: "2da – cuota unificada $ 12.196" },
  { value: "3", label: "3ra – cuota unificada $ 17.282" },
  { value: "4", label: "4ta – cuota unificada $ 21.679" },
  { value: "5", label: "5ta – cuota unificada $ 25.383" },
  { value: "6", label: "6ta – cuota unificada $ 28.434" },
  { value: "7", label: "7ma – cuota unificada $ 30.822" },
  { value: "8", label: "8va – cuota unificada $ 32.506" },
  { value: "9", label: "9na – cuota unificada $ 33.527" },
  { value: "10", label: "10ma – cuota unificada $ 33.855" },
];

const Simulator: React.FC = () => {
  const [regimen, setRegimen] = useState<Regimen>("BPS");

  const [form, setForm] = useState({
    edad: "",
    retiro: "",
    aportes: "",
    ingreso: "",
    aportaAfap: "No",
    afap: "",
    escalonCaja: "",
  });

  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    // más adelante se puede usar form + regimen para el cálculo real
    setShowResults(true);
  };

  if (showResults) {
    return <Results />;
  }

  return (
    <div className="simulator-wrapper">
      {/* COLUMNA IZQUIERDA – FORMULARIO */}
      <div className="simulator-column">
        <div className="simulator-card fade-in">
          <h2 className="sim-title">Simulá tu jubilación</h2>

          {/* Botones BPS / Caja */}
          <div className="regimen-toggle">
            <button
              type="button"
              className={`regimen-btn ${regimen === "BPS" ? "active" : ""}`}
              onClick={() => setRegimen("BPS")}
            >
              BPS
            </button>
            <button
              type="button"
              className={`regimen-btn ${regimen === "CP" ? "active" : ""}`}
              onClick={() => setRegimen("CP")}
            >
              Caja de Profesionales
            </button>
          </div>

          <label>Edad actual</label>
          <input
            type="number"
            value={form.edad}
            onChange={(e) => setForm({ ...form, edad: e.target.value })}
          />

          <label>Edad de retiro</label>
          <input
            type="number"
            value={form.retiro}
            onChange={(e) => setForm({ ...form, retiro: e.target.value })}
          />

          <label>Años aportados hasta la fecha</label>
          <input
            type="number"
            value={form.aportes}
            onChange={(e) => setForm({ ...form, aportes: e.target.value })}
          />

          {/* Campo variable según régimen */}
          {regimen === "BPS" ? (
            <>
              <label>Ingreso mensual líquido ($)</label>
              <input
                type="number"
                value={form.ingreso}
                onChange={(e) =>
                  setForm({ ...form, ingreso: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <label>Escalón de aporte (cuota unificada)</label>
              <select
                value={form.escalonCaja}
                onChange={(e) =>
                  setForm({ ...form, escalonCaja: e.target.value })
                }
              >
                <option value="">Seleccione...</option>
                {ESCALONES_CAJA.map((esc) => (
                  <option key={esc.value} value={esc.value}>
                    {esc.label}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>
            ¿Aporta a AFAP?
            <Tooltip
              text="💡 El Ahorro AFAP es el dinero que tenés acumulado en tu cuenta individual dentro de una administradora. Proviene de una parte de tus aportes jubilatorios que se invierte mes a mes. Este valor refleja el ahorro estimado al momento del retiro, no la jubilación o renta futura que pueda generarse."
            />
          </label>
          <select
            value={form.aportaAfap}
            onChange={(e) =>
              setForm({ ...form, aportaAfap: e.target.value })
            }
          >
            <option>No</option>
            <option>Sí</option>
          </select>

          {form.aportaAfap === "Sí" && (
            <>
              <label>Seleccione su AFAP</label>
              <select
                value={form.afap}
                onChange={(e) =>
                  setForm({ ...form, afap: e.target.value })
                }
              >
                <option value="">Seleccione...</option>
                <option value="sura">SURA</option>
                <option value="republica">República AFAP</option>
                <option value="integracion">Integración</option>
                <option value="union">Unión Capital</option>
              </select>
            </>
          )}

          <button
            className="btn-calcular"
            type="button"
            onClick={handleCalculate}
          >
            Calcular
          </button>
        </div>
      </div>

      {/* COLUMNA DERECHA – BLOQUE PREGUNTAS / IA */}
      <QuestionsColumn />
    </div>
  );
};

export default Simulator;
