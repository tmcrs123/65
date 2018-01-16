import React, { Component } from "react";

import Sidebar from "../shared/Sidebar";
import AdminDashboardCustomers from "./AdminDashboardCustomers";
import AdminDashboardPrices from "./AdminDashboardPrices";
import AdminDashboardLanding from "./AdminDashboardLanding";
import EditCustomerForm from "../shared/EditCustomerForm";
import CreateCustomerForm from "../shared/CreateCustomerForm";
import CreateReservationForm from "../shared/CreateReservationForm";
import { Route } from "react-router-dom";

class AdminDashboard extends Component {
  render() {
    const styles = {
      backgroundColor: "#BDBDBD",
      height: "100vh"
    };

    return (
      <div className="row">
        <Sidebar />
        <div className="row">
          <div className="col s10" style={styles}>
            <Route
              exact
              path="/admin/dashboard/landing"
              component={AdminDashboardLanding}
            />
            <Route
              exact
              path="/admin/dashboard/customers"
              component={AdminDashboardCustomers}
            />
            <Route
              exact
              path="/admin/dashboard/prices"
              component={AdminDashboardPrices}
            />
            <Route
              exact
              path="/admin/dashboard/customer/edit/:id"
              component={EditCustomerForm}
            />
            <Route
              exact
              path="/admin/dashboard/customer/add"
              component={CreateCustomerForm}
            />

            <Route
              exact
              path="/admin/dashboard/teste"
              render={() => <CreateReservationForm isAdmin={false} />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
