// -----------------------------------------------------------------------------
// ESCALAS CJPPU – AUTOMÁTICAS (10 o 15 categorías según normativa)
// Ley 17.738 (Art. 59) + Ley 20.410 + Decreto 11/11/2025
// -----------------------------------------------------------------------------
//
// Reglas legales implementadas:
//
//   ✔ Si está habilitado ANTES de 2026 → puede optar por 10 o 15,
//     pero si nació después del 31/12/1984 → SOLO 15 escalones.
//
//   ✔ Si está habilitado DESPUÉS o EN 2026 → solo 15 escalones.
//
//   ✔ 2025 tiene valores oficiales. 2026–2028 se proyectan con 3% anual.
//
//   ✔ Cuota = ficto * tasa legal (18,5 → 20,5 → 21,5 → 22,5%)
// -----------------------------------------------------------------------------

export type AnioCJPPU = 2025 | 2026 | 2027 | 2028;

// Tasas legales
export const TASA_APORTE_CJPPU: Record<AnioCJPPU, number> = {
  2025: 0.185,
  2026: 0.205,
  2027: 0.215,
  2028: 0.225,
};

// Proyección 3% anual
export const FACTOR_FICTO_CJPPU: Record<AnioCJPPU, number> = {
  2025: 1,
  2026: 1.03,
  2027: 1.03 ** 2,
  2028: 1.03 ** 3,
};

// -----------------------------------------------------------------------------
// TABLA OFICIAL 10 ESCALONES – 2025
// -----------------------------------------------------------------------------

export const ESCALONES_10_2025 = [
  { id: "esp",  label: "1ª Especial",   ficto: 34660,  cuota: 3241 },
  { id: "1ra",  label: "1ª categoría",  ficto: 34660,  cuota: 6447 },
  { id: "2da",  label: "2ª categoría",  ficto: 65565,  cuota: 12196 },
  { id: "3ra",  label: "3ª categoría",  ficto: 92916,  cuota: 17282 },
  { id: "4ta",  label: "4ª categoría",  ficto: 116552, cuota: 21679 },
  { id: "5ta",  label: "5ª categoría",  ficto: 136470, cuota: 25383 },
  { id: "6ta",  label: "6ª categoría",  ficto: 152872, cuota: 28434 },
  { id: "7ma",  label: "7ª categoría",  ficto: 165708, cuota: 30822 },
  { id: "8va",  label: "8ª categoría",  ficto: 174761, cuota: 32506 },
  { id: "9na",  label: "9ª categoría",  ficto: 180255, cuota: 33527 },
  { id: "10ma", label: "10ª categoría", ficto: 182018, cuota: 33855 },
];

// -----------------------------------------------------------------------------
// TABLA OFICIAL 15 ESCALONES – ART. 59, LEY 17.738 (2025)
// -----------------------------------------------------------------------------

export const ESCALONES_59_2025 = [
  25860,31032,36204,41376,46548,51720,56892,62064,
  67236,72408,77580,82752,87924,93096,98268
].map((ficto, idx) => ({
  id: `59${idx+1}`,
  label: `59-${idx+1}`,
  ficto,
  cuota: Math.round(ficto * 0.185),
}));

// -----------------------------------------------------------------------------
// FUNCIÓN: Determinar si corresponde escala 10 o 15
// -----------------------------------------------------------------------------

export function determinarTipoEscala(
  anioHabilitacion: number,
  anioNacimiento: number
): 10 | 15 {

  // Regla clave del decreto:
  // - Si habilitado antes de 2026:
  //     → puede 10 o 15
  //       pero si nació después de 31/12/1984 → solo 15
  //
  // - Si habilitado en 2026 o después:
  //     → siempre 15

  if (anioHabilitacion >= 2026) return 15;

  // Está habilitado antes de 2026:
  if (anioNacimiento > 1984) return 15;

  // Caso clásico: habilitado antes 2026 y nacido antes 1985
  return 10;
}

// -----------------------------------------------------------------------------
// FUNCIÓN GENERAL: Obtener escalones proyectados por año
// -----------------------------------------------------------------------------

export function obtenerEscalonesCJPPU(
  anio: AnioCJPPU,
  tipo: 10 | 15
) {
  const factor = FACTOR_FICTO_CJPPU[anio];
  const tasa = TASA_APORTE_CJPPU[anio];

  const base = (tipo === 10 ? ESCALONES_10_2025 : ESCALONES_59_2025);

  return base.map((esc) => {
    const ficto = anio === 2025 ? esc.ficto : Math.round(esc.ficto * factor);
    const cuota = anio === 2025 ? esc.cuota : Math.round(ficto * tasa);

    return {
      ...esc,
      anio,
      ficto,
      cuota,
      esEstimado: anio !== 2025,
    };
  });
}

// -----------------------------------------------------------------------------
// FUNCIÓN: obtener un escalón por ID
// -----------------------------------------------------------------------------

export function obtenerEscalonCJPPUPorId(
  anio: AnioCJPPU,
  tipo: 10 | 15,
  id: string
) {
  const lista = obtenerEscalonesCJPPU(anio, tipo);
  return lista.find((e) => e.id === id) ?? null;
}
