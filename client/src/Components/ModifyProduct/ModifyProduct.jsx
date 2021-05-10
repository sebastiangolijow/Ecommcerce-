import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  productDetail,
  getCategories,
} from "../../Redux/Products/productActions.js";
import style from "./modifyproduct.module.scss";
//import { Clear } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";

export function ModifyProduct({ id }) {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    stock: 0,
    model: "",
    ranking: 0,
    storage: "",
    status: true,
    categories: [],
    images: [],
    delImages: [],
    upImages: [],
  });

  const [imageLink, setImageLink] = useState({
    links: [],
  });

  const upload = async () => {
    let urls = await Promise.all(
      imageLink.links.map(async (i) => {
        const formData = new FormData();
        formData.append("file", i);
        formData.append("upload_preset", "techstore_uploads");
        let response = await axios.post(
          "http://api.cloudinary.com/v1_1/techstore/image/upload",
          formData
        );
        return {
          link: response.data.secure_url,
          public_id: response.data.public_id,
        };
      })
    );

    setData({
      ...data,
      upImages: [...data.upImages, ...urls],
      images: [...data.images, ...urls],
    });
  };

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.productDetail);
  let categories = useSelector((state) => state.productReducer.categories);
  categories = categories.filter(
    (i) =>
      data.categories && !data.categories.map((i) => i.name).includes(i.name)
  );

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    (function getCatAndProd() {
      dispatch(getCategories());
      dispatch(productDetail(id));
    })();
  }, [dispatch, id]);

  useEffect(() => {
    setData({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
      model: product.model,
      ranking: product.ranking,
      storage: product.storage,
      status: true,
      categories: product.categories,
      images: product.images,
      delImages: [],
      upImages: [],
    });
  }, [product]);

  const modifyProduct = async () => {
    await dispatch(updateProduct(data, id));
  };

  const removeCategory = (e) => {
    const filtredCat = data.categories.filter((cat) => {
      return e.target.id !== cat.id;
    });
    setData({ ...data, categories: filtredCat });
  };

  const addCategory = (e) => {
    for (let i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected === true) {
        setData({
          ...data,
          categories: data.categories.concat({
            id: e.target.options[i].id,
            name: e.target.options[i].value,
          }),
        });
      }
    }
  };
  const removeImage = (c) => {
    const filtredImage = data.images.filter((image) => {
      return c.target.src !== image.url;
    });
    setData({
      ...data,
      images: filtredImage,
      delImages: [
        ...data.delImages,
        {
          url: c.target.src,
          product_id: c.target.id,
        },
      ],
    });
  };

  return (
    <div>
      <form class={style.form}>
        <h1>{t("modifyProduct.title")}</h1>
        <div>
          <label class={style.label}>{t("modifyProduct.title1")}</label>
          <input
            class={style.input}
            type="text"
            value={data.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label class={style.input}>{t("modifyProduct.title2")}</label>
          <textarea
            name="description"
            rows="6"
            cols="40"
            value={data.description}
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <div>
          <label>{t("modifyProduct.title3")}</label>
          <input
            class={style.input}
            name="price"
            value={data.price}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("modifyProduct.title4")}</label>
          <input
            class={style.input}
            name="brand"
            value={data.brand}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("modifyProduct.title5")}</label>
          <input
            class={style.input}
            name="model"
            value={data.model}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("modifyProduct.title6")}</label>
          <input
            class={style.input}
            name="stock"
            value={data.stock}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("modifyProduct.title7")}</label>
          <input
            class={style.input}
            name="ranking"
            value={data.ranking}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("modifyProduct.title8")}</label>
          <input
            class={style.input}
            name="storage"
            value={data.storage}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <select onClick={(e) => addCategory(e)}>
            {categories &&
              categories.map((category) => (
                <option id={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div class={style.categories}>
          <h4>{t("modifyProduct.title9")}</h4>
          {data.categories &&
            data.categories.map((category) => (
              <div>
                <button
                  type="button"
                  id={category.id}
                  value={category.name}
                  onClick={(e) => removeCategory(e)}
                >
                  {category.name}
                </button>
              </div>
            ))}
        </div>
        <div>
          <h4>{t("modifyProduct.title10")}</h4>
          <div className={style.images}>
            {data.images &&
              data.images.map((img) => (
                <img
                  src={img.url}
                  alt="."
                  id={img.product_id}
                  className={style.miniature}
                  onClick={(e) => removeImage(e)}
                />
              ))}
          </div>
        </div>
        <input
          type="file"
          onChange={(event) => {
            let imgfiles = [];
            for (let i = 0; i < event.target.files.length; i++) {
              imgfiles.push(event.target.files[i]);
            }
            setImageLink({
              ...imageLink,
              links: imgfiles,
            });
          }}
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          multiple
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            upload();
          }}
        >
          {t("modifyProduct.title11")}
        </button>
        <div>
          <Link to={`/controlpanel`}>
            <button
              className={style.updateImage}
              type="submit"
              onClick={modifyProduct}
            >
              {t("modifyProduct.title12")}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
