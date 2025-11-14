import React from "react";
import "./Results.css";
import StabilityThermometer from "./StabilityThermometer";

const Results: React.FC = () => {
  return (
    <div className="results-wrapper">
      <div className="results-grid fade-in">
        {/* TARJETA 1 - RESULTADOS ESTIMADOS */}
        <div className="result-card">
          <h3>Resultados estimados</h3>
          <p>
            <strong>Proyección BPS:</strong> $45.280
          </p>
          <p>
            <strong>Complemento AFAP:</strong> $18.420
          </p>
          <p className="small-text">
            El complemento AFAP se muestra de forma ilustrativa, como un
            porcentaje adicional de la jubilación base, para reflejar que el
            ahorro individual puede sumar un ingreso extra al retiro. No
            sustituye tu estado de cuenta ni una proyección oficial de la AFAP.
          </p>
          <p>
            <strong>Total proyectado:</strong> $63.700
          </p>
          <p>
            <strong>Cobertura estimada:</strong> 72%
          </p>
          <p className="small-text">
            Este resultado es ilustrativo y se calcula con los datos que
            ingresaste. No sustituye los simuladores oficiales ni genera
            derechos jubilatorios.
          </p>
        </div>

        {/* TARJETA 2 - CONSEJOS IA */}
        <div className="result-card">
          <h3>Consejos personalizados IA</h3>
          <p>
            Aprovechá tus próximos años activos para fortalecer tu base de
            aportes y planificar un ahorro complementario. La estabilidad
            depende tanto del tiempo como de la constancia en tus
            contribuciones.
          </p>
        </div>

        {/* TARJETA 3 - TERMÓMETRO */}
        <div className="result-card">
          <StabilityThermometer
            level="moderado"
            label="Moderado"
            description="Tu situación es moderada. Con algunos años adicionales o un plan de seguros personales podés alcanzar mayor equilibrio."
          />

          <button
            className="new-calc-btn"
            type="button"
            onClick={() => window.location.reload()}
          >
            Nuevo cálculo
          </button>
        </div>

        {/* TARJETA 4 - CONTACTO / SEGUROS PERSONALES */}
        <div className="result-card contact-card">
          <div className="contact-badge">Seguros personales</div>

          <h3 className="contact-title">
            ¿Querés complementar tu jubilación?
          </h3>

          <ul className="contact-list">
            <li>
              Plan de seguro (ahorro + vida/renta) para sumar un ingreso extra
              al momento del retiro.
            </li>
            <li>
              Cotización simple según tu edad, horizonte de retiro y objetivo de
              ingreso.
            </li>
            <li>
              Acompañamiento 1:1 para elegir una alternativa sostenible y
              alineada con tus metas.
            </li>
          </ul>

          <p className="contact-footnote">
            Revisemos juntos tu situación y armemos un plan complementario con
            seguros personales, sin costo de asesoría.
          </p>

          <a
            href="https://wa.me/59897113110"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta"
          >
            ANTICIPATE
          </a>

          <p className="contact-signature">
            Lic. Jessica Páez – Asesora Técnica en Seguros Personales
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
