import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetail,
  getProductsByCategories,
} from "../../Redux/Products/productActions";
import { QRCode } from "react-qrcode";
import styles from "./Product.module.scss";
import swal from "sweetalert";
import { addItemCart } from "../../Redux/Cart/cartActions";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Thumbs from "./Thumbs/Thumbs";
import SwiperSlider from "../Home/Swiper/SwiperSlider";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// eslint-disable-next-line
let random = Math.round(Math.random() * 2);
export const Product = (props) => {
  const dispatch = useDispatch();
  const [productsVisited, setProductsVisited] = useLocalStorage(
    "productVisited",
    []
  );
  const details = useSelector((state) => state.productReducer.productDetail);
  const id = props.id;
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );
  const Link = `https://henrystechstore.web.app/product/${id}`;

  // eslint-disable-next-line
  const [deleting, setDeleting] = useState(null);

  const [value, setValue] = useState(1);
  const [nav, setNav] = useState("details");
  const handleSum = () => {
    value < details.stock && value < 10 && setValue(value + 1);
  };
  const handleRes = () => {
    value > 1 && setValue(value - 1);
  };

  // eslint-disable-next-line
  const [userLog] = useLocalStorage("supabase.auth.token");

  useEffect(() => {
    const findLastProduct = productsVisited.find((id) => id === props.id);
    if (!findLastProduct) {
      setProductsVisited((product) => [...product, props.id]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const idDetails = async () => {
      await dispatch(productDetail(id));
    };
    idDetails();
    const Products = async () => {
      await dispatch(getProductsByCategories());
    };
    Products();
    return () => {
      setNav("details");
      random = Math.round(Math.random() * 2);
    };
    // eslint-disable-next-line
  }, [id]);

  const handleAddToCart = (details) => {
    let cartItemModel = {
      title: details.name,
      image: details.images[0].url,
      id: details.id,
      quantity: value,
      price: (details.price * (1 - details.discount / 100)).toFixed(2),
      stock: details.stock,
    };
    dispatch(addItemCart(cartItemModel));
    setValue(1);
    swal("Done!", "Added to cart", "success");
  };

  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <ul className={styles.nav}>
        <li
          onClick={() => {
            setNav("full");
          }}
          className={styles.full}
        >
          Full name
        </li>
        <li
          onClick={() => {
            setNav("details");
          }}
        >
          Details
        </li>
        <li
          onClick={() => {
            setNav("category");
          }}
        >
          Categories
        </li>
        <li
          onClick={() => {
            setNav("qr");
          }}
        >
          Code QR
        </li>
      </ul>
      <div className={styles.main}>
        <div className={styles.details}>
          <div className={styles.info}>
            <div className={styles.name}>
              <span>{details.name}</span>
            </div>
            <div className={styles.desc}>
              <ul className={styles.values}>
                {nav === "details" &&
                  details.description &&
                  Object.entries(details.description).map(([key, value]) => {
                    return (
                      <li key={key}>
                        <p>
                          <b>{key.split(/(?=[A-Z])/).join(" ")}</b>:{" "}
                          {value.toString()}
                        </p>
                      </li>
                    );
                  })}
                {nav === "category" &&
                  details.categories &&
                  details.categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <b>{category.name}</b>
                      </li>
                    );
                  })}
                {nav === "full" && details.name && <li>{details.name}</li>}
                {nav === "qr" && (
                  <li className={styles.qr}>
                    <QRCode
                      value={Link}
                      color={{
                        dark: "#2C3A40",
                        light: "#9abf15",
                      }}
                      scale={5}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.carousel}>
            <Thumbs images={details.images} />
          </div>
          <div className={styles.buy}>
            <label>
              On sale from
              <b>
                $
                {(details.price * (1 - details.discount / 100) * value).toFixed(
                  2
                )}
              </b>
            </label>
            <div className={styles.change}>
              <button className={styles.add} onClick={handleRes}>
                <RemoveIcon style={{ fontSize: "1rem" }} />
              </button>
              <div className={styles.cont}>
                <input type="text" value={value} disabled />
              </div>
              <button className={styles.add} onClick={handleSum}>
                <AddIcon style={{ fontSize: "1rem" }} />
              </button>
            </div>
            {details.stock > 0 ? (
              <button
                className={styles.addCart}
                onClick={() => {
                  handleAddToCart(details);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className={styles.addCart}
                onClick={() => {
                  swal("Sorry!", "Come back in a few days", "error");
                }}
              >
                Sold out
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.review}>
        <div className={styles.reviewTitle}>
          <span> Reviews</span>
        </div>
        {details.reviews?.length > 0 ? (
          <div className={styles.reviews}>
            {details.reviews.map((review) => {
              return (
                <>
                  <span>Description: {review.description}</span>
                  <span>
                    Rating:
                    {[...Array(review.rating)].map(() => {
                      return <StarIcon style={{ fontSize: "1rem" }} />;
                    })}
                    {[...Array(5 - review.rating)].map(() => {
                      return <StarBorderIcon style={{ fontSize: "1rem" }} />;
                    })}
                  </span>
                  <hr />
                </>
              );
            })}
          </div>
        ) : (
          <div className={styles.notReviews}>
            <span>This product has no reviews yet</span>
            <hr />
          </div>
        )}
      </div>
      <div className={styles.related}>
        <div className={styles.more}>
          <span>MORE PRODUCTS</span>
        </div>
        <div className={styles.slider}>
          {productByCategories.length > 0 && (
            <SwiperSlider
              products={productByCategories[1].product_categories}
            />
          )}
        </div>
      </div>
    </div>
  );
};
