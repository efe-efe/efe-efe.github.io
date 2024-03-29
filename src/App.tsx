import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

const resumeURL =
  "https://getonbrd-prod.s3.amazonaws.com/uploads/cv/ba25467ac2da640b3831edf51bb4703d/Fabian_Urbina_Curriculum.pdf?X-Amz-Expires=86400&amp;X-Amz-Date=20220915T121348Z&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAJT5MYUSOEN4SITVA%2F20220915%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=abb8413f9e6e85cd2c3e399405dee187b06a83e7dd2da19e1f00148931011a93";

function NavLinks({ showDown }: { showDown?: boolean }) {
  const { t } = useTranslation();

  return (
    <>
      <li className={showDown ? "show-down" : ""}>
        <a href="#about">{t("about")}</a>
      </li>
      <li className={showDown ? "show-down" : ""}>
        <a href="#experience">{t("experience")}</a>
      </li>
      <li className={showDown ? "show-down" : ""}>
        <a className={showDown ? "show-down" : ""} href="#contact">
          {t("contact")}
        </a>
      </li>
      <li className={showDown ? "show-down" : ""}>
        <a className="button" href={resumeURL} download>
          {t("resume")}
        </a>
      </li>
    </>
  );
}

function Social({ network, label, url }: { network: string; label: string; url: string }) {
  return (
    <a href={url} className={`social ${network}`}>
      {label}
    </a>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPreviousPosition, setScrollPreviousPosition] = useState(0);

  const toggleLockBody = (locked: boolean) => {
    const body = document.querySelector("body");
    body?.classList.toggle("locked", locked);
  };

  const handleHeaderToggle = () => {
    setSideBarOpen(sideBarOpen => !sideBarOpen);
  };

  const handleScroll = useCallback(() => {
    setScrollPreviousPosition(scrollPosition);
    setScrollPosition(window.scrollY);
  }, [scrollPosition]);

  const shouldHideHeader = scrollPosition > scrollPreviousPosition && scrollPosition > 70;
  toggleLockBody(sideBarOpen);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const navbarActionElements = document.querySelectorAll<HTMLElement>("nav ul li");
    const asideLinks = document.querySelectorAll("aside ul li a");
    const hero = document.querySelector(".hero");
    const delay = 100;

    if (navbarActionElements) {
      navbarActionElements.forEach((children, index) => {
        children.style.animationDelay = index * delay + "ms";
      });
    }

    for (const link of asideLinks) {
      link.addEventListener("click", () => setSideBarOpen(false));
    }

    if (hero) {
      hero.childNodes.forEach((children, index) => {
        (children as HTMLElement).style.animationDelay = index * delay + delay * navbarActionElements.length + "ms";
      });
    }

    return () => {
      for (const link of asideLinks) {
        link.removeEventListener("click", () => setSideBarOpen(false));
      }
    };
  }, []);

  return (
    <div className="App">
      <header>
        <div
          className={`toggle hide-for-desktop
          ${sideBarOpen ? "open" : ""}
          ${shouldHideHeader ? "hidden" : ""}
        `}
          onClick={handleHeaderToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav
          className={`
          flex justify-end align-center 
          ${sideBarOpen ? "open" : ""}
          ${shouldHideHeader ? "hidden" : ""}
          ${scrollPosition > 70 ? "leaning" : ""}
        `}
        >
          <a className="logo flex" href="#hero">
            efe
          </a>
          <ul className="hide-for-mobile flex align-center">
            <NavLinks showDown={true} />
            <li className="show-down">
              <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </li>
          </ul>
        </nav>

        <aside className={`hide-for-desktop ${sideBarOpen ? "open" : "closed"}`}>
          <ul className="flex flex-column align-center justify-center">
            <NavLinks />
            <li>
              <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </li>
          </ul>
        </aside>
      </header>
      <main className={sideBarOpen ? "blur" : ""} onClick={() => setSideBarOpen(false)}>
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
                <a aria-label={t("visitAbilityArenaTeam")} href="https://abilityarena.com/credits" />
                <a aria-label={t("visitLatamAirlines")} href="https://www.latamairlines.com/" />
              </Trans>
            </p>
          </div>

          <div className="wrapper">
            <img alt={t("picture")} src={"/avatar.jpg"} />
          </div>
        </section>
        <section id="experience" className="experience">
          <h4>{t("experience")}</h4>
          <p>{t("experienceFirst")}</p>
          <p>{t("experienceSecond")}</p>
          <p>{t("experienceThird")}</p>
        </section>
        <section id="contact" className="contact flex flex-column align-center">
          <h4>{t("contact")}</h4>
          <h2>{t("contactSubtitle")}</h2>
          <p>{t("contactDescription")}</p>
          <ul className="contact-links">
            <li>
              <Social url="https://www.linkedin.com/in/fabian-urbina-ampuero-367349149/" label="LinkedIn" network="linkedin" />
            </li>
            <li>
              <Social url="mailto: fabian.urbina@usach.cl" label="Send Email" network="email" />
            </li>
          </ul>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
