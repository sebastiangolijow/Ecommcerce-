import * as actionType from "../action_types/actionTypes";

const InitialState = {
  orders: [],
  orderDetail: {},
  userOrder: [],
  orderProducts: [],
  userOrders: [],
};

function Reducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case actionType.GET_ALL_ORDERS_USER:
      return {
        ...state,
        userOrders: action.payload,
      };

    case actionType.GET_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };

    case actionType.GET_USER_ORDER:
      return {
        ...state,
        userOrder: action.payload,
      };

    case actionType.GET_PRODUCTS_ORDER:
      return {
        ...state,
        orderProducts: action.payload,
      };

    default:
      return state;
  }
}
export default Reducer;
