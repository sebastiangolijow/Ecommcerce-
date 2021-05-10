import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory } from "../AddCategory/AddCategory";
import { postProduct, getCategories, totalProducts } from "../../Redux/Products/productActions.js";
import axios from 'axios';
import style from "./addproduct.module.scss";
import Modal from "@material-ui/core/Modal";
import { ArrowBack } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

export function AddProduct() {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    images: [],
    brand: "",
    stock: 0,
    model: "",
    ranking: 0,
    storage: "",
    status: true,
    categories: [],
  });
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.productReducer.categories);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    let selected = [];
    for (let i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected === true) {
        selected.push(e.target.options[i].value);
      }
    }
    setData({
      ...data,
      categories: selected,
    });
  };

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
      images: [...data.images, ...urls],
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const createProd = (data) => {
    upload().then(
    dispatch(postProduct(data))
    );
    dispatch(totalProducts())
  };

  const changeModal = () => {
    if (modal === true) {
      setModal(false);
    } else setModal(true);
  };

  return (
    <div class={style.div}>
      <Link to={`/controlpanel`}>
        <ArrowBack class={style.button3}>Back</ArrowBack>
      </Link>
      <form class={style.form}>
        <h1>{t("addProduct.title")}</h1>
        <div>
          <label class={style.label}>{t("addProduct.title1")}</label>
          <input
            class={style.input}
            name="name"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label class={style.input}>{t("addProduct.title2")}</label>
          <textarea
            name="description"
            rows="6"
            cols="40"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <div>
          <label>{t("addProduct.title3")}</label>
          <input
            class={style.input}
            name="price"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("addProduct.title4")}</label>
          <input
            class={style.input}
            name="brand"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("addProduct.title5")}</label>
          <input
            class={style.input}
            name="model"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("addProduct.title6")}</label>
          <input
            class={style.input}
            name="stock"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("addProduct.title7")}</label>
          <input
            class={style.input}
            name="ranking"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("addProduct.title8")}</label>
          <input
            class={style.input}
            name="storage"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div>
          <label>{t("addProduct.title9")}</label>
          <select onChange={handleSelect} name="categories" multiple>
            {categories.map((e) => {
              return (
                <option value={e.name} name={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label for="avatar">{t("addProduct.title10")}</label>
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
        </div>
        <Link to={`/controlpanel`}>
          <button
            type="submit"
            onClick={() => {
              createProd(data);
            }}
          >
            {t("addProduct.title12")}
          </button>
        </Link>
      </form>
      <div>
        <button class={style.button2} onClick={changeModal}>
          {t("addProduct.title13")}
        </button>
        <Modal class={style.modal} open={modal} onClose={changeModal}>
          <AddCategory />
        </Modal>
      </div>
    </div>
  );
}
