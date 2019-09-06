import React from "react";
import { connect } from 'react-redux';
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";
// core components
import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

// core redux
import * as actions from '../../store/actions/actions';

class AdminNavbarLinks extends React.Component {
  state = {
    openNotifcation: false,
    openProfile: false
  };
  handleToggleProfile = () => {
    this.setState(state => ({ openProfile: !state.openProfile }));
  };
  handleCloseProfile = event => {
    if (this.anchorProfile.contains(event.target)) {
      return;
    }
    this.setState({ openProfile: false });
  };

  logout = () => {
    this.props.logout();
  };
  

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const { openNotifcation, openProfile } = this.state;
    return (
      <div>
        <div className={classes.manager}>
          {/* this part is the user button where are the user, mi perfil and cerrar sesion */}
          <Button
            buttonRef={node => {
              this.anchorProfile = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotifcation ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggleProfile}
            className={classes.buttonLink}
            size='lg'
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={openProfile}
            anchorEl={this.anchorProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Mi perfil
                      </MenuItem>
                      <Divider light />
                      <MenuItem
                        onClick={this.logout}
                        className={classes.dropdownItem}
                      >
                        Cerrar Sesion
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

AdminNavbarLinks.propTypes = {
  classes: PropTypes.object
};

// export default withStyles(headerLinksStyle)(AdminNavbarLinks);


const mapStateToProps = (state) => {
  return {
      loading: state.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(AdminNavbarLinks));