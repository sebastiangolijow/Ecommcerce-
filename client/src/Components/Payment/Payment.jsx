import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { orderPayment } from "../../Redux/Orders/orderActions";
import TextField from "@material-ui/core/TextField";
import { searchPoints } from "../../Redux/Users/usersActions";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import CheckOut from "../CheckOut/CheckOut";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      justifyContent: "center",
    },
  },
}));

export function Payment() {
  const classes = useStyles();
  const user = useSelector((state) => state.usersReducer.userLoged);
  let cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(0);
  // eslint-disable-next-line
  const [Carts, setCarts] = useState();
  const [input, setInput] = useState({
    streetName: "",
    streetNumber: "",
    postalCode: "",
  });
  const [form, setform] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    streetName: "",
    streetNumber: 0,
    postalCode: "",
  });

  const handleAddress = (e) => {
    e.preventDefault();
    let addresUser = user.address.find(
      (item) => item.address === e.target.value
    );
    setInput({
      streetName: addresUser.address,
      streetNumber: addresUser.streetNumber,
      postalCode: addresUser.postal_code,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (user.id) {
    var infoUser = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      phone: parseInt(user.phone),
      email: user.email,
      addres: input,
    };
  } else {
    // eslint-disable-next-line
    var infoUser = {
      name: form.name,
      surname: form.surname,
      phone: parseInt(form.phone),
      email: form.email,
      addres: {
        streetName: form.streetName,
        streetNumber: parseInt(form.streetNumber),
        postalCode: form.postalCode,
      },
    };
  }

  let applyDiscount = async (e) => {
    e.persist();
    e.preventDefault();

    let response = await dispatch(searchPoints(user.id));
    console.log(response, e.target.value * 2 * Math.pow(10, 4));
    if (response > e.target.value * 2 * Math.pow(10, 4)) {
      setDiscount(e.target.value);
    } else {
      swal("Oops", "You don't have enough Tech Points", "error");
    }
  };

  let PayCart = async (e) => {
    e.preventDefault();
    let cartstock = cart.filter((product) => {
      return product.stock - product.quantity < 0;
    });
    if (cartstock.length) {
      swal("Oops", "Haven't stock", "error");
    } else {
      let response = await dispatch(orderPayment(cart, infoUser, discount));
      response && window.location.replace('https://henrystechstore.web.app/');
    }
  };

  return (
    <div>
      <CheckOut />
      {user.id && (
        <select onChange={handleAddress}>
          <option value="">Address</option>
          {user.address &&
            user.address.map((add, i) => (
              <option key={i} value={add.address}>
                {add.address}
              </option>
            ))}
        </select>
      )}

      {!user.id ? (
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            name="name"
            onChange={handleForm}
          />
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            name="surname"
            onChange={handleForm}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            name="phone"
            onChange={handleForm}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleForm}
          />
          <TextField
            id="streetName"
            label="Street Name"
            variant="outlined"
            name="streetName"
            onChange={handleForm}
          />
          <TextField
            id="streetNumber"
            label="Street Number"
            variant="outlined"
            name="streetNumber"
            onChange={handleForm}
          />
          <TextField
            id="postalCode"
            label="Postal Code"
            variant="outlined"
            name="postalCode"
            onChange={handleForm}
          />
        </form>
      ) : null}

      <button onClick={(e) => PayCart(e)}>Pay</button>
      {user.id && (
        <select onChange={(e) => applyDiscount(e)}>
          <option value="0">Apply your discount</option>
          <option value="0.1">Get 10% off for 1000 Tech Points</option>
          <option value="0.2">Get 10% off for 2000 Tech Points</option>
          <option value="0.4">Get 10% off for 8000 Tech Points</option>
        </select>
      )}
    </div>
  );
}
