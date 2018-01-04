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
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    console.log("Calling action in header CDM");
    this.props.fetchCustomer();
    this.props.fetchAdmin();
  }

  rootRedirect = () => this.props.history.push("/");

  renderDrawerMenuItems() {
    if (!_.isEmpty(this.props.adminAuth) && !this.props.adminAuth.authError) {
      return (
        <div>
          <MenuItem onClick={this.handleClose}>Admin</MenuItem>
          <MenuItem onClick={this.handleClose}>Admin</MenuItem>
          <MenuItem onClick={this.handleClose}>Admin</MenuItem>
        </div>
      );
    } else {
      return (
        <div>
          <MenuItem onClick={this.handleClose}>
            <Link to="/customerDashboard">My Reservations</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/customer/createReservation">Create Reservations</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>Contact Us</MenuItem>
        </div>
      );
    }
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
    } else if (!_.isEmpty(this.props.customerAuth)) {
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

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    const styles = {
      title: {
        cursor: "pointer"
      }
    };

    console.log("start rendering HEADER");
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>65</span>}
          onTitleClick={this.rootRedirect}
          onLeftIconButtonClick={this.handleToggle}
          showMenuIconButton={
            !_.isEmpty(this.props.customerAuth) ||
            (!_.isEmpty(this.props.adminAuth) &&
              !this.props.adminAuth.authError)
              ? true
              : false
          }
          iconElementRight={this.renderHeaderButtons()}
        />
        <Drawer
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          docked={false}
        >
          {this.renderDrawerMenuItems()}
        </Drawer>
      </div>
    );
    console.log("finish rendering HEADER");
  }
}

function mapStateToProps(state) {
  console.log("mstp header", state);
  return { adminAuth: state.adminAuth, customerAuth: state.customerAuth };
}

export default connect(mapStateToProps, composedActions)(Header);
