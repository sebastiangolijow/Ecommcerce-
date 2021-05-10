import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { addItemCart, deleteItemCart } from "../../Redux/Cart/cartActions";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import { List, ThemeProvider } from "@material-ui/core";
import swal from "sweetalert";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "1rem",
    margin: "1rem",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: "1rem",
      margin: "1rem",
    },
  },
  button: {
    backgroundColor: "blue",
    height: "1rem",
    width: "2rem",
  },
  title: {
    display: "flex",
    alignItems: "center",
    paddingRight: "4rem",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "4rem",
    marginRight: "4rem",
    width: "50px",
  },
  price: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem 2rem",
  },
  unity: {
    padding: "1rem",
  },
}));

export function ItemCart({ product }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const handleQuantityChange = async (amount) => {
    const newValue = product.quantity + amount;
    if (newValue <= product.stock && newValue >= 1) {
      let productToDispatch = {
        id: product.id,
        image: product.image,
        quantity: amount,
        stock: product.stock,
      };
      dispatch(addItemCart(productToDispatch));
      setDisable(true);
      setTimeout(() => {
        setDisable(false);
      }, 1000);
    }
  };

  const handleDeleteItem = () => {
    swal("Delete item?", {
      dangerMode: true,
      buttons: true,
    }).then((resp) => {
      if (resp) {
        dispatch(deleteItemCart(product));
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <List className={classes.item}>
        <div className={classes.title}>
          <ListItemAvatar>
            <Avatar
              variant="square"
              alt="product-avatar"
              src={product.image && product.image}
            />
          </ListItemAvatar>
          <Link to={`product/${product.id}`}>
            <ListItemText primary={product.title.slice(0, 50) + "..."} />
          </Link>
        </div>

        <div className={classes.quantity}>
          <Button
            color="secondary"
            aria-label="remove"
            disabled={disable}
            onClick={() => handleQuantityChange(-1)}
          >
            <RemoveIcon />
          </Button>

          <ListItemText className={classes.unity}>
            {product.quantity}
          </ListItemText>

          <Button
            color="primary"
            aria-label="add"
            disabled={disable}
            onClick={() => handleQuantityChange(+1)}
          >
            <AddIcon />
          </Button>

          <Button
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteItem(product.id)}
          >
            <DeleteIcon />
          </Button>
        </div>

        <div className={classes.price}>
          <ListItemText
            primary={`US$ ${(product.price * product.quantity).toFixed(2)}`}
            secondary={`US$ ${product.price}`}
          />
        </div>
      </List>
    </ThemeProvider>
  );
}
