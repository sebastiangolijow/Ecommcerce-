import * as actionType from "../action_types/actionTypes";

const InitialState = {
  wishlist: [],
};

function wishlistReducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.ADD_ITEM_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case actionType.GET_USER_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case actionType.DELETE_ITEM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.product_id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export default wishlistReducer;
