import "./Header.css";
import isotipo from "../assets/isotipo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">

        <div className="header-row">
          <img src={isotipo} className="header-isotipo" alt="Jubilación+ isotipo" />

          <div className="header-title">
            Jubilación<span className="mas">+</span>
          </div>
        </div>

        <div className="header-slogan">
          Herramienta Educativa con IA — by Lic. Jessica Páez
        </div>

      </div>
    </header>
  );
}
