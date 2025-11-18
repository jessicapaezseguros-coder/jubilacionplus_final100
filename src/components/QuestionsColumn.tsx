// -----------------------------------------------------------------------------
// QuestionsColumn.tsx – Columna derecha restaurada (estética congelada final)
// Sin modificar lógicas del simulador. Solo UI fija.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import "./QuestionsColumn.css";

const LISTA_PREGUNTAS = [
  {
    id: 1,
    titulo: "¿Cuántos años necesito para jubilarme?",
    respuesta:
      "Depende del régimen: en BPS se aplican mínimos legales y mejores 20 años; en CJPPU depende de la categoría y los aportes efectivos.",
  },
  {
    id: 2,
    titulo: "¿Conviene aportar más años?",
    respuesta:
      "Generalmente sí: al aumentar los años de servicio se incrementa el porcentaje legal de sustitución, especialmente en BPS.",
  },
  {
    id: 3,
    titulo: "¿Cómo influye la AFAP?",
    respuesta:
      "La AFAP complementa la jubilación del régimen mixto. Su efecto depende del saldo acumulado y de la modalidad de retiro.",
  },
  {
    id: 4,
    titulo: "¿Qué pasa si me retiro a los 60?",
    respuesta:
      "Se aplican las reglas del régimen: en BPS impacta en el cálculo de mejores 20 años; en CJPPU depende del ficto y la categoría.",
  },
  {
    id: 5,
    titulo: "¿Puedo mejorar mi jubilación?",
    respuesta:
      "Revisando aportes, evitando lagunas y planificando el retiro según la normativa de cada régimen.",
  },
  {
    id: 6,
    titulo: "¿Qué diferencia hay entre BPS y Caja Profesional?",
    respuesta:
      "BPS aplica BPJ y mejores 20 años; CJPPU usa escalas fictas, cuotas y categorías según leyes 17.738 y 20.410.",
  },
  {
    id: 7,
    titulo: "¿Qué pasa si cambio de caja?",
    respuesta:
      "Depende del régimen. Puede generar coexistencia de años en diferentes sistemas con reglas distintas de cálculo.",
  },
  {
    id: 8,
    titulo: "¿Afecta la edad de retiro?",
    respuesta:
      "Sí: jubilarse antes o después modifica la tasa de reemplazo y el promedio de ingresos considerado.",
  },
  {
    id: 9,
    titulo: "¿Qué aportes cuentan?",
    respuesta:
      "Todos los aportes declarados y efectivos: en BPS por nómina y en CJPPU por categoría/ficto según año.",
  },
  {
    id: 10,
    titulo: "¿Es obligatorio tener AFAP?",
    respuesta:
      "Depende del año de nacimiento y del monto del aporte. El régimen mixto es obligatorio en ciertas franjas.",
  },
];

const QuestionsColumn: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState<number | null>(null);

  const filtradas = LISTA_PREGUNTAS.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="questions-col fade-in">
      <h3>Respuestas a las preguntas que nos hacemos 3 millones antes de jubilarnos.</h3>

      <input
        type="text"
        placeholder="Buscar pregunta…"
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <ul className="lista-preguntas">
        {filtradas.map((p) => (
          <li
            key={p.id}
            className={
              seleccionada === p.id ? "pregunta seleccionada" : "pregunta"
            }
            onClick={() => setSeleccionada(p.id)}
          >
            {p.titulo}
          </li>
        ))}
      </ul>

      {seleccionada && (
        <div className="respuesta-box fade-in">
          <p>{LISTA_PREGUNTAS.find((x) => x.id === seleccionada)?.respuesta}</p>
          <small className="pie-ia">
            Contenido generado por IA para orientación educativa.
          </small>
        </div>
      )}
    </div>
  );
};

export default QuestionsColumn;
