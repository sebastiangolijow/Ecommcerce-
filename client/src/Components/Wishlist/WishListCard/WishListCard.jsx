import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../Redux/Wishlist/wishlistActions";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Avatar, Button, ListItemAvatar } from "@material-ui/core";
import { addItemCart } from "../../../Redux/Cart/cartActions";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    backgroundColor: "transparent",
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      backgroundColor: "transparent",
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 900,
      height: 200,
    },
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  type: {
    fontSize: 17.5,
    cursor: "pointer",
    transition: "500ms",
    "&:hover": {
      transition: "500ms",
      color: "#9abf15",
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    borderRadius: 3,
    color: "#fff",
  },
  buttonRemove: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    borderRadius: 3,
    color: "primary",
  }
}));

export default function WishListCard({ props, userId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const product = {
    id: props.id,
    price: props.price,
    quantity: 1,
    title: props.name,
    image: props.images[0]?.url,
    stock: props.stock,
  };

  const addItemToCart = (e) => {
    e.preventDefault();
    dispatch(addItemCart(product));
  };

  const toProductDetail = (e) => {
    e.preventDefault();
    history.push(`/product/${props.id}`);
  };

  const removeFromFav = (e) => {
    e.preventDefault();
    dispatch(addToWishlist({ id: props.id, fav: false, userId }));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase
              onClick={(e) => toProductDetail(e)}
              className={classes.image}
            >
              <ListItemAvatar>
                <Avatar
                  // className={classes.img}
                  alt="complex"
                  src={props.images[0]?.url}
                />
              </ListItemAvatar>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  onClick={(e) => toProductDetail(e)}
                  className={classes.type}
                  gutterBottom
                  variant="subtitle1"
                >
                  {props.name}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => addItemToCart(e)}
                >
                  Add To Cart
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.buttonRemove}
                  onClick={(e) => removeFromFav(e)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">US$ {props.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
