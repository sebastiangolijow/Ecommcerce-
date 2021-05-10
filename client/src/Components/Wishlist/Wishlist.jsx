import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
import { getUserWishlist } from "../../Redux/Wishlist/wishlistActions";
import WishListCard from "./WishListCard/WishListCard";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    marginLeft: "0",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      minHeight: "100%",
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    width: 360,
    height: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      width: 720,
      height: "100%",
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [userLog] = useLocalStorage("supabase.auth.token");
  const userId = userLog && userLog.currentSession.user.id;
  const dispatch = useDispatch();
  const classes = useStyles()

  useEffect(() => {
    dispatch(getUserWishlist(userId));
    // eslint-disable-next-line
  }, []);

  const redirect = () => {
    window.location.href = "/";
   // setTimeout (redirect(), 3000);
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        {wishlist.length > 0 ? (
          <div className="productsWishlist">
            <h2>Wishlist</h2>
            {wishlist?.map((product) => (
              <WishListCard props={product.product} userId={userId} />
            ))}
          </div>
        ) : (
          redirect()
          )}
      </Paper>  
    </main>
  );
};

export default Wishlist;
