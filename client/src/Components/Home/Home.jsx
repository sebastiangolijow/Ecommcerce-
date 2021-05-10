import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getProductsByCategories } from "../../Redux/Products/productActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.scss";
import { useTranslation } from "react-i18next";
import SwiperSlider from "./Swiper/SwiperSlider";
import { checkout, checkstock } from "../../Redux/Cart/cartActions";
import swal from "sweetalert";
import queryString from "query-string";

export function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );
  const lastProducts = useSelector(
    (state) => state.productReducer.lastProducts
  );
  const stableDispatch = useCallback(dispatch, []);
  // eslint-disable-next-line
  const [t] = useTranslation("global");
  //const dark = useSelector((state) => state.darkReducer.dark)

  const queryParams = queryString.parse(window.location.search);

  let amount =
    localStorage.getItem("amountTotal") &&
    JSON.parse(localStorage.getItem("amountTotal"));
  let products = useSelector((state) => state.cartReducer.cart);
  let lsemail =
    localStorage.getItem("supabase.auth.token")?.currentSession &&
    JSON.parse(
      localStorage.getItem("supabase.auth.token").currentSession.user.email
    );

  // eslint-disable-next-line
  let idOrder = queryParams.merchant_order_id;
  let status = queryParams.status;
  let external = queryParams.external_reference;
  let mpEmail = external && external.split(",")[0];
  let userId = external && external.split(",")[1];
  let streetName = external && external.split(",")[2];
  let streetNumber = external && external.split(",")[3];
  let postalCode = external && external.split(",")[4];
  let discount = external && external.split(",")[7];
  let address = `${streetName} ${streetNumber}`;
  let userEmail = lsemail ? lsemail : mpEmail;
  let discountPoints =
    discount == 0.1
      ? 2000
      : discount == 0.2
      ? 4000
      : discount == 0.4
      ? 8000
      : null;

  const fecha = new Date();
  // eslint-disable-next-line
  const hoy = `${fecha.getFullYear()}-${fecha.getMonth() +
    1}-${fecha.getDate()}`;

  if (status) {
    let responseStatus =
      status === "approved"
        ? "success"
        : status === "rejected"
          ? "error"
          : "warning";
    swal(`Payment ${status}`, "", responseStatus);

    if (userId !== "undefined") {
      const response = dispatch(
        checkstock(
          userId,
          status,
          amount * (1 - discount),
          discountPoints,
          products
        )
      );
      response &&
        dispatch(
          checkout(userId, status, amount, userEmail, address, postalCode)
        );
    } else {
      const produc =
        localStorage.getItem("cart") &&
        JSON.parse(localStorage.getItem("cart"));
      const response = dispatch(
        checkstock(
          null,
          status,
          amount * (1 - discount),
          discountPoints,
          produc
        )
      );
      response &&
        dispatch(
          checkout(null, status, amount, userEmail, address, postalCode)
        );
    }
    history.push("/");
  }

  useEffect(() => {
    stableDispatch(getProductsByCategories());
  }, [stableDispatch]);

  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <div className={styles.containerTitle}>
        <span className={styles.tag}>{t("home.title")}</span>
      </div>
      <div className={styles.products}>
        {lastProducts?.length > 2 && (
          <div className={styles.containerP}>
            <div className={styles.title}>
              <span>{t("home2.lastProduct")}</span>
            </div>
            <div className={styles.carousel}>
              {lastProducts.length > 2 && (
                <SwiperSlider products={lastProducts} flag={true} />
              )}
            </div>
          </div>
        )}

        {productByCategories?.length > 0 &&
          productByCategories.map((categories) => {
            return (
              <div className={styles.containerP} key={categories.name}>
                <div className={styles.title}>
                  <span>{categories.name}</span>
                </div>
                <div className={styles.carousel}>
                  <SwiperSlider products={categories.product_categories} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
