import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ItemCart } from "./ItemCart";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Total: {
    padding: theme.spacing(1, 0),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  quantity: {
    display: "flex",
    justifyContent: "flex-start",
    width: "20vw",
  },
  button: {
    margin: "0",
  },
}));

export default function OrderList() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cartReducer.cart);
  const [total, setTotal] = useState(0.0);
  const [subtotal, setSubtotal] = useState(0.0);
  // eslint-disable-next-line
  const [coupon, setCoupon] = useState(0);

  useEffect(() => {
    if (cart) {
      let amount = cart.reduce((acc, product) => {
        acc = acc + product.price * product.quantity;
        return acc;
      }, 0.0);
      setSubtotal(amount);
      localStorage.setItem("amountTotal", JSON.stringify(amount));
    }
  }, [cart]);

  useEffect(() => {
    setTotal((subtotal - subtotal * (coupon / 100)).toFixed(2));
  }, [subtotal, coupon]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <>
            <ItemCart product={product} />
            <Divider />
          </>
        ))}

        <ListItem className={classes.Total}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1">US${total}</Typography>
        </ListItem>
      </List>
    </>
  );
}
