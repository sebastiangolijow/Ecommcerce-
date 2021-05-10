import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import BtnLang from "./BtnLang/BtnLang";
import { userLogOut } from "../../Redux/Users/usersActions";
import swal from "sweetalert";
import MiniCart from "./MiniCart/MiniCart";
import BtnDark from "./BtnDark/BtnDark";
import { clearSearch, Search } from "../../Redux/Products/productActions";
import logo from "../../Assets/static/simbolo-verde.png";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    display: "flex",
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  navBar: {
    position: "fixed",
    height: "5rem",
  },
  Logo: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
}));

export default function NavBar({ priority, dark }) {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.usersReducer.userLoged);
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [search, setSearch] = useState("");
  const [width, setWidth] = React.useState(window.innerWidth);
  // const breakPoint = 1450;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCatalogue = (event) => {
    history.push("/catalogue");
    dispatch(clearSearch());
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleToCart = (event) => {
    history.push("/order");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = () => {
    const error = dispatch(userLogOut());
    if (error) {
      swal(error);
    } else {
      history.go(0);
    }
  };

  const handleLogin = () => {
    history.push("/access");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuProfile = (e) => {
    if (e.target.id === "account") {
      history.push("/controlpanel");
    } else if (e.target.id === "profile") {
      history.push("/myProfile");
    } else if (e.target.id === "logOut") {
      handleLogOut();
    } else if (e.target.id === "wishlist") {
      !wishlist.length
        ? swal(
          "Your wishlist is empty!",
          "Add items to your wishlist and come back",
          "error"
        )
        : history.push("/wishlist");
    }
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  //Search
  const handleInputChange = function (e) {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      dispatch(Search(search));
      history.push("/catalogue");
      setSearch("");
    } else {
      alert("Enter to input to search!");
    }
  };

  //Menu Profile -------------------------------------------------//
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuProfile}
    >
      <MenuItem id="wishlist" onClick={(e) => handleMenuProfile(e)}>
        {t("bar.1")}
      </MenuItem>
      <MenuItem id="account" onClick={(e) => handleMenuProfile(e)}>
        {t("bar.2")}
      </MenuItem>
      <MenuItem id="profile" onClick={(e) => handleMenuProfile(e)}>
        {t("bar.3")}
      </MenuItem>
      <MenuItem id="logOut" onClick={(e) => handleMenuProfile(e)}>
        {t("bar.4")}
      </MenuItem>
    </Menu>
  );
  //--------------------------------------------------------------//

  //Menu Mobile -------------------------------------------------//
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleCatalogue}>
        <IconButton color="primary">
          <MenuIcon />
        </IconButton>
        {t("bar.5")}
      </MenuItem>

      <MenuItem onClick={handleToCart}>
        <IconButton>
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon color="primary" />
          </Badge>
        </IconButton>
        {t("bar.6")}
      </MenuItem>

      {/* <BtnLang /> */}

      <MenuItem>
        <IconButton color="primary">
          <BtnDark />
        </IconButton>
      </MenuItem>

      {user?.id ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          {t("bar.7")}
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          {t("bar.8")}
        </MenuItem>
      )}
    </Menu>
  );
  //--------------------------------------------------------------//

  return (
    <div className={classes.grow}>
      <AppBar className={classes.navBar} color="secondary">
        <Toolbar className={classes.toolBar}>
          <NavLink to={"/"} className={classes.Logo}>
            {width > 720 ? (
              <img
                src={
                  "https://res.cloudinary.com/techstore/image/upload/v1619885737/logo-nav_qycrol.png"
                }
                alt="Ups, we don't found anything here. Try again tomorrow!"
                height="50"
              />
            ) : (
              <img
                src={logo}
                alt="Ups, we don't found anything here. Try again tomorrow!"
                height="62"
              />
            )}
          </NavLink>
          <form
            className={classes.search}
            onSubmit={(e) => handleSubmitSearch(e)}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={search}
              onChange={handleInputChange}
              placeholder={t("bar.search")}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem onClick={handleCatalogue}>
              <IconButton color="primary">
                <MenuIcon />
              </IconButton>
              <p>{t("bar.5")}</p>
            </MenuItem>

            <MenuItem>
              <MiniCart />
            </MenuItem>

            {user?.id ? (
              <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <p>{t("bar.7")}</p>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleLogin}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <p>{t("bar.8")}</p>
              </MenuItem>
            )}

            {/* <MenuItem>
              <BtnLang />
            </MenuItem> */}

            <MenuItem>
              <IconButton color="primary">
                <BtnDark />
              </IconButton>
            </MenuItem>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
