// -----------------------------------------------------------------------------
// IAAnswers.tsx – Bloque “3 millones de preguntas”
// Estética congelada – Jubilación+
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import "./IAAnswers.css";

const PREGUNTAS = [
  {
    id: 1,
    titulo: "¿Cuánto necesito aportar para jubilarme tranquilo?",
    respuesta:
      "Depende de tu historia laboral, ingresos y si estás en régimen mixto. Como referencia educativa, apuntar a un 45%–65% de tasa de reemplazo permite un retiro más estable."
  },
  {
    id: 2,
    titulo: "¿Conviene aportar más años o más ingreso?",
    respuesta:
      "Ambos influyen, pero los años aportados incrementan directamente tu porcentaje jubilatorio. Sumar años reales de aporte tiene un impacto más fuerte."
  },
  {
    id: 3,
    titulo: "¿La AFAP mejora mi jubilación?",
    respuesta:
      "En régimen mixto, la AFAP agrega un componente de ahorro individual que se suma a la jubilación BPS."
  },
  {
    id: 4,
    titulo: "¿Qué pasa si aporté en varios trabajos?",
    respuesta:
      "BPS integra automáticamente tus historias laborales. Si hubo períodos sin declaración, conviene revisarlos en 'Mi Historia Laboral'."
  },
  {
    id: 5,
    titulo: "¿Puedo jubilarme antes?",
    respuesta:
      "El retiro general exige 60 años + 30 de servicio. Los retiros anticipados son excepcionales y dependen de normativa especial."
  },
  {
    id: 6,
    titulo: "¿Qué es la BPJ?",
    respuesta:
      "Es el promedio de tus mejores 20 años de remuneración ajustados. Si mejora tu promedio, mejora tu jubilación."
  },
  {
    id: 7,
    titulo: "¿Cuánto afecta un año sin aportar?",
    respuesta:
      "Reduce porcentaje final y puede bajar el promedio salarial si cae dentro de los mejores 20 años."
  },
  {
    id: 8,
    titulo: "¿Qué ingresos toma BPS para el cálculo?",
    respuesta:
      "Se consideran remuneraciones formales ajustadas por IMS. Variables u horas extras dependen del tipo de aporte."
  },
  {
    id: 9,
    titulo: "¿La Caja de Profesionales funciona igual?",
    respuesta:
      "No. Usa ficto + cuota unificada. No depende del salario real sino del escalón legal."
  },
  {
    id: 10,
    titulo: "¿Conviene ahorrar además del sistema público?",
    respuesta:
      "Sí. Un ahorro o renta complementaria mejora tu ingreso y reduce riesgo financiero futuro."
  }
];

const IAAnswers: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState<number | null>(null);

  const filtradas = PREGUNTAS.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const activa = PREGUNTAS.find((p) => p.id === seleccionada);

  return (
    <div className="ia-answers-wrapper fade-in">
      <h3>Respuestas a las preguntas que nos hacemos 3 millones antes de jubilarnos</h3>

      {/* BUSCADOR */}
      <div className="ia-search-bar">
        <input
          type="text"
          placeholder="Buscá tu pregunta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <span className="lupa">🔍</span>
      </div>

      {/* LISTA */}
      <ul className="preguntas-lista">
        {filtradas.map((p) => (
          <li
            key={p.id}
            className={p.id === seleccionada ? "activa" : ""}
            onClick={() =>
              setSeleccionada(p.id === seleccionada ? null : p.id)
            }
          >
            {p.titulo}
          </li>
        ))}
      </ul>

      {/* RESPUESTA */}
      {activa && (
        <div className="respuesta-card fade-in">
          <p>{activa.respuesta}</p>
          <p className="footer-ia">
            Contenido generado por IA para orientación educativa.
          </p>
        </div>
      )}
    </div>
  );
};

export default IAAnswers;
