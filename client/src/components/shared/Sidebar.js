import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import * as adminActions from "../../actions/admin_actions.js";
import * as customerActions from "../../actions/customer_actions.js";
import _ from "lodash";
import { grey900, darkBlack } from "material-ui/styles/colors";

const composedActions = { ...adminActions, ...customerActions };

const styles = {
  col: "col s2",
  css: {
    border: "2px solid black",
    height: "100vh"
  },
  menuItem: {
    padding: "0px 0px 0px 0px !important"
  }
};

class Sidebar extends Component {
  renderDrawerMenuItems() {
    if (this.props.isAdmin === undefined) {
      return <div />;
    } else {
      if (this.props.isAdmin) {
        return (
          <div className={styles.col} style={styles.css}>
            <Link to="/admin/dashboard/customers">
              <MenuItem style={styles.menuItem}>Customers</MenuItem>
            </Link>
            <Link to="/admin/dashboard/reservations">
              <MenuItem style={styles.menuItem}>Reservations</MenuItem>
            </Link>
            <Link to="/admin/dashboard/prices">
              <MenuItem style={styles.menuItem}>Prices</MenuItem>
            </Link>
          </div>
        );
      } else {
        return (
          <div className={styles.col} style={styles.css}>
            <Link to="/customer/dashboard/landing">
              <MenuItem onClick={this.handleClose}>My Reservations</MenuItem>
            </Link>
            <Link to="/customer/dashboard/createReservation">
              <MenuItem onClick={this.handleClose}>
                Create Reservations
              </MenuItem>
            </Link>
            <Link to="/customer/dashboard/createReservation">
              <MenuItem onClick={this.handleClose}>Contact Us</MenuItem>
            </Link>
          </div>
        );
      }
    }
  }

  render() {
    return this.renderDrawerMenuItems();
  }
}

function mapStateToProps({ auth }) {
  return { isAdmin: auth.isAdmin };
}

export default connect(mapStateToProps, composedActions)(Sidebar);
