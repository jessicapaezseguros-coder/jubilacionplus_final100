// -----------------------------------------------------------------------------
// reportePDF.ts – Generador de PDF institucional Jubilación+
// Aislado, sin modificar pantallas ni lógica del simulador.
// jsPDF debe estar instalado en el proyecto.
// -----------------------------------------------------------------------------

import { jsPDF } from "jspdf";

export function descargarReportePDF(resultados: any) {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });

  // ------------------ ESTILOS INSTITUCIONALES ------------------
  const verdeOscuro = "#2f3624";
  const dorado = "#c9a449";

  // ------------------ TÍTULO PRINCIPAL ------------------
  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(verdeOscuro);
  pdf.text("Reporte de Simulación Jubilación+", 40, 60);

  pdf.setDrawColor(dorado);
  pdf.setLineWidth(2);
  pdf.line(40, 75, 555, 75);

  pdf.setFontSize(12);
  pdf.setFont("Helvetica", "normal");
  pdf.setTextColor("#000000");

  let y = 110;

  const write = (label: string, value: string | number) => {
    pdf.setFont("Helvetica", "bold");
    pdf.text(`${label}:`, 40, y);
    pdf.setFont("Helvetica", "normal");
    pdf.text(String(value), 200, y);
    y += 24;
  };

  // ------------------ BLOQUE DEPENDIENTE DEL MODO ------------------
  if (resultados.modo === "bps") {
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(verdeOscuro);
    pdf.text("Simulación: BPS (Régimen General)", 40, y);
    y += 35;

    write("Ingreso declarado", `$${resultados.detalle.ingreso.toLocaleString("es-UY")}`);
    write("Años aportados", resultados.detalle.añosAporte);
    write("Jubilación base BPS", `$${resultados.proyeccionBps.toLocaleString("es-UY")}`);
    write("Complemento AFAP", `$${resultados.complementoAfap.toLocaleString("es-UY")}`);
    write("Total estimado", `$${resultados.total.toLocaleString("es-UY")}`);
    write("Estabilidad del sistema", `${resultados.estabilidad}%`);

  } else if (resultados.modo === "caja") {
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(verdeOscuro);
    pdf.text("Simulación: Caja de Profesionales Universitarios", 40, y);
    y += 35;

    write("Año de nacimiento", resultados.detalle.nacimiento);
    write("Año de habilitación", resultados.detalle.habilitacion);
    write("Categoría", resultados.detalle.categoria);
    write("Año simulado", resultados.detalle.anio);
    write("Sueldo ficto", `$${resultados.ficto.toLocaleString("es-UY")}`);
    write("Cuota mensual", `$${resultados.cuota.toLocaleString("es-UY")}`);
    write("Estabilidad del sistema", `${resultados.estabilidad}%`);
  }

  // ------------------ PIE DE PÁGINA ------------------
  pdf.setFontSize(10);
  pdf.setTextColor(verdeOscuro);
  pdf.text(
    "Este reporte es una estimación educativa. No sustituye cálculos oficiales de BPS o CJPPU.",
    40,
    790
  );
  pdf.text("Jubilación+ – Herramienta educativa.", 40, 805);
  pdf.setFont("Helvetica", "italic");
  pdf.text("Creado por: Lic. Jessica Páez – Asesora Técnica en Seguros Personales", 40, 820);

  // ------------------ DESCARGA ------------------
  pdf.save("Reporte_JubilacionPlus.pdf");
}
