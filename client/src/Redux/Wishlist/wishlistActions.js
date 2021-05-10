import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getUserWishlist = (id) => {
  return async function(dispatch) {
    const JSON = await supabase
      .from("wishlist")
      .select("*, product(*, images(*))")
      .eq("user_id", id);
    dispatch({
      type: actionType.GET_USER_WISHLIST,
      payload: JSON.data,
    });
  };
};

export const addToWishlist = (payload2) => {
  let payload = payload2;
  return async function(dispatch) {
    if (payload.fav) {
      await supabase.from("wishlist").insert([
        {
          product_id: payload.id,
          user_id: payload.userId,
        },
      ]);
      dispatch(getUserWishlist(payload.userId));
    } else {
      await supabase
        .from("wishlist")
        .delete()
        .match({
          product_id: payload.id,
          user_id: payload.userId,
        });
      dispatch({ type: actionType.DELETE_ITEM_WISHLIST, payload: payload.id });
    }
  };
};
