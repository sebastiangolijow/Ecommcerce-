import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
//import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { addItemCart } from "../../../Redux/Cart/cartActions";
import styles from "./Cards.module.scss";
import { useTranslation } from "react-i18next";

export const Cards = (props) => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    let cartItemModel = {
      title: item.title,
      image: item.images,
      id: item.id,
      quantity: 1,
      price: item.price,
      stock: item.stock,
    };
    dispatch(addItemCart(cartItemModel));
    swal("Done!", "Added to cart", "success");
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.stock}>
          <WhatshotIcon fontSize="small" />
          10% OFF!
          <WhatshotIcon fontSize="small" />
        </span>
        <div className={styles.title}>
          <NavLink to={`/product/${props.id}`}>
            {props.title?.split(" ").slice(0, 3).join(" ")}
          </NavLink>
        </div>

        <div className={styles.image}>
          <NavLink to={`/product/${props.id}`}>
            <img src={props.images} alt="." />
          </NavLink>
        </div>

        <div className={styles.offer}>
          <span>
            US$<b>{(props.price * 1.1).toFixed(2)}</b>
          </span>
        </div>
        <div className={styles.price}>
          <span>
            US$<b>{props.price}</b>
          </span>
        </div>
      </div>
      {props.stock > 0 ? (
        <button
          className={styles.btnOn}
          onClick={() => {
            handleAddToCart(props);
          }}
        >
          <span>{t("card.textOne")}</span> <AddShoppingCartIcon />
        </button>
      ) : (
        <button
          className={styles.btnOff}
          onClick={() => {
            swal("Sorry!", "Come back in a few days", "error");
          }}
        >
          <span>{t("card.textFour")}</span> <RemoveShoppingCartIcon />
        </button>
      )}
    </div>
  );
};

export default Cards;
