import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/types.js";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  rootRedirect = () => this.props.history.push("/");

  renderHeaderButtons() {
    switch (this.props.auth.isAdmin) {
      case true:
        return (
          <div>
            <FlatButton label="Admin Dashboard" />
            <FlatButton href="/api/logout" label="Logout" />
          </div>
        );
      case false:
        return (
          <div>
            <FlatButton label="Customer Dashboard" />
            <FlatButton href="/api/logout" label="Logout" />
          </div>
        );
      default:
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

  //   handleToggle = () => this.setState({ open: !this.state.open });
  //   handleClose = () => this.setState({ open: false });

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
        onLeftIconButtonClick={this.handleToggle}
        iconElementRight={this.renderHeaderButtons()}
      />

      /* <Drawer
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          docked={false}
        >
          <MenuItem onClick={this.handleClose}>My Reservations</MenuItem>
          <MenuItem onClick={this.handleClose}>Create Reservations</MenuItem>
          <MenuItem onClick={this.handleClose}>Contact Us</MenuItem>
        </Drawer> */
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Header);
