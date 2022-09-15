/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

function NavLinks({ slowDown }) {
  const { t } = useTranslation();

  return (
    <>
      <li><a href="#about" className={slowDown ? "slow-down" : ""}>{t("about")}</a></li>
      <li><a className={slowDown ? "slow-down" : ""} href="#experience">{t("experience")}</a></li>
      <li><a className={slowDown ? "slow-down" : ""} href="#contact">{t("contact")}</a></li>
      <li><a className="button" href="https://getonbrd-prod.s3.amazonaws.com/uploads/cv/ba25467ac2da640b3831edf51bb4703d/Fabian_Urbina_Curriculum.pdf?X-Amz-Expires=86400&amp;X-Amz-Date=20220915T121348Z&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAJT5MYUSOEN4SITVA%2F20220915%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=abb8413f9e6e85cd2c3e399405dee187b06a83e7dd2da19e1f00148931011a93" download>
        {t("resume")}
      </a></li>
    </>
  )
}

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

  useEffect(() => {
    const navElements = document.querySelectorAll("nav ul li");
    const hero = document.querySelector(".hero");
    const delay = 100;

    if (navElements) {
      navElements.forEach((children, index) => {
        children.style.animationDelay = index * delay + "ms";
      });
    }

    if (hero) {
      hero.childNodes.forEach((children, index) => {
        children.style.animationDelay = (index * delay) + (delay * navElements.length) + "ms";
      });
    }
  }, []);

  return (
    <div className="App">
      <header className={`flex justify-end align-center ${headerOpen ? "open" : ""}`}>
        <a className="logo flex" href="#hero">
          efe
        </a>
        <nav className="hide-for-mobile">
          <ul className="flex align-center">
            <NavLinks slowDown={true} />
            <li className="show-down"><select
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
              <NavLinks />
            </li>
          </ul>
        </aside>
      </header>
      <div className={`overlay hide-for-desktop ${headerOpen ? "fade-in" : "fade-out"}`}>
      </div>

      <main className={headerOpen ? "blur" : ""}>
        <section id="hero" className="hero flex flex-column justify-center align-start">
          <h1 className="show-up">{t("salute")}</h1>
          <h2 className="show-up">Fabián Urbina.</h2>
          <h3 className="show-up">{t("shortDescription")}</h3>
          <p className="show-up">{t("description")}</p>
        </section>
        <section id="about" className="about">
          <div className="bio">
            <h4>{t("aboutMe")}</h4>
            <p>{t("bioFirst")}</p>
            <p>
              <Trans i18nKey="bioSecond">
                <a aria-label={t("visitAssayware")} href="https://www.assayware.com" />
                <a aria-label={t("visitYapo")} href="https://www.yapo.cl" />
                <a aria-label={t("visitSunsfanGG")} href="https://www.sunsfan.gg" />
              </Trans>
            </p>
          </div>

          <div className="wrapper">
            <img alt={t("picture")} src="https://media-exp1.licdn.com/dms/image/D4E03AQGhWZabQMdb_g/profile-displayphoto-shrink_800_800/0/1661639551210?e=1668643200&v=beta&t=QNiwMcgexL53GaKry9i9og5oowRCNfW8TtTB0NzjDYA" />
          </div>

        </section>
        <section id="experience" className="experience">
          <h4>{t("experience")}</h4>
          <p>{t("experienceFirst")}</p>
          <p>{t("experienceSecond")}</p>
        </section>
        <section id="contact" className="contact flex flex-column align-center">
          <h4>{t("contact")}</h4>
          <h2>{t("contactSubtitle")}</h2>
          <p>{t("contactDescription")}</p>
          <ul>
            <li><a href="https://www.linkedin.com/in/fabian-urbina-ampuero-367349149/">LinkedIn</a></li>
            <li><a href="mailto: fabian.urbina@usach.cl">Send Email</a></li>
          </ul>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
