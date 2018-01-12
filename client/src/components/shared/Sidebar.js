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
    if (!_.isEmpty(this.props.adminAuth) && !this.props.adminAuth.authError) {
      return (
        <div className={styles.col} style={styles.css}>
          <MenuItem style={styles.menuItem}>Admin</MenuItem>
          <MenuItem style={styles.menuItem}>Admin</MenuItem>
          <MenuItem style={styles.menuItem}>Admin</MenuItem>
        </div>
      );
    } else if (!_.isEmpty(this.props.customerInfo)) {
      return (
        <div className={styles.col} style={styles.css}>
          <MenuItem onClick={this.handleClose}>
            <Link to="/customerDashboard">My Reservations</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/customer/createReservation">Create Reservations</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>Contact Us</MenuItem>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    console.log("state in sidebar render ", this);
    return this.renderDrawerMenuItems();
  }
}

function mapStateToProps(state) {
  return { adminAuth: state.adminAuth, customerInfo: state.customerInfo };
}

export default connect(mapStateToProps, composedActions)(Sidebar);
