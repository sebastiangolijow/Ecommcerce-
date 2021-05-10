import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const createReview = (reviews) => {
  return async (dispatch) => {
    // eslint-disable-next-line
    const { data, error } = await supabase.from("reviews").insert([
      {
        user_id: reviews.userId,
        rating: reviews.rating,
        description: reviews.description,
        product_id: reviews.productId,
      },
    ]);
  };
};

export const getReviewsOfProduct = (id) => {
  return async function(dispatch) {
    const JSON = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", id);
    dispatch({
      type: actionType.GET_REVIEW_PRODUCT,
      payload: JSON.data,
    });
  };
};

export const getUserReviews = (id) => {
  return async function(dispatch) {
    const JSON = await supabase
      .from("reviews")
      .select("*, product (name), users (name, surname)")
      .eq("user_id", id);
    dispatch({
      type: actionType.GET_USER_REVIEWS,
      payload: JSON.data,
    });
  };
};

export const getReviewById = (id) => {
  return async function(dispatch) {
    const JSON = await supabase
      .from("reviews")
      .select("*")
      .eq("id", id);
    dispatch({ type: actionType.GET_REVIEW_BY_ID, payload: JSON.data });
  };
};

export const updateReview = (review) => {
  return async function(dispatch) {
    //eslint-disable-next-line
    const JSON = await supabase
      .from("reviews")
      .update({
        description: review.description,
        rating: review.rating,
      })
      .eq("id", review.id);
  };
};

export const deleteReview = (id) => {
  return async () => {
    await supabase
      .from("reviews")
      .delete()
      .eq("id", id);
  };
};
