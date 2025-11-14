import React, { useState } from "react";
import "./QuestionsColumn.css";
import IsotipoJ from "../assets/isotipo.png";

type Category = "jubilacion" | "afap";

type QA = {
  question: string;
  answer: string;
  category: Category;
  source?: string;
};

const QUESTIONS: QA[] = [
  // --- JUBILACIÓN / BPS / REFORMA ---
  {
    question: "¿A qué edad me puedo jubilar hoy en Uruguay?",
    category: "jubilacion",
    answer:
      "Con el Nuevo Sistema Previsional Común (Ley 20.130) la regla general es jubilarse a los 65 años, cumpliendo determinados años de servicios. Existe la posibilidad de retiro a los 63 o 64 años para trayectorias laborales largas, por ejemplo con 35 o 38 años de trabajo efectivo, y también regímenes especiales para tareas particularmente exigentes o penosas.",
    source: "Guyer & Regules, Ley 20.130 y normativa reglamentaria."
  },
  {
    question: "Si nací antes de 1973, ¿me afecta la reforma jubilatoria?",
    category: "jubilacion",
    answer:
      "Quienes nacieron antes de 1973 se mantienen, en términos generales, en el régimen jubilatorio anterior, donde la edad mínima de retiro sigue siendo 60 años con 30 años de servicios. La Ley 20.130 establece reglas de transición que coordinan el régimen viejo y el nuevo, por lo que en cada caso concreto puede variar cómo se combinan edad, años de servicio y tipo de causal.",
    source: "Posadas, rafap.com.uy y Ley 20.130."
  },
  {
    question: "¿Cuántos años de aportes necesito para jubilarme?",
    category: "jubilacion",
    answer:
      "Como referencia general, para acceder a la jubilación común se exigen 30 años de servicios con aportes registrados. Existen otras figuras, como la jubilación por edad avanzada, que admiten menos años de servicios pero requieren una edad mayor. A su vez, algunos regímenes especiales pueden manejar combinaciones distintas de edad y años de aporte, según la actividad o la caja a la que estés afiliado.",
    source: "Banco de Previsión Social (BPS) – normativa y guías informativas."
  },
  {
    question: "¿Cómo se calcula, a grandes rasgos, el monto de mi jubilación?",
    category: "jubilacion",
    answer:
      "La jubilación hoy se construye combinando dos componentes. Primero, BPS calcula un Sueldo Básico Jubilatorio a partir del promedio de tus salarios actualizados y aplica una tasa de reemplazo que depende de tu edad y de los años de servicio. Segundo, la AFAP convierte el saldo acumulado en tu cuenta de ahorro individual en una renta o en retiros programados, utilizando tablas de mortalidad y tasas de interés. La pasividad que cobrás es, en síntesis, la suma de ambos tramos según la normativa vigente.",
    source: "rafap.com.uy, Guyer & Regules y documentación de BPS/AFAP."
  },
  {
    question: "¿Dónde puedo ver un cálculo “oficial” estimado de mi jubilación?",
    category: "jubilacion",
    answer:
      "BPS ofrece el servicio en línea “Mi jubilación estimada” para personas próximas a cumplir los requisitos o que ya los alcanzaron, tanto en el régimen mixto como en ciertos regímenes de transición. Con tu usuario de BPS podés ingresar y obtener una estimación del monto de jubilación que te correspondería según la historia laboral registrada hasta la fecha. No es un cálculo definitivo, pero sirve como referencia para planificar.",
    source: "Banco de Previsión Social – servicio en línea “Mi jubilación estimada”."
  },
  {
    question: "¿Puedo seguir trabajando y cobrar jubilación al mismo tiempo?",
    category: "jubilacion",
    answer:
      "Sí. La Ley 20.130 prevé, como regla general, la compatibilidad entre la jubilación y una actividad remunerada posterior, ya sea como trabajador dependiente o no dependiente, incluso dentro de la misma afiliación, salvo excepciones como algunas jubilaciones por incapacidad total. Desde 2023 BPS ha reglamentado distintas modalidades para continuar o reingresar a la actividad luego de jubilado, buscando no desincentivar trayectorias laborales más largas.",
    source: "Banco de Previsión Social – información sobre compatibilidades y reforma."
  },
  {
    question:
      "Vivo en el exterior, ¿me voy a poder jubilar o recuperar algo de lo aportado?",
    category: "jubilacion",
    answer:
      "Depende de tu situación concreta. Si tenés años de servicios en Uruguay y en otro país con el que exista convenio internacional de seguridad social, se pueden totalizar los años para acceder a una jubilación, aun cuando en cada país por separado no cumplas los mínimos. Si residís en el exterior, estás afiliado a una AFAP y no alcanzás la causal jubilatoria uruguaya, la Ley 20.130 prevé, bajo condiciones estrictas, la devolución del saldo de la cuenta individual.",
    source:
      "rafap.com.uy, Ley 20.130 y convenios internacionales de seguridad social."
  },

  // --- AFAP / AHORRO INDIVIDUAL ---
  {
    question: "¿Qué diferencia hay entre lo que paga BPS y lo que paga la AFAP?",
    category: "afap",
    answer:
      "El sistema previsional uruguayo es mixto. El BPS constituye el pilar de solidaridad intergeneracional y paga una parte de la jubilación calculada sobre tu historia laboral y la fórmula legal de tasas de reemplazo. La AFAP, en cambio, administra una cuenta de ahorro individual a tu nombre: el saldo acumulado se convierte en una renta o en retiros programados al momento de jubilarte. La pasividad total es la combinación de ambos componentes.",
    source: "rafap.com.uy y normativa del régimen mixto (Ley 16.713 y ss.)."
  },
  {
    question: "¿Estoy obligado a afiliarme a una AFAP?",
    category: "afap",
    answer:
      "Depende de tu nivel de ingresos y de cuándo ingresaste al mercado laboral. Todo trabajador aporta el 15 % de su salario nominal al sistema previsional. Para determinados tramos salariales la afiliación a una AFAP puede ser opcional, según el artículo 8 de la Ley 16.713; por encima de ciertos topes, una porción del aporte debe ir obligatoriamente a ahorro individual. Las reglas concretas varían por franja de ingresos y fecha de ingreso al sistema.",
    source: "rafap.com.uy, Ley 16.713 y material explicativo de Wikipedia."
  },
  {
    question: "¿Cuánto de mi sueldo va a BPS y cuánto a la AFAP?",
    category: "afap",
    answer:
      "Siempre se descuenta el 15 % del salario nominal como aporte personal. Si no estás afiliado a una AFAP, ese 15 % se destina íntegramente al BPS u organismo correspondiente. Si estás en una AFAP, una parte del 15 % queda en BPS y otra entra a tu cuenta de ahorro individual, de acuerdo con franjas salariales y con si ejerciste o no la opción del artículo 8 para derivar un porcentaje mayor a la AFAP.",
    source: "rafap.com.uy e integracionafap.com.uy."
  },
  {
    question: "¿Me puedo cambiar de AFAP?",
    category: "afap",
    answer:
      "Sí. Las personas afiliadas pueden cambiar de AFAP cumpliendo ciertos plazos y condiciones, como una permanencia mínima antes de efectuar un nuevo cambio. El trámite suele iniciarse ante la AFAP de destino o a través de los mecanismos previstos por BPS. El saldo de tu cuenta individual se transfiere a la nueva administradora, por lo que el ahorro acumulado no se pierde: se mueve de una AFAP a otra.",
    source: "Banco de Previsión Social – información sobre traspasos de AFAP."
  },
  {
    question: "¿Puedo retirar el dinero de la AFAP antes de jubilarme?",
    category: "afap",
    answer:
      "En general, el dinero de la AFAP es ahorro previsional obligatorio y no puede retirarse libremente antes de jubilarse. Existen, sin embargo, excepciones puntuales muy reguladas. Por ejemplo, determinadas personas que viven en el exterior, no configuran causal jubilatoria en Uruguay y cumplen requisitos específicos pueden solicitar la devolución del saldo. Asimismo, quienes alcanzan causal jubilatoria en BPS y difieren la jubilación durante un período mínimo pueden, bajo ciertas condiciones, retirar un porcentaje acotado del saldo. No es un ahorro de libre disposición.",
    source: "rafap.com.uy y Banco de Previsión Social – normativa sobre AFAP."
  }
];

