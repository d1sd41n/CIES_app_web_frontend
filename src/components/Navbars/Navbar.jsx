import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import Button from "../CustomButtons/Button.jsx";

import headerStyle from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrandUser() {
    const name = localStorage.getItem('name');
    const last_name = localStorage.getItem('last_name');
    return name + " "+last_name;
  }
  function makeBrandCompnay() {
    const company_name = localStorage.getItem('company_name');
    const seat_name = localStorage.getItem('seat_name');
    return company_name + " - "+seat_name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* this part is the name of the brand (place where we are) in the header */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrandCompnay()}
          </Button>
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrandUser()}
          </Button>

        </div>
        <Hidden smDown implementation="css">
          {/* this is the buttons in the right of header (searchr, notifications user, etc) */}
          <AdminNavbarLinks />
        </Hidden>
        {/* IconButton is the responsive button that shows the sidebar in movil */}
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(headerStyle)(Header);
