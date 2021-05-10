import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ActiveUser.module.scss";
import { getUser, activatedUser } from "../../../Redux/Users/usersActions";

export function ActiveUser({ id, dark }) {
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.usersReducer.userLoged);
  const userConfig = useSelector((state) => state.usersReducer.userConfig);
  const [dataUser, setDataUser] = useState({
    id,
    userName: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
  });

  // eslint-disable-next-line
  const handleInputChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  console.log(id);

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
          city: userLog.address && userLog.address[0].city,
          postal_code: userLog.address && userLog.address[0].postal_code,
          country: userLog.address && userLog.address[0].country,
          active: userLog.active,
        });
    }
    // eslint-disable-next-line
  }, [userLog, userConfig]);

  const activateUser = (e) => {
    e.preventDefault();
    dispatch(activatedUser(dataUser.id, dataUser.userName));
  };

  return (
    <div className={dark ? style.containerDark : style.container}>
      <div className={style.user}>
        <div className={style.title}>
          <span>Modify User</span>
        </div>
        <form class={style.form}>
          <div className={style.name}>
            <label>User name</label>
            <input
              type="text"
              value={dataUser.userName}
              name="userName"
            ></input>
          </div>
          <div className={style.phone}>
            <label>Phone</label>
            <input value={dataUser.phone}></input>
          </div>
          <div className={style.address}>
            <label>Address</label>
            <input name="address" value={dataUser.address}></input>
          </div>
          <div className={style.city}>
            <label>City</label>
            <input name="city" value={dataUser.city}></input>
          </div>
          <div className={style.postal}>
            <label>Postal code</label>
            <input name="postal_code" value={dataUser.postal_code}></input>
          </div>
          <div className={style.country}>
            <label>Country</label>
            <input
              class={style.input}
              name="country"
              value={dataUser.country}
            ></input>
          </div>
          <button type="submit" onClick={(e) => activateUser(e)}>
            Activate account
          </button>
        </form>
      </div>
    </div>
  );
}
