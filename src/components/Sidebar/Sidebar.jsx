/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import sidebarStyle from "../../assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) { //return true if we are in the exact link
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  const type_user = localStorage.getItem('type');
  var links = (
    <List className={classes.list}> 
      {routes.map((prop, key) => {
        if (!prop.sidebar) { return null } // only return the elements that have sidebar = true
        else if (type_user==="Guard" &&  prop.permission) { return null } // only return the elements that have sidebar = true
        var activePro = " ";
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink     //this container have all buttons of the sidebar, they are LisItem
            to={prop.layout + prop.path}  //the link to the component
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {/* icon of the buttton  */}
              {typeof prop.icon === "string" ? (
                <Icon  
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              {/* text of the buttton  */}
              <ListItemText 
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    // this is the title and the upper picture in the sidebar
    <div className={classes.logo}>
      <a
        href="/"
        className={classNames(classes.logoLink)}
        target="_self"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        {/* this section is te responsive screen */}
        {/* Drawer helps to put the sidebar to the left or to the right */}
        <Drawer
          variant="temporary"
          anchor= "right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              // style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        {/* this section is for the complete screen (no responsive)*/}
        {/* Drawer helps to put the sidebar to the left or to the right */}
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              // style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

export default withStyles(sidebarStyle)(Sidebar);
