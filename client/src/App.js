import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./AuthRoutes/ProtectedRoute";
import { useLocalStorage } from "./LocalStorage/useLocalStorage";
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { Access } from "./Components/Access/Access";
import { ModifyUser } from "./Components/Access/ModifyUser/ModifyUser";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel.jsx";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./Redux/Cart/cartActions";
import { userStorage } from "./Redux/Users/usersActions";
import { Reset } from "./Components/Access/ResetPassword/ResetPassword";
import { Review } from "./Components/Review/review";
import { Payment } from "./Components/Payment/Payment";
import { ModifyReview } from "./Components/Review/modifyReview";
import { getProductsVisited } from "./Redux/Products/productActions";
import { Banner2 } from "./Components/Banner/Banner";
import { ActiveUser } from "./Components/ControlPanel/ActiveUser/ActiveUser";
import AboutUs from "./Components/AboutUs/AboutUs";
import SimonSays from "./Components/VideoGame/SimonSays";
import { Points } from "./Components/Points/Points";
import { DaySelector } from "./Components/AppointmentsSelector/DaySelector/DaySelector";
import { Appointments } from "./Components/AppointmentsSelector/Appointments/Appointments";
import Wishlist from "./Components/Wishlist/Wishlist";
import { getUserWishlist } from "./Redux/Wishlist/wishlistActions";

function App() {
  // eslint-disable-next-line
  const [userLogedStorage, setUserLogedStorage] = useLocalStorage(
    "supabase.auth.token",
    ""
  );
  const [productsVisited, setProductsVisited] = useLocalStorage(
    "productVisited",
    []
  );

  const dark = useSelector((state) => state.darkReducer.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLogedStorage) {
      dispatch(userStorage(userLogedStorage.currentSession.user.id));
      dispatch(getUserWishlist(userLogedStorage.currentSession.user.id));
    }
    dispatch(setCart(userLogedStorage.currentSession?.user.id));
    const lastProducts = async () => {
      if (productsVisited) {
        await dispatch(getProductsVisited(productsVisited));
        setProductsVisited([], true);
      }
    };
    lastProducts();
    // eslint-disable-next-line
  }, [dispatch, userLogedStorage]);

  return (
    <Layout dark={dark}>
      <Route exact path="/" component={Banner2} />
      <Route exact path="/" render={() => <Home dark={dark} />} />
      <ProtectedRoute exact path="/Access" component={() => <Access />} />
      <ProtectedRoute
        exact
        path="/myprofile"
        component={() => <ModifyUser dark={dark} />}
      />
      <ProtectedRoute
        exact
        path="/modifyUser/:id"
        restringed="customer"
        component={({ match }) => (
          <ModifyUser id={match.params.id} dark={dark} />
        )}
      />
      <Route exact path="/resetPassword" render={() => <Reset dark={dark} />} />
      <Route
        exact
        path="/Product/:id"
        render={({ match }) => <Product id={match.params.id} dark={dark} />}
      />
      <Route exact path="/catalogue" render={() => <Catalogue dark={dark} />} />
      <Route
        exact
        path="/AddProduct"
        render={() => <AddProduct dark={dark} />}
      />
      <Route
        exact
        path="/activedUser/:id"
        component={({ match }) => (
          <ActiveUser id={match.params.id} dark={dark} />
        )}
      />
      <Route exact path="/Order" render={() => <CheckOut dark={dark} />} />
      <Route exact path="/About" render={() => <AboutUs dark={dark}/>} />
      <Route exact path="/points" render={() => <Points dark={dark} />} />

      <ProtectedRoute
        exact
        path="/modifyProduct/:id"
        restringed="customer"
        component={({ match }) => (
          <ModifyProduct id={match.params.id} dark={dark} />
        )}
      />
      <Route
        exact
        path="/rate-product/:id"
        render={({ match }) => <Review id={match.params.id} dark={dark} />}
      />
      <ProtectedRoute
        exact
        path="/controlpanel"
        component={() => <ControlPanel dark={dark} />}
      />
      <Route exact path="/review" render={() => <Review dark={dark} />} />
      <Route
        exact
        path="/order/payment"
        render={() => <Payment dark={dark} />}
      />
      <ProtectedRoute
        exact
        path="/modifyReview/:id"
        component={({ match }) => (
          <ModifyReview id={match.params.id} dark={dark} />
        )}
      />
      <ProtectedRoute exact path="/videogame" component={SimonSays} />
      <ProtectedRoute exact path="/dayselect" component={DaySelector} />
      <ProtectedRoute exact path="/appointments" component={Appointments} />
      <ProtectedRoute exact path="/wishlist" component={Wishlist} />
    </Layout>
  );
}

export default App;
