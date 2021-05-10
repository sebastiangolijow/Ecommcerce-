import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetail,
  updateOrder,
  getProductsOfOrder,
  getAllOrders
} from "../../../Redux/Orders/orderActions";
import style from "./orderdetail.module.scss";
import { Link } from "react-router-dom";



export const OrderDetail = ({ id, status, permission }) => {
  const order = useSelector((state) => state.orderReducer.orderDetail);
  const productsOfOrder = useSelector((state) => state.orderReducer.orderProducts);
  const dispatch = useDispatch();

  const handleFilter = async (e) => {
    let selected = e.target.selectedOptions[0].value;
    if(selected !== 'all') {
     const resp = await dispatch(updateOrder(selected, id));
     if (!resp) {
      dispatch(getOrderDetail(id));
      dispatch(getAllOrders(status));
     }
    } 
  }

  useEffect(() => {
    dispatch(getOrderDetail(id));
    dispatch(getProductsOfOrder(id));
  }, [dispatch, id]);


  return (
    <div className={style.div}>
      <div>
        <h2>Order Detail N° {id}</h2>
        <br></br>
        <tr>
          <td>Made by user: </td>
          <td className={style.margen}>{order.user_id}</td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>{order.orderDate}</td>
        </tr>
        <tr>
          <td>Payment Method:</td>
          <td>Credit card</td>
        </tr>
        <tr>
          <td>Status:</td>
          {order.orderStatus}
          <br></br>
          {permission !== 'customer' && permission ? <select className={style.buttonfilter} onClick={(e) => handleFilter(e)}>
            <option value='all'>Status</option>
            <option value='approved'>Approved</option>
            <option value='inCart'>In Cart</option>
            <option value='pending'>Pending</option>
            <option value='rejected'>Rejected</option>
          </select> : null}
        </tr>
        <div class="table">
          {order.details &&
            order.details.map(function (detail) {
              return (
                <tr>
                  <td>{detail.name}</td>
                  <td>{detail.price}</td>
                  <td>{detail.quantity}</td>
                </tr>
              );
            })}
            <br></br>
            <span>Productos</span>
            {productsOfOrder?.map(function (product) {
              return (
                <tr>
                  <Link to={`/product/${product.product_id}`}>{product.title}</Link>
                  <td></td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;