import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

//Cart actions
export function setCart(user_id) {
  return async function(dispatch) {
    if (user_id) {
      //if logged
      let { data, error } = await supabase
        .from("order")
        .select("*,order_detail(*)")
        .eq("orderStatus", "inCart")
        .eq("user_id", user_id);
      if (error) console.log(error.message);
      var cartDB = data.length
        ? data[0].order_detail.map((item) => {
            return {
              id: item.product_id,
              title: item.title,
              image: item.image,
              quantity: item.quantity,
              price: item.price,
              stock: item.stock,
            };
          })
        : [];

      // localStorage.setItem("cart", JSON.stringify(cartDB));
      dispatch({ type: actionType.SET_CART, payload: cartDB });
    } else {
      let previousStorage = window.localStorage.getItem("cart");
      if (previousStorage) {
        previousStorage = JSON.parse(previousStorage);
        dispatch({ type: actionType.SET_CART, payload: previousStorage });
      } else {
        localStorage.setItem("cart", "[]");
        dispatch({ type: actionType.SET_CART, payload: [] });
      }
    }
  };
}

export const addItemCart = (payload) => {
  //check if user logged
  let userId =
    localStorage.getItem("supabase.auth.token") &&
    JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession.user
      .id;

  if (userId) {
    // IF IS LOGGED
    let addItemstoDB = async () => {
      var usercart = await supabase
        .from("order")
        .select("*,order_detail(*)")
        .eq("orderStatus", "inCart")
        .eq("user_id", userId);

      // get userCart from DB
      let databasecart = usercart.data[0]?.order_detail;
      // check if the payload is on cart
      let updateProduct = databasecart?.find(
        (item) => item.product_id === payload.id
      );

      if (updateProduct) {
        //if product is already on cart, update
        await supabase
          .from("order_detail")
          .update({
            quantity: updateProduct.quantity + payload.quantity,
          })
          .eq("order_id", updateProduct.order_id)
          .eq("product_id", updateProduct.product_id);
      } else {
        //if product is not in cart, insert
        await supabase.from("order_detail").insert([
          {
            product_id: payload.id,
            price: payload.price,
            quantity: payload.quantity,
            title: payload.title,
            order_id: usercart.data[0]?.id,
            user_id: userId,
            image: payload.image,
            stock: payload.stock,
          },
        ]);
      }
    };
    addItemstoDB();
    return { type: actionType.ADD_ITEM_CART, payload };
  } // IF NOT LOGGED
  //check for previous cart in LocalStorage
  let previousStorage = window.localStorage.getItem("cart");
  if (previousStorage) {
    previousStorage = JSON.parse(previousStorage);
  } else {
    previousStorage = [];
  }

  let found = previousStorage.find((item) => item.id === payload.id);
  // if item is already in the previous cart
  if (found) {
    previousStorage.map((prod) => {
      if (prod.id === payload.id) {
        prod.quantity += payload.quantity;
      }
      return prod;
    });
  } else {
    // if not in the prev cart, add to cart
    previousStorage.push(payload);
  }
  const updatedStorage = JSON.stringify(previousStorage);
  window.localStorage.setItem("cart", updatedStorage);

  // Update Redux
  return { type: actionType.ADD_ITEM_CART, payload };
};

export const deleteItemCart = (payload) => {
  let previousStorage = window.localStorage.getItem("cart");
  if (previousStorage) {
    previousStorage = JSON.parse(previousStorage);
    previousStorage = previousStorage.filter((el) => el.id !== payload.id);

    let userId =
      localStorage.getItem("supabase.auth.token") &&
      JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession
        .user.id;

    if (userId) {
      let deleteItemDB = async () => {
        const idOrder = await supabase
          .from("order")
          .select("id")
          .eq("user_id", userId)
          .eq("orderStatus", "inCart");

        await supabase
          .from("order_detail")
          .delete()
          .match({
            product_id: payload.id,
            order_id: idOrder.data[0].id,
          });
      };
      deleteItemDB();
    }
  } else {
    previousStorage = [];
  }

  const updatedStorage = JSON.stringify(previousStorage);
  window.localStorage.setItem("cart", updatedStorage);

  return { type: actionType.DELETE_ITEM_CART, payload };
};

