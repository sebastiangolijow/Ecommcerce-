import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  totalProducts,
  deleteProduct,
  getCategories,
  deleteCategory,
} from "../../Redux/Products/productActions.js";
import { allUsers, deleteUser } from "../../Redux/Users/usersActions";
import {
  getAllOrders,
  getOrderDetail,
  getProductsOfOrder,
  getAllUserOrders,
  orderEmail,
} from "../../Redux/Orders/orderActions";
import {
  getUserReviews,
  deleteReview,
} from "../../Redux/Reviews/reviewsActions";
import style from "./controlpanel.module.scss";
import { Edit, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { OrderDetail } from "./OrderDetail/OrderDetail";
import Modal from "@material-ui/core/Modal";
import { ProductSelection } from "./Modals/ProductSelection";

export function ControlPanel() {
  const dispatch = useDispatch();
  const userLoged = useSelector((state) => state.usersReducer.userLoged);
  const products = useSelector((state) => state.productReducer.allproducts);
  const categories = useSelector((state) => state.productReducer.categories);
  const users = useSelector((state) => state.usersReducer.users);
  const orders = useSelector((state) => state.orderReducer.orders);
  const orderDetailId = useSelector((state) => state.orderReducer.orderDetail);
  const userOrders = useSelector((state) => state.orderReducer.userOrders);
  const userReviews = useSelector((state) => state.reviewsReducer.reviews);
  const productsOfOrder = useSelector(
    (state) => state.orderReducer.orderProducts
  );
  const container = products && products.lenght;
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const handleEmail = (email, user_id, id, orderDate) => {
    dispatch(orderEmail(email, user_id, id, orderDate));
  };

  const [tab, setTab] = useState(() => {
    return userLoged.permission === "customer" || !userLoged.permission
      ? "purchasehistory"
      : "products";
  });
  const [filter, setFilter] = useState();

  const handleFilter = (e) => {
    let selected = e.target.selectedOptions[0].value;
    setFilter(selected);
  };

  useEffect(() => {
    if (filter !== "all") {
      dispatch(getAllOrders(filter));
    } else {
      dispatch(getAllOrders());
    }
    // eslint-disable-next-line
  }, [filter]);

  const changeModal = async (id) => {
    await dispatch(getOrderDetail(id));
    setModal(true);
  };

  const openModalSelector = () => {
    setModalTwo(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalTwo(false);
  };

  const [search, setSearch] = useState();
  const handleSearch = (e) => {
    setSearch(e);
  };

  const handleDelete = async (id) => {
    if (tab === "products") {
      await dispatch(deleteProduct(id));
      await dispatch(totalProducts());
    } else if (tab === "users") {
      await dispatch(deleteUser(id));
      await dispatch(allUsers());
    } else if (tab === "categories") {
      await dispatch(deleteCategory(id));
      await dispatch(getCategories());
    }
  };

  const handleTab = (e) => {
    setTab(e.target.name);
  };

  const getProducts = async (e) => {
    await dispatch(getProductsOfOrder(e.target.value));
    openModalSelector();
  };
  useEffect(() => {
    dispatch(totalProducts(search));
    dispatch(getCategories(search));
    dispatch(allUsers(search));
    dispatch(getAllOrders());
    dispatch(getAllUserOrders(userLoged.id));
    dispatch(getUserReviews(userLoged.id));
    // eslint-disable-next-line
  }, [search, container, tab, userLoged]);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const indexLastResult = currentPage * resultsPerPage;
  // eslint-disable-next-line
  const indexFirstResult = indexLastResult - resultsPerPage;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={style.container}>
      <h2>Control Panel</h2>
      <div className={style.barButtons}>
        {userLoged.permission !== "customer" && userLoged.permission && (
          <button name="products" onClick={(e) => handleTab(e)}>
            Products
          </button>
        )}
        {userLoged.permission !== "customer" && userLoged.permission && (
          <button name="orders" onClick={(e) => handleTab(e)}>
            Orders
          </button>
        )}
        {userLoged.permission === "customer" ? (
          <button name="purchasehistory" onClick={(e) => handleTab(e)}>
            Purchase History
          </button>
        ) : null}
        {
          <button name="reviews" onClick={(e) => handleTab(e)}>
            Reviews
          </button>
        }
        {userLoged.permission !== "customer" && userLoged.permission && (
          <button name="categories" onClick={(e) => handleTab(e)}>
            Categories
          </button>
        )}
        {userLoged.permission !== "customer" && userLoged.permission && (
          <button name="users" onClick={(e) => handleTab(e)}>
            Users
          </button>
        )}
        {userLoged.permission !== "customer" && userLoged.permission && (
          <Link to="/addproduct">
            <button>Add Product</button>
          </Link>
        )}
      </div>
      <div className={style.barFilters}>
        <input
          className={style.search}
          placeholder="Search..."
          name="input"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
        {tab === "orders" ? <span>Select filter:</span> : null}
        {tab === "orders" && (
          <select
            className={style.buttonfilter}
            onClick={(e) => handleFilter(e)}
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="inCart">In Cart</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        )}
      </div>
      <div className={style.containerList}>
        <div className={style.bar}>
          {tab === "products" ? <h4>Product</h4> : null}
          {tab === "orders" ? <h4>Order ID</h4> : null}
          {tab === "orders" ? <h4>Status</h4> : null}
          {tab === "orders" ? <h4>Date</h4> : null}
          {tab === "categories" ? <h4>Category</h4> : null}
          {tab === "users" ? <h4>User</h4> : null}
          {tab === "users" ? <h4>Role</h4> : null}
          {tab === "products" || tab === "users" ? <h4>Modify</h4> : null}
          {tab === "purchasehistory" ? <h4>Purchase</h4> : null}
          {tab === "reviews" ? <h4>Product</h4> : null}
          {tab === "reviews" ? <h4>Rating</h4> : null}
          {tab === "reviews" ? <h4>Review</h4> : null}
          {tab === "reviews" ||
          tab === "purchasehistory" ||
          tab === "orders" ? null : (
            <h4>Delete</h4>
          )}
          {tab === "orders" ? <h4>Confirmation email</h4> : null}
          {tab === "purchasehistory" ? <h4>Status</h4> : null}
          {tab === "purchasehistory" ? <h4>Date</h4> : null}
          {tab === "purchasehistory" ? <h4>Pickup date</h4> : null}
          {tab === "purchasehistory" ? <h4>Add reviews</h4> : null}
          {tab === "orders" || tab === "reviews" ? <h4>Delete</h4> : null}
        </div>

        <div className={style.containerList}>
          {tab === "products"
            ? products?.map((product) => {
                return (
                  <div key={product.id} className={style.list}>
                    <span>
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </span>
                    <Link to={`/modifyproduct/${product.id}`}>
                      <Edit class={style.icon} />
                    </Link>
                    <Delete
                      className={style.icon}
                      id={product.id}
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                );
              })
            : null}
          {tab === "orders"
            ? orders?.map((order) => {
                return (
                  <div className={style.list}>
                    <span onClick={() => changeModal(order.id)}>
                      {order.id}
                    </span>
                    <span>{order.orderStatus}</span>
                    <span>{order.orderDate}</span>
                    {order.orderStatus === "approved" ? (
                      <button
                      className={style.iconSelect}
                        onClick={() =>
                          handleEmail(
                            order.email,
                            order.user_id,
                            order.id,
                            order.orderDate
                          )
                        }
                      >
                        Send email
                      </button>
                    ) : (
                      <button className={style.iconSelectDisable}>Send email</button>
                    )}
                    <dvi>
                      <button
                        className={style.iconDelete}
                        value={order.id}
                        onClick={(e) => getProducts(e)}
                      >
                        +
                      </button>
                      <Modal
                        class={style.modal}
                        open={modalTwo}
                        onClose={closeModal}
                      >
                        <ProductSelection
                          products={productsOfOrder}
                        ></ProductSelection>
                      </Modal>
                    </dvi>
                  </div>
                );
              })
            : null}
          {tab === "categories"
            ? categories?.map((category) => {
                return (
                  <div className={style.list}>
                    <span>{category.name}</span>
                    <Delete
                      class={style.icon}
                      id={category.id}
                      onClick={() => handleDelete(category.id)}
                    />
                  </div>
                );
              })
            : null}
          {tab === "purchasehistory"
            ? userOrders?.map((order) => {
             
                return (
                  <div className={style.list}>
                    <span onClick={() => changeModal(order.id)}>
                      {order.id}
                    </span>
                    <span>{order.orderStatus}</span>
                    <span>{order.orderDate}</span>
                    <Link to="/dayselect">
                      <button className={style.iconSelect}>Select</button>
                    </Link>
                    <div>
                      <button
                        className={style.iconDelete}
                        value={order.id}
                        onClick={(e) => getProducts(e)}
                      >
                        +
                      </button>
                      <Modal
                        class={style.modal}
                        open={modalTwo}
                        onClose={closeModal}
                      >
                        <ProductSelection
                          products={productsOfOrder}
                        ></ProductSelection>
                      </Modal>
                    </div>
                  </div>
                );
              })
            : null}
          {tab === "reviews"
            ? userReviews?.map((reviews) => {
                return (
                  <div className={style.list}>
                    <span>
                      <Link to={`/product/${reviews.product_id}`}>
                        {reviews.product.name}
                      </Link>
                    </span>
                    <span>{reviews.rating}</span>
                    <span>{reviews.description}</span>
                    <div>
                      {tab === "users" &&
                      userLoged.permission === "customer" ? (
                        <Link to={`/modifyReview/${reviews.id}`}>
                          <button className={style.iconSelect}>Modify</button>
                        </Link>
                      ) : null}
                      <button
                        className={style.iconDelete}
                        //    onClick={functionDeleteReview(reviews.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
          {tab === "users" &&
          (userLoged.permission === "superadmin" ||
            userLoged.permission === "admin")
            ? users?.map((user) => {
                return (
                  <div key={user.id} className={style.list}>
                    <span>{user.name}</span>
                    <span>{user.permission}</span>
                    {user.permission === "superadmin" &&
                    userLoged.permission === "admin" ? null : (
                      <>
                        <Link to={`/modifyUser/${user.id}`}>
                          <Edit
                            class={style.icon}
                            alt="Force change data user"
                          />
                        </Link>
                      </>
                    )}
                    <Delete
                      class={style.icon}
                      id={user.id}
                      onClick={() => handleDelete(user.id)}
                    />
                    <Modal
                      class={style.modal}
                      open={modalTwo}
                      onClose={closeModal}
                    ></Modal>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <Modal class={style.modal} open={modal} onClose={closeModal}>
        <OrderDetail
          id={orderDetailId.id}
          status={filter}
          permission={userLoged.permission}
        />
      </Modal>
      <div className={style.paginate}>
        <button className={style.buttonpage} onClick={() => previousPage()}>
          Prev
        </button>
        <button className={style.currentpage}>{currentPage}</button>
        <button className={style.buttonpage} onClick={() => nextPage()}>
          Next
        </button>
      </div>
    </div>
  );
}
