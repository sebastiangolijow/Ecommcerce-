import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import style from "./profile.module.scss";
import { useTranslation } from "react-i18next";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import Avatar from "@material-ui/core/Avatar";
import { userLogOut } from "../../../Redux/Users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Profile() {
  const userLoged = useSelector((state) => state.usersReducer.userLoged);
  const wishlist = useSelector(state => state.wishlistReducer.wishlist)
  const history = useHistory();
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    const error = dispatch(userLogOut());
    if (error) {
      swal(error);
    } else {
      history.go(0);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const verifyWishlist = e => {
    e.preventDefault()
    wishlist.length === 0
    ? swal('Your wishlist is empty!', 'Add items to your wishlist and come back', 'error')
    : history.push('/wishlist')
  }

  return (
    <div>
      <Avatar
        alt={userLoged?.userName}
        src={userLoged?.img}
        className={style.large}
        onClick={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!userLoged?.id && (
          <StyledMenuItem>
            <Link to="/access">{t("navLink4.linkFour")}</Link>
          </StyledMenuItem>
        )}
        {userLoged?.id && (
          <div>
            <StyledMenuItem>
              <Link to={`/myProfile`}>MyProfile</Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <span onClick={handleLogOut}>Log Out</span>
            </StyledMenuItem>
            <StyledMenuItem>
              {
                <Link onClick={e => verifyWishlist(e)} >Wishlist</Link>
              }
            </StyledMenuItem>
          </div>
        )}
      </StyledMenu>
    </div>
  );
}
