import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";
import _ from "lodash";
import * as adminActions from "../actions/admin_actions.js";
import * as customerActions from "../actions/customer_actions.js";
const composedActions = { ...adminActions, ...customerActions };

class Header extends Component {
  componentDidMount() {
    this.props.fetchCustomer();
    this.props.fetchAdmin();
  }

  renderHeaderButtons() {
    if (!_.isEmpty(this.props.adminAuth) && !this.props.adminAuth.authError) {
      return (
        <div>
          <Link to="/adminDashboard">
            <FlatButton label="Admin Dashboard" />
          </Link>
          <FlatButton href="/api/logout" label="Logout" />
        </div>
      );
    } else if (!_.isEmpty(this.props.customerInfo)) {
      return (
        <div>
          <Link to="/customerDashboard">
            <FlatButton label="Customer Dashboard" />
          </Link>
          <FlatButton href="/api/logout" label="Logout" />
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/customerlogin">
            <FlatButton label="Customer Login" />
          </Link>
          <Link to="/adminlogin">
            <FlatButton label="Admin Login" />
          </Link>
        </div>
      );
    }
  }

  render() {
    const styles = {
      title: {
        cursor: "pointer"
      }
    };

    return (
      <AppBar
        title={<span style={styles.title}>65</span>}
        onTitleClick={this.rootRedirect}
        iconElementRight={this.renderHeaderButtons()}
        showMenuIconButton={false}
      />
    );
  }
}

function mapStateToProps(state) {
  return { adminAuth: state.adminAuth, customerInfo: state.customerInfo };
}

export default connect(mapStateToProps, composedActions)(Header);
