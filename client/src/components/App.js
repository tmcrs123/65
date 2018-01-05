import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as adminActions from "../actions/admin_actions.js";
import * as customerActions from "../actions/customer_actions.js";

import CustomerLogin from "./customer/CustomerLogin.js";
import CustomerDashboard from "./customer/CustomerDashboard.js";
import CustomerCreateReservationForm from "./customer/CustomerCreateReservationForm.js";

import AdminLogin from "./admin/AdminLogin.js";
import AdminDashboard from "./admin/AdminDashboard.js";
import RequireAdminAuth from "./hoc/requireAdminAuth.js";
import Landing from "./landing.js";
import Header from "./Header.js";

const composedActions = { ...adminActions, ...customerActions };

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/customerDashboard"
                component={CustomerDashboard}
              />
              <Route
                exact
                path="/customer/createReservation"
                component={CustomerCreateReservationForm}
              />
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

export default connect(null, null)(App);
