/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, sendMail } from "../../../Redux/Users/usersActions";
import { useHistory, useLocation } from "react-router-dom";
import style from "./login.module.scss";
import MultifactorAuth from "../MultifactorAuth/MultifactorAuth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useTranslation } from "react-i18next";

export function Login() {
  // eslint-disable-next-line
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const userRegistered = useSelector((state) => state.usersReducer.userLoged);
  const location = useLocation();
  const history = useHistory();

  const SUPABASE_URL = "https://zgycwtqkzgitgsycfdyk.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzczMDk4NCwiZXhwIjoxOTMzMzA2OTg0fQ.v7M4hQhgNYxkXa3zwDLs5dAWR_1egDuCASySblcNgSA";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userRegistered?.id) {
      if (location.state.from) {
        history.push(location.state.from);
      }
    }
    // eslint-disable-next-line
  }, [userRegistered]);

  const handleState = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUsers = (e) => {
    const userLog = async () => {
      await dispatch(userLogin(user));
    };
    userLog();
  };

  const resetPassword = () => {
    dispatch(sendMail(document.getElementById("email").value));
  };

  // eslint-disable-next-line
  const createPin = async (e) => {
    e.preventdefault();
    //must have an email
    // generate pin
    let newPin = Math.round(Math.random() * 9999);
    //save pin in supabase
    await supabase
      .from("users")
      .update({ pin: `${newPin}` })
      .eq("email", `${user.email}`);
    //send pin by email
    await axios.post(
      `https://henrystechstore.herokuapp.com/mercadopago/send?pin=${newPin}&email=${user.email}`
    );
  };

  return (
    <form className={style.container}>
      <>
        <div>
          <input
            className={!user.email ? "danger" : ""}
            type="text"
            name="email"
            placeholder="E-mail"
            value={user.email}
            onChange={handleState}
          />
        </div>
        <div>
          <input
            className={!user.password ? "danger" : ""}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleState}
          />
        </div>
        {/* <button
          className={style.simpleButton}
          type="button"
          name="login"
          onClick={(e) => loginUsers(e)}
        >
          LogIn
        </button> */}
        <MultifactorAuth
          prueba="test"
          email={user.email}
          onLogin={loginUsers}
        />
        <div>
          <input type="text" id="email" placeholder="E-mail" />
        </div>
        <button
          className={style.simpleButton}
          type="button"
          onClick={(e) => resetPassword(e)}
        >
           {t("login.forgot")}
        </button>
        <div className={style.containerGG}>
          <div
            className={style.githubButton}
            onClick={() =>
              (window.location.href =
                "https://zgycwtqkzgitgsycfdyk.supabase.co/auth/v1/authorize?provider=github")
            }
          >
            <img
              src="/images/GitHub-Mark-Light-32px.png"
              className={style.googleButton}
              type="button"
            />
            <span> {t("login.github")}</span>
          </div>
          <img
            src="/images/btn_google_signin_dark_normal_web.png"
            className={style.googleButton}
            type="button"
            onClick={() =>
              (window.location.href =
                "https://zgycwtqkzgitgsycfdyk.supabase.co/auth/v1/authorize?provider=google")
            }
          />
        </div>
      </>
    </form>
  );
}
