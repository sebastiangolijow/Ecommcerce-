import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { ResetPassword } from "../../../Redux/Users/usersActions";
import styles from './ResetPassword.module.scss'
export function Reset(props) {
  const history = useHistory()
  const dispatch = useDispatch();
  let token =
    localStorage.getItem("supabase.auth.token") &&
    JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession
      .access_token;

  const resetP = async (e) => {
    e.preventDefault();
    if (
      !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,15})/.test(
        document.getElementById("password").value
      )
    ) {
      swal("Invalid password", "", "warning");
    } else if (document.getElementById("password").value !== document.getElementById("repeat").value) {
      swal("Password doesn't match", "", "warning");
    } else {
      await dispatch(ResetPassword(token, document.getElementById("password").value));
      swal("Your password was successfully reset");
      history.push("/access")
    }
  };

  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <div className={styles.reset}>
        <div className={styles.title}>
          <span>Reset Password</span>
        </div>
        <form className={styles.form}>
          <div className={styles.password}>
            <label>New password</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className={styles.repeat}>
            <label>Repeat password</label>
            <input type="password" id="repeat" placeholder="Password" />
          </div>
          <button type="submit" onClick={(e) => resetP(e)}>
            Reset password
            </button>
        </form>
      </div>
    </div>
  );
}
