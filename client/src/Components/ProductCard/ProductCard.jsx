import React from "react";
import Style from "./productcard.module.scss";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BlockIcon from "@material-ui/icons/Block";
import { addItemCart } from "../../Redux/Cart/cartActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export function ProductCard(props) {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    let cartItemModel = {
      title: item.title,
      image: item.image,
      id: item.id,
      quantity: 1,
      price: (item.price * (1 - item.discount / 100)).toFixed(2),
      stock: item.stock,
    };
    dispatch(addItemCart(cartItemModel));
    swal("Done!", "Added to your cart", "success");
  };
  return (
    <div className={props.stock ? Style.container : Style.off}>
      <div className={Style.card}>
        <div className={Style.stock}>
          {props.stock > 0 ? (
            <span className={Style.on}>
              {" "}
              {t("card.textFive")} <CheckCircleIcon fontSize="small" />
            </span>
          ) : (
            <span className={Style.out}>
              {" "}
              {t("card.textFour")} <BlockIcon fontSize="small" />
            </span>
          )}
        </div>
        <div className={Style.image}>
          <NavLink to={`/product/${props.id}`}>
            <img src={props.image} alt="." />
          </NavLink>
        </div>
        <div className={Style.name}>
          <NavLink to={`/product/${props.id}`}>
            {props.title
              ?.split(" ")
              .slice(0, 3)
              .join(" ")}
          </NavLink>
        </div>
        <div className={Style.price}>
          <span>
            US$<b>{props.price}</b>
          </span>
        </div>
      </div>

      {props.stock > 0 ? (
        <button
          className={Style.btnOn}
          onClick={() => {
            handleAddToCart(props);
          }}
        >
          <span>{t("card.textOne")}</span> <AddShoppingCartIcon />
        </button>
      ) : (
        <button
          className={Style.btnOff}
          onClick={() => {
            swal("Sorry!", "Come back in a few days", "error");
          }}
        >
          <span>{t("card.textFour")}</span> <RemoveShoppingCartIcon />
        </button>
      )}
    </div>
  );
}
