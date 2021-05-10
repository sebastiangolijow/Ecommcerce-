import React from "react";
import style from "./productselection.module.scss";
import { Link } from "react-router-dom";

export function ProductSelection({ products }) {
  
  return (
    <div className={style.div}>
      <br/>
      <h3>Reviews</h3>
      <ol>
        {products?.map((product) => {
          return (
            <div className={style.list}>
              <tr>{product.title}</tr>
              {product.reviewed === false ? 
              <Link to={`/rate-product/${product.product_id}`}>
              <button>Leave review</button>
            </Link> :
             <Link to={`/product/${product.product_id}`}>
             <button>See review</button>
           </Link>
            }
            </div>
          );
        })}
      </ol>
    </div>
  );
}
