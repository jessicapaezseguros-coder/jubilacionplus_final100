// src/config/BpsLegal.ts
// -----------------------------------------------------------------------------
// CÁLCULO LEGAL BPS – LEY 16.713 (ARTS. 28–31)
// -----------------------------------------------------------------------------
// Este módulo reconstruye una Base de Prestación Jubilatoria (BPJ) aproximada
// utilizando una curva salarial estimada, respetando los principios de:
// - Mejores 20 años (Art. 28)
// - Ajuste por IMS
// - Porcentajes legales según años de servicio (Art. 29)
// - Tope mínimo 45% y máximo 82,5%
// -----------------------------------------------------------------------------

export type BpsInputs = {
  ingresoActual: number;     // Ingreso mensual informado por el usuario
  añosAporte: number;        // Años efectivamente aportados
  aportaAfap: boolean;       // Si corresponde régimen mixto
  saldoAfap?: number;        // Capital AFAP (opcional)
};

// -----------------------------------------------------------------------------
// 1) Curva salarial estimada para reconstruir 20 años de historia laboral
// -----------------------------------------------------------------------------
function generarCurvaSalarial(ingresoActual: number): number[] {
  const años = 20;
  const salarios: number[] = [];

  for (let i = 0; i < años; i++) {
    const retro = años - i;
    const factorCrec = 1 - retro * 0.015;     // reducción histórica 1.5% anual
    const factorIMS = 1 + retro * 0.03;       // ajuste IMS 3% anual
    const valor = ingresoActual * factorCrec * factorIMS;
    salarios.push(valor);
  }

  return salarios.sort((a, b) => b - a).slice(0, 20);
}

// -----------------------------------------------------------------------------
// 2) Cálculo de BPJ (promedio de mejores 20 años ajustados)
// -----------------------------------------------------------------------------
export function calcularBPJ(ingresoActual: number): number {
  if (!Number.isFinite(ingresoActual) || ingresoActual <= 0) return 0;

  const curva = generarCurvaSalarial(ingresoActual);
  const promedio = curva.reduce((a, b) => a + b, 0) / curva.length;

  return promedio;
}

// -----------------------------------------------------------------------------
// 3) Porcentaje legal según años de aporte – Art. 29 Ley 16.713
// -----------------------------------------------------------------------------
export function porcentajeLegalSegunAnios(añosAporte: number): number {
  if (añosAporte < 30) return 0;

  const maxAnios = 45;
  const bounded = Math.max(30, Math.min(añosAporte, maxAnios));

  return 0.45 + (bounded - 30) * 0.025;
}

// -----------------------------------------------------------------------------
// 4) Cálculo de la jubilación legal BPS
// -----------------------------------------------------------------------------
export function calcularJubilacionBpsLegal(
  ingresoActual: number,
  añosAporte: number
): number {
  const bpj = calcularBPJ(ingresoActual);
  const pct = porcentajeLegalSegunAnios(añosAporte);
  return bpj * pct;
}

// -----------------------------------------------------------------------------
// 5) Renta AFAP estimada (modelo educativo coherente)
// -----------------------------------------------------------------------------
export function calcularRentaAfapEducativa(
  saldoAfap: number = 0
): number {
  if (!Number.isFinite(saldoAfap) || saldoAfap <= 0) return 0;
  const factor = 0.006; // 0.6% mensual (promedio técnico internacional)
  return saldoAfap * factor;
}

// -----------------------------------------------------------------------------
// 6) Cálculo total según régimen mixto o exclusivo BPS
// -----------------------------------------------------------------------------
export function calcularJubilacionTotalBps(inputs: BpsInputs): number {
  const { ingresoActual, añosAporte, aportaAfap, saldoAfap } = inputs;

  const base = calcularJubilacionBpsLegal(ingresoActual, añosAporte);
  if (!aportaAfap) return base;

  return base + calcularRentaAfapEducativa(saldoAfap ?? 0);
}
