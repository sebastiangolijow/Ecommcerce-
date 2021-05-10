import React from "react";
import style from "./aboutus.module.scss";
import Fla from "./img/Fla.png";
import Joaco from "./img/joaco.png";
import Marian from "./img/Marian.png";
import Maxi from "./img/Maxi.png";
import Seba from "./img/Seba.png";
import Sergio from "./img/Sergio.png";
import Marcos from "./img/marcos.png";
import Vicky from "./img/vicky.png";
import Joma from "./img/Joma.png";
import Martin from "./img/martin.png";
//import Fondo from "./img/fondo.jpg";
import Linkedin from "../../Assets/static/linkedin-logo.svg";
import Github from "../../Assets/static/github-logo.svg";
import { useTranslation } from "react-i18next";

export default function AboutUs({ dark }) {
   // eslint-disable-next-line
   const [t] = useTranslation("global");
  return (
    <div className={style.containerAbout}>
      <label
        style={dark ? { color: "white" } : { color: "black" }}
        className={style.title}
      >
        <strong>{t("about.title")}</strong>
      </label>
      <label
        style={dark ? { color: "white" } : { color: "black" }}
        className={style.tdescription}
      >
       {t("about.description")}
      </label>
      <div className={style.cardsContainer}>
        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Vicky} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Victoria Coronado</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/viccoronado/"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/vic-coronado/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Marcos} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Marcos Lezcano</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/lezcanozarza"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/marcos-lezcano"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Sergio} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Sergio Solís</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/SergioAriel"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://linkedin.com/in/sergio-solis-260509b5"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Joaco} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Joaquín Ponzone</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/joaquinponzone"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/joaquinponzone/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Joma} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Joaquín Cardozo</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a href="https://github.com/mlmaxi98" rel="noopener noreferrer">
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/joaquin-cardozo/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Seba} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Sebastián Golijow</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/sebastiangolijow"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/sebastian-golijow-41a55a1b2/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Marian} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Mariano Celi</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/nanoceli/"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/marianoalejandroceli/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Martin} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Martín Navarro</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a href="https://github.com/martuuu" rel="noopener noreferrer">
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/martin-jose-navarro/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Maxi} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Maximiliano Mendez</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/maxicuyo94"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/maximiliano-m%C3%A9ndez-4751071b2/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cntImg}>
            <img src={Fla} style={{ width: "100%" }} />
          </div>
          <div className={style.cardDescription}>
            <label className={style.name}>Flaviano Di Berardino</label>
            <div className={style.logos}>
              <div className={style.logo}>
                <a
                  href="https://github.com/flavianodiberardino"
                  rel="noopener noreferrer"
                >
                  <img src={Github} style={{ width: "35px" }} />
                </a>
              </div>
              <div className={style.logo}>
                <a
                  href="https://www.linkedin.com/in/flavianodiberardino-js/"
                  rel="noopener noreferrer"
                >
                  <img src={Linkedin} style={{ width: "35px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
