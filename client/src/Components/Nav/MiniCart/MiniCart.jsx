import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MiniCard from "../MiniCart/MiniCard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Divider,
  IconButton,
  ListItem,
  makeStyles,
  MenuItem,
  ThemeProvider,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { clearCart } from "../../../Redux/Cart/cartActions";

const useStyles = makeStyles((theme) => ({
  miniCart: {
    display: "flex",
    padding: "1rem",
    margin: "1rem",
  },
  checkout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: ".5rem",
  },
  totalAmount: {
    justifyContent: "space-between",
    padding: "1rem",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  buttons: {
    margin: ".5rem",
    width: "10vw",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  clearButton: {
    width: "10vw",
    fontSize: ".rem",
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line
  let cont = 0;
  const theme = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const history = useHistory();
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
    if (!cart.length) {
      setAnchorEl(null);
    }
  }, [cart]);

  useEffect(() => {
    setTotal((subtotal - subtotal * (coupon / 100)).toFixed(2));
  }, [subtotal, coupon]);

  const handleClearCart = () => {
    swal("Are you sure you want to CLEAR your cart?", {
      dangerMode: true,
      buttons: true,
    }).then((resp) => {
      if (resp) {
        dispatch(clearCart());
        history.push("/");
      }
    });
  };

  const handleCheckOut = () => {
    if (localStorage.getItem("supabase.auth.token")) {
      history.push("/order/");
    } else {
      swal("Do you want to login to go to checkout?", {
        buttons: {
          button: "Go to Checkout",
          roll: {
            text: "Sign In!",
            value: "signIn",
          },
        },
      }).then((resp) => {
        if (resp === "signIn") {
          history.push("/access");
        } else {
          history.push("/order/");
        }
      });
    }
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    if (cart.length === 0) return;
    let intViewportWidth = window.innerWidth;
    if (intViewportWidth > 720) {
      setAnchorEl(event.currentTarget);
    } else {
      history.push("/order");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <MenuItem onClick={handleClick}>
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.miniCart}
      >
        {cart &&
          cart.map((item) => {
            cont += item.quantity * item.price;
            return (
              <>
                <MiniCard product={item} />
                <Divider />
              </>
            );
          })}
        <div className={classes.checkout}>
          <ListItem className={classes.totalAmount}>
            <Typography variant="h5">{`Total: `}</Typography>
            <Typography variant="h5">{`US$ ${total}`}</Typography>
          </ListItem>
          <Button
            className={classes.buttons}
            variant="contained"
            color="primary"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
          <Button
            className={classes.clearButton}
            variant="outlined"
            onClick={handleClearCart}
          >
            Clear cart
          </Button>
        </div>
      </Menu>
    </ThemeProvider>
  );
}