const QuestionsColumn: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("jubilacion");
  const [search, setSearch] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<QA | null>(null);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredQuestions = QUESTIONS.filter(
    (item) =>
      item.category === activeCategory &&
      item.question.toLowerCase().includes(normalizedSearch)
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Al escribir de nuevo, salimos del modo “respuesta”
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (item: QA) => {
    setSelectedQuestion(item);
    // Limpiamos el buscador para una nueva búsqueda posterior
    setSearch("");
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setSearch("");
    setSelectedQuestion(null);
  };

  const showLogo =
    !selectedQuestion &&
    (normalizedSearch === "" || filteredQuestions.length === 0);

  const showList =
    !selectedQuestion && normalizedSearch !== "" && filteredQuestions.length > 0;

  const showNoResults =
    !selectedQuestion &&
    normalizedSearch !== "" &&
    filteredQuestions.length === 0;

  return (
    <div className="questions-column fade-in">
      <h3 className="questions-title">
        Respuestas a las preguntas que nos hacemos 3 millones antes de
        jubilarnos.
      </h3>
      <p className="subtitle">¡Buscá la tuya!</p>

      {/* Selector de tema */}
      <div className="topic-toggle">
        <button
          type="button"
          className={
            activeCategory === "jubilacion"
              ? "topic-button active"
              : "topic-button"
          }
          onClick={() => handleCategoryChange("jubilacion")}
        >
          Jubilación BPS / edad / años
        </button>
        <button
          type="button"
          className={
            activeCategory === "afap" ? "topic-button active" : "topic-button"
          }
          onClick={() => handleCategoryChange("afap")}
        >
          AFAP y ahorro individual
        </button>
      </div>

      {/* Buscador */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Escribí una palabra clave..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <span className="search-icon">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="search-icon-svg"
          >
            <circle cx="11" cy="11" r="6" />
            <line x1="15" y1="15" x2="20" y2="20" />
          </svg>
        </span>
      </div>

      {/* Estado inicial: isotipo grande */}
      {showLogo && (
        <div className="logo-placeholder">
          <img src={IsotipoJ} alt="Isotipo Jubilación+" />
        </div>
      )}

      {/* Lista de preguntas cuando hay búsqueda */}
      {showList && (
        <div className="questions-list">
          {filteredQuestions.map((item, index) => (
            <button
              type="button"
              key={index}
              className="question-item"
              onClick={() => handleQuestionClick(item)}
            >
              <span className="question-text">{item.question}</span>
            </button>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {showNoResults && (
        <p className="no-results">
          No se encontraron preguntas con esa palabra clave. Probá con otro
          término relacionado (por ejemplo “jubilación”, “AFAP”, “BPS”, “Caja de
          Profesionales”).
        </p>
      )}

      {/* Pregunta seleccionada + respuesta */}
      {selectedQuestion && (
        <>
          <div className="selected-question-title">
            {selectedQuestion.question}
          </div>

          <div className="ia-answer-box">
            <p className="ia-answer-placeholder">
              {selectedQuestion.answer}
            </p>
            {selectedQuestion.source && (
              <span className="answer-source">
                Fuente: {selectedQuestion.source}
              </span>
            )}
          </div>
        </>
      )}

      <footer className="ia-footer">
        Contenido generado por IA para orientación educativa.
      </footer>
    </div>
  );
};

export default QuestionsColumn;
