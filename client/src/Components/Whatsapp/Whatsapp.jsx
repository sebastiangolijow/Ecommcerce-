/* eslint-disable*/
import React from "react";
import whatsapp from "../../Assets/static/whatsapp.svg";
import styles from "./Whatsapp.module.scss";

const Whatsapp = () => {
  return (
    <>
      <a href="https://wa.me/5491124543732" target="_blank">
        <img src={whatsapp} alt="whatsapp" className={styles.whatsapp_icon} />
      </a>
    </>
  );
};

export default Whatsapp;
