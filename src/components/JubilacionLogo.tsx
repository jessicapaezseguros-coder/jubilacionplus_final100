// src/components/JubilacionLogo.tsx
import React from "react";

type Props = {
  size?: number;         // alto en px del logo completo
  showText?: boolean;    // mostrar “Jubilación+” o solo el isotipo J
};

const JubilacionLogo: React.FC<Props> = ({ size = 26, showText = true }) => {
  // Colores de marca
  const gold = "#c9a449";
  const goldDark = "#a88632";
  const cream = "#E5E2CF"; // texto
  const plusGold = "#c9a449";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: showText ? 10 : 0,
        height: size,
      }}
      aria-label="Jubilación+"
      role="img"
    >
      {/* Isotipo: J con flecha */}
      <svg
        width={size * 0.9}
        height={size}
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gold} />
            <stop offset="100%" stopColor={goldDark} />
          </linearGradient>
          <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodOpacity="0.25"/>
          </filter>
        </defs>

        {/* Cuerpo de la J */}
        <path
          d="M88 24c-8 0-12 4-12 12v124c0 28 15 44 42 44 15 0 32-6 52-18l-12-24c-16 10-28 14-36 14-10 0-16-6-16-16V36c0-8-4-12-18-12Z"
          fill="url(#g)"
          filter="url(#s)"
        />

        {/* Flecha ascendente */}
        <path
          d="
            M88 116
            C130 90, 158 72, 186 56
            L178 44
            L230 44
            L230 96
            L216 82
            C184 100, 150 120, 110 146
            Z
          "
          fill="url(#g)"
          filter="url(#s)"
        />
      </svg>

      {showText && (
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
          {/* “Jubilación” (serif) */}
          <svg
            height={size * 0.7}
            viewBox="0 0 980 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <text
              x="0"
              y="150"
              fill={cream}
              fontFamily="Georgia, 'Times New Roman', Times, serif"
              fontWeight={500}
              fontSize="150"
            >
              Jubilación
            </text>
          </svg>

          {/* “+” dorado */}
          <svg
            height={size * 0.7}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <text
              x="70"
              y="150"
              fill={plusGold}
              fontFamily="Georgia, 'Times New Roman', Times, serif"
              fontWeight={700}
              fontSize="180"
            >
              +
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};

export default JubilacionLogo;
