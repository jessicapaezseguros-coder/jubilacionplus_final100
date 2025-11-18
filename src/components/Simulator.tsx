// -----------------------------------------------------------------------------
// SIMULATOR.TSX – Pantalla 1 restaurada + lógica BPS y CJPPU nueva
// Estética congelada integrada (usa Simulator.css ya restaurado)
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import "./Simulator.css";

import { AFAPS_HABILITADAS, MIN_RETIRO } from "../config/fixed";
import {
  calcularJubilacionBpsLegal,
  calcularRentaAfapEducativa,
} from "../config/BpsLegal";

import {
  determinarTipoEscala,
  obtenerEscalonCJPPUPorId,
} from "../config/escalasCJPPU";

import QuestionsColumn from "./QuestionsColumn";
import Results from "./Results";

const Simulator: React.FC = () => {
  // ---------------------------------------------------------------------------
  // ESTADOS GENERALES
  // ---------------------------------------------------------------------------

  const [modo, setModo] = useState<"bps" | "caja">("bps");
  const [pantalla, setPantalla] = useState<1 | 2>(1);

  // ------------------------------- FORM BPS -----------------------------------

  const [formBps, setFormBps] = useState({
    edadActual: "",
    edadRetiro: "",
    añosAporte: "",
    ingreso: "",
    aportaAfap: "No",
  });

  const handleBps =
    (campo: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormBps((prev) => ({ ...prev, [campo]: e.target.value }));
    };

  // ------------------------------- FORM CAJA ----------------------------------

  const [formCaja, setFormCaja] = useState({
    nacimiento: "",
    habilitacion: "",
    categoria: "",
    anio: "2025",
    proyeccion: "No",
    aportaAfap: "No",
  });

  const handleCaja =
    (campo: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormCaja((prev) => ({ ...prev, [campo]: e.target.value }));
    };

  // ------------------------------- ERRORES ------------------------------------

  const [errorIngreso, setErrorIngreso] = useState("");
  const [errorEdad, setErrorEdad] = useState("");

  // ------------------------------- RESULTADOS ---------------------------------

  const [resultados, setResultados] = useState<any>(null);

  // ---------------------------------------------------------------------------
  // CALCULAR
  // ---------------------------------------------------------------------------

  const handleCalcular = () => {
    // ===================== BPS =====================
    if (modo === "bps") {
      const edadRetiro = Number(formBps.edadRetiro);

      if (edadRetiro < MIN_RETIRO) {
        setErrorEdad(`Para la simulación se exige mínimo ${MIN_RETIRO} años.`);
        return;
      }
      setErrorEdad("");

      // LIMPIAR 0 A LA IZQUIERDA
      const ingresoNum = Number((formBps.ingreso || "").replace(/^0+(?=\d)/, ""));

      if (isNaN(ingresoNum) || ingresoNum <= 0) {
        setErrorIngreso("El ingreso mensual debe ser mayor a 0.");
        return;
      }
      setErrorIngreso("");

      const añosAporte = Number(formBps.añosAporte) || 0;

      const base = calcularJubilacionBpsLegal(ingresoNum, añosAporte);

      const afap =
        formBps.aportaAfap === "Sí"
          ? calcularRentaAfapEducativa(ingresoNum * 0.2)
          : 0;

      setResultados({
        modo: "bps",
        proyeccionBps: base,
        complementoAfap: afap,
        total: base + afap,
        estabilidad:
          añosAporte < 20 ? 0 : añosAporte >= 30 ? 80 : 40 /* educativa */,
        detalle: {
          ingreso: ingresoNum,
          añosAporte,
        },
      });

      setPantalla(2);
      return;
    }

    // ===================== CAJA PROFESIONALES =====================

    const nacimiento = Number(formCaja.nacimiento);
    const habilitacion = Number(formCaja.habilitacion);
    const anio = Number(formCaja.anio);

    if (!nacimiento || !habilitacion) return;

    const edadRetiro = anio - nacimiento;

    if (edadRetiro < MIN_RETIRO) {
      setErrorEdad(`Para la simulación se exige mínimo ${MIN_RETIRO} años.`);
      return;
    }
    setErrorEdad("");

    const tipoEscala = determinarTipoEscala(habilitacion, nacimiento);

    const fila = obtenerEscalonCJPPUPorId(
      anio as any,
      tipoEscala,
      formCaja.categoria
    );

    if (!fila) return;

    const ficto = fila.ficto;
    const cuota = fila.cuota;

    setResultados({
      modo: "caja",
      ficto,
      cuota,
      estabilidad: fila.id <= "59-7" ? 40 : 70,
      detalle: {
        nacimiento,
        habilitacion,
        categoria: formCaja.categoria,
        anio,
      },
    });

    setPantalla(2);
  };

  // ---------------------------------------------------------------------------
  // NUEVO CÁLCULO
  // ---------------------------------------------------------------------------

  const handleNuevo = () => {
    setPantalla(1);
  };

  // ---------------------------------------------------------------------------
  // RENDER PANTALLA 1
  // ---------------------------------------------------------------------------

  const renderPantalla1 = () => (
    <div className="sim-wrapper fade-in">
      {/* TABS */}
      <div className="tabs">
        <button
          className={modo === "bps" ? "activo" : ""}
          onClick={() => setModo("bps")}
        >
          BPS
        </button>
        <button
          className={modo === "caja" ? "activo" : ""}
          onClick={() => setModo("caja")}
        >
          Caja de Profesionales
        </button>
      </div>

      {/* FORMULARIO BPS */}
      {modo === "bps" && (
        <div className="form-box">
          <label>Edad actual</label>
          <input
            type="number"
            value={formBps.edadActual}
            onChange={handleBps("edadActual")}
          />

          <label>Edad de retiro</label>
          <input
            type="number"
            value={formBps.edadRetiro}
            onChange={handleBps("edadRetiro")}
          />
          {errorEdad && <p className="error">{errorEdad}</p>}

          <label>Años aportados</label>
          <input
            type="number"
            value={formBps.añosAporte}
            onChange={handleBps("añosAporte")}
          />

          <label>Ingreso mensual líquido ($)</label>
          <input
            type="number"
            value={formBps.ingreso}
            onChange={(e) =>
              setFormBps((prev) => ({
                ...prev,
                ingreso: e.target.value.replace(/^0+(?=\d)/, ""),
              }))
            }
          />
          {errorIngreso && <p className="error">{errorIngreso}</p>}

          <label>¿Aporta a AFAP?</label>
          <select
            value={formBps.aportaAfap}
            onChange={handleBps("aportaAfap")}
          >
            <option>No</option>
            <option>Sí</option>
          </select>
        </div>
      )}

      {/* FORMULARIO CAJA */}
      {modo === "caja" && (
        <div className="form-box">
          <label>Año de nacimiento</label>
          <input
            type="number"
            value={formCaja.nacimiento}
            onChange={handleCaja("nacimiento")}
          />

          <label>Año de habilitación profesional</label>
          <input
            type="number"
            value={formCaja.habilitacion}
            onChange={handleCaja("habilitacion")}
          />

          <label>Año a simular</label>
          <select value={formCaja.anio} onChange={handleCaja("anio")}>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
          </select>

          <label>Categoría / Cuota</label>
          <select
            value={formCaja.categoria}
            onChange={handleCaja("categoria")}
          >
            <option value="">Seleccioná…</option>
            {Array.from({ length: 15 }).map((_, idx) => (
              <option key={idx} value={`59${idx + 1}`}>
                59-{idx + 1}
              </option>
            ))}
          </select>

          <label>Proyección educativa</label>
          <select
            value={formCaja.proyeccion}
            onChange={handleCaja("proyeccion")}
          >
            <option>No</option>
            <option>Sí</option>
          </select>

          <label>¿Aporta a AFAP?</label>
          <select
            value={formCaja.aportaAfap}
            onChange={handleCaja("aportaAfap")}
          >
            <option>No</option>
            <option>Sí</option>
          </select>
        </div>
      )}

      {/* COLUMNA DERECHA: PREGUNTAS IA */}
      <QuestionsColumn />

      {/* BOTÓN CALCULAR */}
      <button className="calcular" onClick={handleCalcular}>
        Calcular
      </button>
    </div>
  );

  // ---------------------------------------------------------------------------
  // RETORNO FINAL
  // ---------------------------------------------------------------------------

  if (pantalla === 2 && resultados) {
    return <Results datos={resultados} nuevoCalculo={handleNuevo} />;
  }

  return renderPantalla1();
};

export default Simulator;
