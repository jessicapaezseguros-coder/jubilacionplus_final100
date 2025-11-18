// -----------------------------------------------------------------------------
// Results.tsx – Pantalla 2 restaurada (estética congelada + botón PDF)
// Compatible con toda la lógica nueva y con StabilityThermometer.
// -----------------------------------------------------------------------------

import React from "react";
import "./Results.css";
import StabilityThermometer from "./StabilityThermometer";
import { descargarReportePDF } from "../utils/reportePDF";

interface Props {
  datos: any;
  nuevoCalculo: () => void;
}

const Results: React.FC<Props> = ({ datos, nuevoCalculo }) => {
  const { modo } = datos;

  // ---------------------------- FORMATO ----------------------------
  const formato = (num: number) =>
    num?.toLocaleString("es-UY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  // ---------------------------- BLOQUES ----------------------------

  const bloqueBps = (
    <>
      <div className="tarjeta">
        <h3>Jubilación estimada BPS</h3>
        <p className="monto-destacado">${formato(datos.proyeccionBps)}</p>
      </div>

      <div className="tarjeta">
        <h3>Complemento AFAP</h3>
        <p className="monto-destacado">${formato(datos.complementoAfap)}</p>
      </div>

      <div className="tarjeta total">
        <h3>Total estimado</h3>
        <p className="monto-destacado total-monto">${formato(datos.total)}</p>
      </div>
    </>
  );

  const bloqueCaja = (
    <>
      <div className="tarjeta">
        <h3>Sueldo ficto</h3>
        <p className="monto-destacado">${formato(datos.ficto)}</p>
      </div>

      <div className="tarjeta">
        <h3>Cuota mensual</h3>
        <p className="monto-destacado">${formato(datos.cuota)}</p>
      </div>

      <div className="tarjeta total">
        <h3>Estabilidad Proyectada</h3>
        <p className="monto-destacado total-monto">
          {datos.estabilidad}%
        </p>
      </div>
    </>
  );

  // ---------------------------- RENDER ----------------------------

  return (
    <div className="results-wrapper fade-in">
      <h2 className="titulo-principal">Resultados</h2>

      <div className="grid-resultados">
        {/* COLUMNA 1 */}
        <div className="columna-izq">
          {modo === "bps" ? bloqueBps : bloqueCaja}
        </div>

        {/* COLUMNA 2 – TERMÓMETRO */}
        <div className="columna-thermo">
          <StabilityThermometer valor={datos.estabilidad} />
        </div>

        {/* COLUMNA 3 – DETALLE */}
        <div className="columna-detalle">
          <div className="tarjeta-detalle">
            <h3>Detalle del cálculo</h3>

            {modo === "bps" ? (
              <>
                <p><strong>Ingreso declarado:</strong> ${formato(datos.detalle.ingreso)}</p>
                <p><strong>Años aportados:</strong> {datos.detalle.añosAporte}</p>
              </>
            ) : (
              <>
                <p><strong>Año nacimiento:</strong> {datos.detalle.nacimiento}</p>
                <p><strong>Habilitación:</strong> {datos.detalle.habilitacion}</p>
                <p><strong>Categoría:</strong> {datos.detalle.categoria}</p>
                <p><strong>Año simulado:</strong> {datos.detalle.anio}</p>
              </>
            )}
          </div>
        </div>

        {/* COLUMNA 4 – ACCIONES */}
        <div
          className="columna-acciones"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            justifyContent: "flex-start",
          }}
        >
          <button className="btn-volver" onClick={nuevoCalculo}>
            Nuevo cálculo
          </button>

          <button
            className="btn-volver"
            style={{ backgroundColor: "#c9a449", color: "#2f3624" }}
            onClick={() => descargarReportePDF(datos)}
          >
            Descargar reporte PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
