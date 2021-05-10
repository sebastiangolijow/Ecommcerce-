import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import LanguageIcon from "@material-ui/icons/Language";
import { useTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";

export default function BtnLang() {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuItem onClick={handleClick}>
        <IconButton color="primary">
          <LanguageIcon />
        </IconButton>
        <p> {t("l.language")}</p>
      </MenuItem>

      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => i18n.changeLanguage("en")}>
          <ListItemText primary="EN" />
        </MenuItem>
        <MenuItem onClick={() => i18n.changeLanguage("es")}>
          <ListItemText primary="ES" />
        </MenuItem>
      </Menu>
    </div>
  );
}
