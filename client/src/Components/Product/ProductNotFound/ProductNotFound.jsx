import React from "react";
import Style from "./ProductNotFound.module.scss";

const image = `image.png`;

const ProductNotFound = () => {
  return (
    <div class={Style.container}>
      <div class={Style.text}>
        <h1>Nothing here, nothing there...</h1>
        <h3>Try again in a few days!</h3>
        <img class={Style.image} src={image} alt="Product not found"></img>
      </div>
    </div>
  );
};

export default ProductNotFound;
