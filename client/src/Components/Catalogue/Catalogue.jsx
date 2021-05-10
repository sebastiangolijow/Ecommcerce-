import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  clearSearch,
  getAllProducts,
  getCategories,
} from "../../Redux/Products/productActions";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import styles from "./catalogue.module.scss";
import { useTranslation } from "react-i18next";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import ViewListOutlinedIcon from "@material-ui/icons/ViewListOutlined";
import Cards from "./Cards/Cards";
import { Button } from "@material-ui/core";

export function Catalogue({ dark }) {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  
  const wantedProducts = useSelector(
    (state) => state.productReducer.wantedProducts
  );
  const allProducts = useSelector((state) => state.productReducer.allProducts);
  const Categories = useSelector((state) => state.productReducer.categories);
  const [Pages, setPages] = useState(0);
  const [Category, setCategory] = useState("");
  const [Prices, setPrices] = useState(["", ""]);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const Input = useSelector((state) => state.productReducer.Searching);
  const [view, setView] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)

  const location = useLocation();
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  let query = useQuery();

  useEffect(() => {
    setPages(0);
  }, [Category, Prices]);

  useEffect(() => {
    if (query.has("category")) {
      const selectQuery = query.get("category");
      stableDispatch(
        getAllProducts(Pages * 4, Pages * 4 + 4, selectQuery, Prices, Input)
      );
    } else {
      stableDispatch(
        getAllProducts(Pages * 4, Pages * 4 + 4, Category, Prices, Input)
      );
    }
    dispatch(getCategories());
    // eslint-disable-next-line
  }, [
    dispatch,
    stableDispatch,
    Pages,
    Category,
    Prices,
    Input,
    history.location.pathname,
    history.location.search,
  ]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleInputChangeP = (e) => {
    e.preventDefault();
    e.target.value === ""
      ? setPrices(["", ""])
      : e.target.value === "400"
      ? setPrices([e.target.value, ""])
      : setPrices([e.target.value, 200 + parseInt(e.target.value)]);
  };

  // const handleClearSearch = () => {
  //   dispatch(clearSearch());
  // };

  const prevPage = () => {
    setIsDisabled(true)
    Pages > 0 && setPages(Pages - 1);
    setTimeout(() => {
      setIsDisabled(false)
    }, 1000);
  };
  const nextPage = () => {
    setIsDisabled(true)
    allProducts.length > 3 && setPages(Pages + 1);
    setTimeout(() => {
      setIsDisabled(false)
    }, 1000);
  };

  return (
    <div
      className={
        dark && view
          ? styles.containerDark
          : dark && !view
          ? styles.containerListDark
          : !dark && view
          ? styles.container
          : styles.containerList
      }
    >
      <div className={styles.filter}>
        <div className={styles.title}>
          <span>{t("catalogue.textTwo")}</span>
        </div>

        <div className={styles.categories}>
          <span>{t("catalogue.texThree")}</span>
          <select onChange={handleInputChange}>
            <option value="">{t("catalogue.textFour")}</option>
            {Categories?.map((category, i) => (
              <option value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.price}>
          <span>{t("catalogue.textFive")}</span>
          <select onChange={handleInputChangeP}>
            <option value="">{t("catalogue.textSix")}</option>
            <option value="0">0 - 200</option>
            <option value="200">200 - 400</option>
            <option value="400">400 - + </option>
          </select>
        </div>
        <div className={styles.view}>
          <span>{t("catalogue.view")} </span>
          <button
            onClick={() => {
              setView(!view);
            }}
          >
            {!view ? <ViewModuleOutlinedIcon /> : <ViewListOutlinedIcon />}
          </button>
        </div>
        <div className={styles.pagination}>
          <Button onClick={prevPage} disabled={isDisabled}>
            <ArrowBackIosOutlinedIcon style={{ fontSize: "1rem" }} />
          </Button>
          <input type="text" value={Pages + 1} disabled />
          <Button onClick={nextPage} disabled={isDisabled}>
            <ArrowForwardIosOutlinedIcon style={{ fontSize: "1rem" }} />
          </Button>
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.searched}>
          {allProducts?.map((item) => (
            <Cards
              key={item.id}
              id={item.id}
              stock={item.stock}
              title={item.name}
              price={item.price}
              image={item.images}
              discount={item.discount}
              reviews={item.reviews}
              view={view}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
