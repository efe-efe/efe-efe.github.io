import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [headerOpen, setHeaderOpen] = useState(false);

  const handleHeaderToggle = () => {
    console.log("hey")
    setHeaderOpen(headerOpen => !headerOpen);
  }

  return (
    <div className="App">
      <header className={`flex justify-end align-center ${headerOpen ? "open" : ""}`}>
        <div className="logo flex">
          efe
        </div>
        <nav className="hide-for-mobile">
          <ul className="flex">
            <li><a href="#">{`1. ${t("about")}`}</a></li>
            <li><a href="#">{`2. ${t("experience")}`}</a></li>
            <li><a href="#">{`3. ${t("contact")}`}</a></li>
            <button>{t("resume")}</button>
            <select
              value={i18n.language}
              onChange={(e) =>
                i18n.changeLanguage(e.target.value)
              }
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </ul>
        </nav>
        <div className="toggle hide-for-desktop" onClick={handleHeaderToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div className={`overlay ${headerOpen ? "fade-in" : "fade-out"}`}>

      </div>
    </div>
  );
}

export default App;
