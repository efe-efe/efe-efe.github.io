import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [headerOpen, setHeaderOpen] = useState(false);

  const toggleLockBody = (locked) => {
    const body = document.querySelector("body");
    body.classList.toggle("locked", locked);
  }

  const handleHeaderToggle = () => {
    setHeaderOpen(headerOpen => !headerOpen);
  }

  useEffect(() => {
    toggleLockBody(headerOpen);
  }, [headerOpen])

  return (
    <div className="App">
      <header className={`flex justify-end align-center ${headerOpen ? "open" : ""}`}>
        <div className="logo flex">
          efe
        </div>
        <nav className="hide-for-mobile">
          <ul className="flex">
            <li><a href="#">{t("about")}</a></li>
            <li><a href="#">{t("experience")}</a></li>
            <li><a href="#">{t("contact")}</a></li>
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
            <li><a href="#">{t("about")}</a></li>
            <li><a href="#">{t("experience")}</a></li>
            <li><a href="#">{t("contact")}</a></li>
            <li><button>{t("resume")}</button></li>
          </ul>
        </aside>
      </header>
      <div className={`overlay hide-for-desktop ${headerOpen ? "fade-in" : "fade-out"}`}>
      </div>

      <main className={headerOpen ? "blur" : ""}>
        <section className="hero flex flex-column justify-center align-start">
          <h1>{t("salute")}</h1>
          <h2>Fabián Urbina.</h2>
          <h3>{t("shortDescription")}</h3>
          <p>{t("description")}</p>
        </section>
        <section className="hero flex flex-column justify-center align-start">
          <h1>{t("salute")}</h1>
          <h2>Fabián Urbina.</h2>
          <h3>{t("shortDescription")}</h3>
          <p>{t("description")}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
