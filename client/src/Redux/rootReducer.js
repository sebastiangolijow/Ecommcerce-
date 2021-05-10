import { combineReducers } from "redux";
import cartReducer from "./Cart/cartReducer";
import productReducer from "./Products/productReducer";
import orderReducer from "./Orders/orderReducer";
import usersReducer from "./Users/usersReducer";
import reviewsReducer from "./Reviews/reviewsReducer";
import darkReducer from "./Dark/darkReducer";
import appointmentReducer from "./Appointments/appointmentReducer";
import wishlistReducer from "./Wishlist/wishlistReducer";

const rootReducer = combineReducers({
  cartReducer,
  productReducer,
  orderReducer,
  usersReducer,
  reviewsReducer,
  darkReducer,
  appointmentReducer,
  wishlistReducer,
});

export default rootReducer;
