import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [headerOpen, setHeaderOpen] = useState(false);

  const handleHeaderToggle = () => {
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
            <li><button>{t("resume")}</button></li>
            <li><select
              value={i18n.language}
              onChange={(e) =>
                i18n.changeLanguage(e.target.value)
              }
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select></li>
          </ul>
        </nav>
        <div className="toggle hide-for-desktop" onClick={handleHeaderToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <aside className={`hide-for-desktop ${headerOpen ? "open" : "closed"}`}>
          <ul>
            <li><select
              value={i18n.language}
              onChange={(e) =>
                i18n.changeLanguage(e.target.value)
              }
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
            </li>
            <li><a href="#">{`1. ${t("about")}`}</a></li>
            <li><a href="#">{`2. ${t("experience")}`}</a></li>
            <li><a href="#">{`3. ${t("contact")}`}</a></li>
            <li><button>{t("resume")}</button></li>
          </ul>
        </aside>
      </header>
      <div className={`overlay hide-for-desktop ${headerOpen ? "fade-in" : "fade-out"}`}>
      </div>

      <main className={headerOpen ? "blur" : ""}>
        <h1>Hola, soy Fabián</h1>
        <h2>Me encanta crear cosas</h2>
        <h3>Soy un ingeniero de software especializado en el desarrollo front</h3>
      </main>
    </div>
  );
}

export default App;
