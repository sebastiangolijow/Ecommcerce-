import React, { useState } from "react";
import style from "./modifyreview.module.scss";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../Redux/Reviews/reviewsActions";

export function ModifyReview({ id }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const [data, setData] = useState({
    description: "",
    rating: "",
    id,
  });

  const [hover, setHover] = useState(null);

  const upReview = (upReview) => {
    upReview.preventDefault();
    dispatch(updateReview(data));
  };

  return (
    <div className={style.containerReview}>
      <h2>You changed your opinion?</h2>
      <h3>Don't worry, you can fix it!</h3>
      <h4>Set new rating</h4>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                id=""
                value={ratingValue}
                onClick={() =>
                  setData({
                    ...data,
                    rating: ratingValue,
                    isRated: true,
                  })
                }
              />
              <FaStar
                className={style.star}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                color={
                  ratingValue <= (hover || data.rating) ? "#9abf15" : "#e4e5e9"
                }
              />
            </label>
          );
        })}
      </div>
      <form className={style.formReview}>
        {data.isRated ? (
          <div>
            <span>Tell us more:</span>
            <textarea
              name="description"
              rows="10"
              cols="50"
              placeHolder="Write here..."
              onChange={(e) => {
                setData({
                  ...data,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>
        ) : null}
        <input type="submit" value="Modify review" onClick={upReview} />
      </form>
    </div>
  );
}