export const clearCart = () => {
  localStorage.setItem("cart", "[]");
  const userToken = localStorage.getItem("supabase.auth.token");
  if (userToken) {
    const userData = JSON.parse(userToken).currentSession.user;

    const clearDbCart = async (userId) => {
      const idOrder = await supabase
        .from("order")
        .select("id")
        .eq("user_id", userId)
        .eq("orderStatus", "inCart")

      await supabase
        .from("order_detail")
        .delete()
        .eq("order_id", idOrder.data[0].id);
    };
    clearDbCart(userData.id);
  }
  return {
    type: actionType.CLEAR_CART,
    payload: [],
  };
};

export const checkstock = (
  userId,
  status,
  amount,
  discountPoints,
  products
) => {
  return async function(dispatch) {
    // eslint-disable-next-line
    if (status === "approved") {
      if (userId) {
        let pointsMainUser = await supabase
          .from("users")
          .select("points,recommended")
          .eq("id", userId);

        await supabase
          .from("users")
          .update({
            points: pointsMainUser.data[0].points + amount,
          })
          .eq("id", userId);

        if (pointsMainUser.data[0].recommended) {
          let pointsRecoUser = await supabase
            .from("users")
            .select("points")
            .eq("email", pointsMainUser.data[0].recommended);

          await supabase
            .from("users")
            .update({
              points: pointsRecoUser.data[0].points + amount * 0.2,
            })
            .eq("email", pointsMainUser.data[0].recommended);
        }

        if (discountPoints) {
          await supabase
            .from("users")
            .update({
              points: pointsMainUser.data[0].points - discountPoints,
            })
            .eq("id", userId);

          amount = -discountPoints;
        }
        console.log(amount);
        dispatch({ type: actionType.ADD_POINTS, payload: amount });
      }
    } else {
      if (userId) {
        // eslint-disable-next-line
        let cartuser = await supabase
          .from("order")
          .select("order_detail(*)")
          .eq("user_id", userId)
          .eq("orderStatus", "inCart")
          .then((res) => (products = res));

        products.data[0].order_detail.map(async (product) => {
          let stock = await supabase
            .from("product")
            .select("stock")
            .eq("id", product.product_id);

          await supabase
            .from("product")
            .update({
              stock: stock.data[0]?.stock + product.quantity,
            })
            .eq("id", product.product_id);
        });
      } else {
        products.map(async (product) => {
          let stock = await supabase
            .from("product")
            .select("stock")
            .eq("id", product.id);

          await supabase
            .from("product")
            .update({
              stock: stock.data[0].stock + product.quantity,
            })
            .eq("id", product.id);
        });
      }
    }
  };
};

export const checkout = (
  userId,
  status,
  amount,
  userEmail,
  address,
  postalCode
) => {
  return async function(dispatch) {
    if (!userId) {
      await supabase.from("order").insert([
        {
          guest: true,
          orderStatus: status,
          amount: amount,
          email: userEmail,
          shipAddress: address,
          postalCode: postalCode,
          //orderDate:hoy
        },
      ]);
    } else {
      // eslint-disable-next-line
      const { data, error } = await supabase
        .from("order")
        .update({
          orderStatus: status,
          amount: amount,
          shipAddress: address,
          postalCode: postalCode,
          email: userEmail,
          //orderDate:hoy,
        })
        .eq("user_id", userId)
        .eq("orderStatus", "inCart");

      await supabase.from("order").insert([
        {
          user_id: userId,
          orderStatus: "inCart",
          email: userEmail,
        },
      ]);
    }
    localStorage.setItem("cart", "[]");
    dispatch({ type: actionType.SET_CART, payload: [] });
  };
};
