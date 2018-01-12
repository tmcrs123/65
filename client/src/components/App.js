import React, { Component } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as adminActions from "../actions/admin_actions.js";
import * as customerActions from "../actions/customer_actions.js";

import CustomerLogin from "./customer/CustomerLogin.js";
import CustomerDashboard from "./customer/CustomerDashboard.js";
import CustomerCreateReservationForm from "./customer/CustomerCreateReservationForm.js";
import CustomerEditReservationForm from "./customer/CustomerEditReservationForm.js";

import AdminLogin from "./admin/AdminLogin.js";
import AdminDashboard from "./admin/AdminDashboard.js";
import RequireAdminAuth from "./hoc/requireAdminAuth.js";
import Landing from "./landing.js";
import Header from "./Header.js";
import Sidebar from "./shared/Sidebar";

const composedActions = { ...adminActions, ...customerActions };

class App extends Component {
  render() {
    return (
      <div className="col s12">
        <Header />
      </div>
    );
  }
}

export default connect(null, composedActions)(App);
