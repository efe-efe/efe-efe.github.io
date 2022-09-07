import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <header>
        <div className="logo flex">
          efe
        </div>
        <nav>
          <ul>
            <li>{t("about")}</li>
            <li>{t("experience")}</li>
            <li>{t("contact")}</li>
          </ul>
        </nav>
        <select
          value={i18n.language}
          onChange={(e) =>
            i18n.changeLanguage(e.target.value)
          }
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </header>

    </div>
  );
}

export default App;
