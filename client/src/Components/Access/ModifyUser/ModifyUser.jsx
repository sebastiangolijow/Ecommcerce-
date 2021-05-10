import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import style from "./ModifyUser.module.scss";
import {
  updateUser,
  getUser,
  sendMail,
  deactivate,
  mailActivate,
  activate,
  userLogOut,
  userStorage,
} from "../../../Redux/Users/usersActions";
import { EditUsers } from "./EditUsers/EditUsers";
import swal from "sweetalert";

export function ModifyUser({ id, dark }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLog = useSelector((state) => state.usersReducer.userLoged);
  const userConfig = useSelector((state) => state.usersReducer.userConfig);
  const [dataUser, setDataUser] = useState({
    id,
    userName: "",
    phone: "",
    address: "",
    streetNumber: "",
    city: "",
    postal_code: "",
    country: "",
    points: "",
  });

  const handleInputChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      const gUser = async () => {
        await dispatch(getUser(id));
      };
      gUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id) {
      setDataUser({
        id: userConfig.id,
        userName: userConfig.user_name,
        phone: userConfig.phone,
        address: userConfig.address && userConfig.address[0].address,
        streetNumber:
          userConfig.streetNumber && userConfig.address[0].streetNumber,
        city: userConfig.address && userConfig.address[0].city,
        postal_code: userConfig.address && userConfig.address[0].postal_code,
        country: userConfig.address && userConfig.address[0].country,
        permission: userConfig.permission,
        email: userConfig.email,
        active: userConfig.active,
      });
    } else {
      userLog &&
        setDataUser({
          id: userLog.id,
          userName: userLog.user_name,
          phone: userLog.phone,
          address: userLog.address && userLog.address[0].address,
          streetNumber: userLog.address && userLog.address[0].streetNumber,
          city: userLog.address && userLog.address[0].city,
          postal_code: userLog.address && userLog.address[0].postal_code,
          country: userLog.address && userLog.address[0].country,
          active: userLog.active,
          points: userLog.points,
        });
    }
    // eslint-disable-next-line
  }, [userLog, userConfig]);

  const resetPassword = () => {
    dispatch(sendMail(dataUser.email));
  };

  const modifyUser = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(dataUser));
    dispatch(userStorage(dataUser.id));
    swal("Your information was modified correctly", "", "success").then(() => {
      history.push("/");
    });
  };

  const deactivateUser = (e) => {
    e.preventDefault();
    dispatch(deactivate(dataUser.id, dataUser.userName));
    dispatch(userLogOut());
  };

  const activateUser = (e) => {
    e.preventDefault();
    dispatch(mailActivate(dataUser.id, dataUser.userName));
  };

  const activateUserFromAdmin = () => {
    dispatch(activate(dataUser.id));
  };

  return (
    <div className={dark ? style.containerDark : style.container}>
      <div className={style.user}>
        <div className={style.title}>
          <span>My profile</span>
        </div>
        <form class={style.form}>
          <div className={style.name}>
            <label>User name</label>
            <input
              type="text"
              value={dataUser.userName}
              name="userName"
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.phone}>
            <label>Phone</label>
            <input
              name="phone"
              value={dataUser.phone}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.address}>
            <label>Address</label>
            <input
              name="address"
              value={dataUser.address}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.address}>
            <label>Street number</label>
            <input
              name="streetNumber"
              value={dataUser.streetNumber}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.city}>
            <label>City</label>
            <input
              name="city"
              value={dataUser.city}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.postal}>
            <label>Postal code</label>
            <input
              name="postal_code"
              value={dataUser.postal_code}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>

          <div className={style.country}>
            <label>Country</label>
            <input
              class={style.input}
              name="country"
              value={dataUser.country}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className={style.country}>
            <label>Tech Points</label>
            <h3>{Math.floor(dataUser.points)}</h3>
          </div>
          {(userLog.permission === "superadmin" ||
            userLog.permission === "admin") &&
            dataUser.id !== userLog.id && (
              <>
                <div className={style.permission}>
                  <label>Permission</label>
                  <label>{dataUser.permission}</label>
                  <EditUsers
                    permission={dataUser.permission}
                    id={dataUser.id}
                  />
                </div>
                <div className={style.email}>
                  <label>Reset Password</label>
                  <label>{dataUser.email}</label>
                  <button
                    className={style.simpleButton}
                    type="button"
                    onClick={(e) => resetPassword(e)}
                  >
                    Reset Email
                  </button>
                </div>
              </>
            )}

          <button type="submit" onClick={(e) => modifyUser(e)}>
            Modify
          </button>
          {
            (dataUser.id !== userLog.id &&
            (userLog.permission === "superadmin" ||
              userLog.permission === "admin") &&
            !dataUser.active ? (
              <button type="submit" onClick={(e) => activateUserFromAdmin(e)}>
                Activate account from admin
              </button>
            ) : null,
            !id &&
              (dataUser.active ? (
                <button type="submit" onClick={(e) => deactivateUser(e)}>
                  Deactivate account
                </button>
              ) : (
                <button type="submit" onClick={(e) => activateUser(e)}>
                  Activate account
                </button>
              )))
          }
        </form>
      </div>
    </div>
  );
}
