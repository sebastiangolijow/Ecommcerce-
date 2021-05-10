import React, { useState } from "react";
import { SignUp } from "./SignUp/SignUp.jsx";
import { Login } from "./Login/Login.jsx";
import { ModifyUser } from "./ModifyUser/ModifyUser.jsx";
import { useWindowSize } from "../../useWindowSize/useWindowSize"
import style from "./access.module.scss";
import { Route } from "react-router";

export function Access(props) {
  const [stateCover, setStateCover] = useState("SignUp");
  const windowSize = useWindowSize()

  const handleCover = () => {
    if (stateCover === "LogIn") {
      setStateCover("SignUp");
    } else {
      setStateCover("LogIn");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.contents}>
        {
          windowSize.width > 977 ?
        <div className={stateCover === "LogIn" ? style.login : style.signup}>
          <button onClick={handleCover}>{stateCover}</button>
        </div>
        :
        <button className={style.stateResponsive} onClick={handleCover}>{stateCover}</button>
        }
        {
         (windowSize.width < 977 && stateCover === "LogIn") ?
        <div className={style.containerLoginSignin}>
          <SignUp />
        </div>
        :
        (windowSize.width < 977 && stateCover === "SignUp" ) ?
        <div className={style.containerLoginSignin}>
          <Login />
          <Route exact path="/modifyUser" component={ModifyUser} dark={props.dark}/>
        </div>
        :
        <>
        <div className={style.containerLoginSignin}>
          <SignUp />
        </div>
        <div className={style.containerLoginSignin}>
          <Login />
          <Route exact path="/modifyUser" component={ModifyUser} dark={props.dark}/>
        </div>
        </>
        }
      </div>
    </div>
  );
}
