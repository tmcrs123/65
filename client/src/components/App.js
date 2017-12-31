import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actions_index.js";

import CustomerLogin from "./customer/CustomerLogin.js";
import AdminLogin from "./admin/AdminLogin.js";
import AdminDashboard from "./admin/AdminDashboard.js";
import RequireAdminAuth from "./hoc/requireAdminAuth.js";
import Navigation from "./customer/Navigation.js";
import Landing from "./landing.js";
import Header from "./Header.js";

class App extends Component {
  componentDidMount() {
    this.props.fetchCustomer();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/customerDashboard" component={Navigation} />
              <Route exact path="/customerlogin" component={CustomerLogin} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <Route
                exact
                path="/adminDashboard"
                component={RequireAdminAuth(AdminDashboard)}
              />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(App);
