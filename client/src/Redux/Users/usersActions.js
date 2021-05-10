import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";
import { addItemCart, setCart } from "../Cart/cartActions";
const axios = require("axios");
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const postUser = (users) => {
  return async () => {
    const { user, error } = await supabase.auth.signUp({
      email: users.email,
      password: users.password,
    });
    if (error) {
      return error;
    } else {
      await supabase.from("users").insert([
        {
          id: user.id,
          name: users.name,
          surname: users.surname,
          email: user.email,
          user_name: users.userName,
          phone: users.phone,
          recommended: users.recommended && users.recommended,
        },
      ]);
      await supabase.from("address").insert([
        {
          user_id: user.id,
          address: users.streetName,
          streetNumber: users.streetNumber,
          city: users.city,
          postal_code: users.postal_code,
          country: users.country,
        },
      ]);
      await supabase.from("order").insert([
        {
          user_id: user.id,
          orderStatus: "inCart",
          email: user.email,
        },
      ]);
      return user;
    }
  };
};

export const updateUser = (users) => {
  return async () => {
    // eslint-disable-next-line
    const { user, error } = await supabase.auth.update({
      email: "new@email.com",
      password: "new-password",
    });

    await supabase
      .from("users")
      .update({
        user_name: users.userName,
        phone: users.phone,
      })
      .eq("id", users.id);

    const addressId = await supabase
      .from("address")
      .select("id")
      .eq("user_id", users.id);

    await supabase
      .from("address")
      .update({
        address: users.address,
        city: users.city,
        postal_code: users.postal_code,
        country: users.country,
      })
      .eq("id", addressId.data[0].id);
  };
};

export const allUsers = (user) => {
  return async function(dispatch) {
    if (!user) {
      let JSON = await supabase.from("users").select("*");
      return dispatch({ type: actionType.ALL_USERS, payload: JSON.data });
    }
    let JSON = await supabase
      .from("users")
      .select("*")
      .ilike("name", `%${user}%`);
    dispatch({ type: actionType.ALL_USERS, payload: JSON.data });
  };
};

export const deleteUser = (id) => {
  return async () => {
    await supabase
      .from("address")
      .delete("*")
      .match({ user_id: id });
    await supabase
      .from("users")
      .delete()
      .eq("id", id);
  };
};

export const userLogin = (users) => {
  return async function(dispatch) {
    let actived = await supabase
      .from("users")
      .select("active")
      .eq("email", users.email);

    if (actived.data[0].active === true) {
      const { data: user, error } = await supabase.auth.signIn({
        email: users.email,
        password: users.password,
      });
      if (error) {
        alert(error.message);
      } else {
        let previousStorage =
          localStorage.getItem("cart") &&
          JSON.parse(window.localStorage.getItem("cart"));
        previousStorage.map((item) => addItemCart(item));
        dispatch({ type: actionType.USER_LOGIN, payload: user.user });
        const userLoged = await supabase
          .from("users")
          .select("*,address(*)")
          .eq("email", users.email);
        dispatch({ type: actionType.USER_LOGIN, payload: userLoged.data[0] });
        setTimeout(() => {
          dispatch(setCart(user.user.id));
        }, 2000);
      }
    } else if (actived.data[0].active === false) {
      const user_id = await supabase
        .from("users")
        .select("id,user_name")
        .eq("email", users.email);

      swal(
        "Account deactivated",
        "If you want to active your account, press the button",
        "error",
        {
          buttons: { button: "Active" },
        }
      ).then(() =>
        dispatch(mailActivate(user_id.data[0].id, user_id.data[0].user_name))
      );
    } else {
      swal("Oops", "Email or password incorrect", "error");
    }
  };
};

export const userStorage = (id) => {
  return async function(dispatch) {
    if (id) {
      const userLoged = await supabase
        .from("users")
        .select("*,address(*)")
        .eq("id", id);
      dispatch({ type: actionType.USER_LOGIN, payload: userLoged.data[0] });
    }
  };
};

export const sendMail = (email) => {
  return async function() {
    // eslint-disable-next-line
    const { error, data } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    error
      ? swal("Oops!", error.message, "error")
      : swal("We send you an email to reset your password");
  };
};

export const ResetPassword = (access_token, new_password) => {
  return async function() {
    try {
      // eslint-disable-next-line
      const { error, data } = await supabase.auth.api.updateUser(access_token, {
        password: new_password,
      });
    } catch (e) {
      swal("Oops", "Invalid dates", "error");
    }
  };
};

export const userLogOut = () => {
  return function(dispatch) {
    const { error } = supabase.auth.signOut();
    localStorage.setItem("cart", "[]");

    if (error) {
      return error;
    } else {
      dispatch({ type: actionType.SET_CART, payload: [] });
      dispatch({ type: actionType.USER_LOGOUT });
    }
  };
};

export const changeUserPermission = (id, newPermission) => {
  return async function() {
    await supabase
      .from("users")
      .update({
        permission: newPermission,
      })
      .eq("id", id);
  };
};

export const deactivate = (id, userName) => {
  return async function() {
    try {
      await supabase
        .from("users")
        .update({
          active: false,
        })
        .eq("id", id);
      swal(
        "Account deactivated",
        "If you want recovery your account, try login again",
        "error"
      );
      await axios.post(
        `https://henrystechstore.herokuapp.com/mercadopago/send?userName=${userName}`
      );
    } catch (e) {}
  };
};

export const mailActivate = (id, userName) => {
  return async function() {
    try {
      console.log("mail");
      swal(
        "Send email",
        "Please, wait the admin will active your account in a moment",
        "success"
      );
      await axios.post(
        `https://henrystechstore.herokuapp.com/mercadopago/send?id=${id}&userName=${userName}&status='actived'`
      );
    } catch (e) {}
  };
};

export const activate = (email) => {
  return async function() {
    try {
      await supabase
        .from("users")
        .update({
          active: true,
        })
        .eq("email", email);
      swal("Oops", "Usuario activado", "success");
      await axios.post(
        `https://henrystechstore.herokuapp.com/mercadopago/send?email=${email}&status='actived'`
      );
    } catch (e) {}
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    const user = await supabase
      .from("users")
      .select("*,address(*)")
      .eq("id", id);
    dispatch({ type: actionType.USER_CONFIG, payload: user.data[0] });
  };
};

export const activatedUser = (id, name) => {
  return async function() {
    try {
      await supabase
        .from("users")
        .update({
          active: true,
        })
        .eq("id", id);

      const user = await supabase
        .from("users")
        .select("email")
        .eq("id", id);
      swal("Oops", "usuario activado", "success");
      await axios.post(
        `https://henrystechstore.herokuapp.com/mercadopago/send?id=${id}&name=${name}&email=${user.data[0].email}`
      );
    } catch (e) {}
  };
};

export const searchPoints = (id) => {
  return async function() {
    let response = await supabase
      .from("users")
      .select("points")
      .eq("id", id);

    return response.data[0].points;
  };
};

export const addPoints = (userData, points) => {
  return async (dispatch) => {
    const user = await supabase
      .from("users")
      .select("points")
      .eq("id", userData);

    await supabase
      .from("users")
      .update({ points: user.data[0].points + points })
      .eq("id", userData);

    dispatch({ type: actionType.ADD_POINTS, payload: points });
  };
};
