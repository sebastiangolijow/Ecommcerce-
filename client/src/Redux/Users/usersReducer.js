import * as actionType from "../action_types/actionTypes";

const InitialState = {
  allproducts: [],
  wantedProducts: [],
  productDetail: {},
  categories: [],
  productByCategories: {},
  users: [],
  cart: [],
  orders: [],
  userOrders: [],
  orderDetail: {},
  userLoged: {},
  userConfig: {},
};

function usersReducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case actionType.USER_LOGIN:
      return {
        ...state,
        userLoged: action.payload,
      };
    case actionType.USER_LOGOUT:
      return {
        ...state,
        userLoged: {},
      };
    case actionType.RESTORE_REDUX:
      return {
        ...state,
        userLoged: action.payload,
      };
    case actionType.USER_CONFIG:
      return {
        ...state,
        userConfig: action.payload,
      };
    case actionType.ADD_POINTS:
      return {
        ...state,
        userLoged: {
          ...state.userLoged,
          points: state.userLoged.points + action.payload,
        },
      };
    default:
      return state;
  }
}

export default usersReducer;
