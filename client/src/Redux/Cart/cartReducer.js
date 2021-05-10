import * as actionType from "../action_types/actionTypes";

const InitialState = {
  cart: [],
  orders: [],
  userOrders: [],
  order: {},
};

function cartReducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case actionType.ADD_UNIT_ITEM_CART:
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.id === action.payload.id) {
            el.quantity = el.quantity + 1;
          }
          return el;
        }),
      };
    case actionType.REMOVE_UNIT_ITEM_CART:
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.id === action.payload.id) {
            el.quantity = Math.max(1, el.quantity - 1);
          }
          return el;
        }),
      };

    case actionType.ADD_ITEM_CART:
      let found = state.cart.find((item) => item.id === action.payload.id);
      if (found)
        return {
          ...state,
          cart: state.cart.map((prod) => {
            if (prod.id === action.payload.id) {
              prod.quantity += action.payload.quantity;
            }
            return prod;
          }),
        };
      else
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };

    case actionType.GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case actionType.GET_ORDER_DETAIL:
      return {
        ...state,
        order: action.payload,
      };

    case actionType.DELETE_ITEM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== action.payload.id),
      };

    case actionType.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

export default cartReducer;
