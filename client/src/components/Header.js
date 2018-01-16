import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import * as actions from "../actions/actions_index.js";

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderHeaderButtons() {
    if (this.props.isAdmin === undefined) {
      return (
        <div>
          <Link to="/customer/login">
            <FlatButton label="Customer Login" />
          </Link>
          <Link to="/admin/login">
            <FlatButton label="Admin Login" />
          </Link>
        </div>
      );
    } else {
      if (this.props.isAdmin) {
        return (
          <div>
            <Link to="/admin/dashboard/landing">
              <FlatButton label="Admin Dashboard" />
            </Link>
            <FlatButton href="/api/logout" label="Logout" />
          </div>
        );
      } else {
        return (
          <div>
            <Link to="/customer/dashboard/landing">
              <FlatButton label="Customer Dashboard" />
            </Link>
            <FlatButton href="/api/logout" label="Logout" />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <AppBar
        title={<span style={{ cursor: "pointer" }}>65</span>}
        onTitleClick={this.rootRedirect}
        iconElementRight={this.renderHeaderButtons()}
        showMenuIconButton={false}
      />
    );
  }
}

function mapStateToProps({ auth }) {
  return { isAdmin: auth.isAdmin };
}

export default connect(mapStateToProps, actions)(Header);
