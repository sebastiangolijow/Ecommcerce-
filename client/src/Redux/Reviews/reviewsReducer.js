import * as actionType from "../action_types/actionTypes";

const InitialState = {
  reviews: [],
};

function reviewsReducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.GET_REVIEW_PRODUCT:
      return {
        ...state,
        reviews: action.payload,
      };
    case actionType.GET_REVIEW_BY_ID:
      return {
        ...state,
        reviews: action.payload,
      };
    case actionType.GET_USER_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
}

export default reviewsReducer;
