// src/config/fixed.ts
// Configuración fija del simulador Jubilación+
// Valores oficiales 2025 de la Caja de Jubilaciones y Pensiones de Profesionales Universitarios (C.J.P.P.U.)

export const MIN_RETIRO = { BPS: 65, CAJA_PROF: 65 };

// Escalones Caja de Profesionales – se muestra la cuota unificada, se calcula con sueldo ficto
export const ESCALONES_CAJA = [
  { id: "esp", label: "1ra. Especial — Cuota $3.241", cuota: 3241, valor: 34660 },
  { id: "1", label: "1ra — Cuota $6.447", cuota: 6447, valor: 34660 },
  { id: "2", label: "2da — Cuota $12.196", cuota: 12196, valor: 65565 },
  { id: "3", label: "3ra — Cuota $17.282", cuota: 17282, valor: 92916 },
  { id: "4", label: "4ta — Cuota $21.679", cuota: 21679, valor: 116552 },
  { id: "5", label: "5ta — Cuota $25.383", cuota: 25383, valor: 136470 },
  { id: "6", label: "6ta — Cuota $28.434", cuota: 28434, valor: 152872 },
  { id: "7", label: "7ma — Cuota $30.822", cuota: 30822, valor: 165708 },
  { id: "8", label: "8va — Cuota $32.506", cuota: 32506, valor: 174761 },
  { id: "9", label: "9na — Cuota $33.527", cuota: 33527, valor: 180255 },
  { id: "10", label: "10ma — Cuota $33.855", cuota: 33855, valor: 182018 },
];

export const AFAPS_HABILITADAS = [
  "República AFAP",
  "Integración AFAP",
  "Sura AFAP",
  "Santander AFAP",
];

export const TOOLTIP_AFAP =
  "💡 El Ahorro AFAP es el dinero acumulado en tu cuenta individual dentro de una administradora. Proviene de una parte de tus aportes jubilatorios que se invierte mes a mes. Este valor refleja el ahorro estimado al momento del retiro, no la jubilación o renta futura.";

export const COPY_DISCLAIMER =
  "Herramienta educativa con IA — “Anticipate” by Lic. Jessica Páez. Esta simulación es ilustrativa. Para información oficial o cálculos formales, consultá la institución previsional correspondiente.";

export const IA_CITAS = [
  {
    quote:
      "La educación previsional temprana permite reducir brechas futuras y mejorar la sostenibilidad del retiro.",
    author: "Banco de Seguros del Estado",
    year: "2024",
    source: "Informe de Educación Financiera BSE",
  },
  {
    quote:
      "Los planes complementarios de ahorro y renta vitalicia son esenciales para mantener la calidad de vida post-laboral.",
    author: "Superintendencia de Servicios Financieros – BCU",
    year: "2023",
    source: "Boletín Previsional Nº 7",
  },
];
