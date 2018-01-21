import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import AdminDashboardCustomers from "./AdminDashboardCustomers";
import AdminDashboardPrices from "./AdminDashboardPrices";
import AdminDashboardReservations from "./AdminDashboardReservations";
import AdminDashboardLanding from "./AdminDashboardLanding";
import EditCustomerForm from "../shared/EditCustomerForm";
import CreateCustomerForm from "../shared/CreateCustomerForm";
import CreateReservationForm from "../shared/CreateReservationForm";
import EditReservationForm from "../shared/EditReservationForm";
import { styles } from "../../styles/styles";

class AdminDashboard extends Component {
  render() {
    return (
      <div className="row" style={styles.noMargin}>
        <div className="col s2" style={styles.sidebar.sidebarDiv}>
          <Sidebar />
        </div>

        <div className="col s10" style={styles.rightSide}>
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
            path="/admin/dashboard/reservations"
            component={AdminDashboardReservations}
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
            path="/admin/dashboard/reservation/edit/:id"
            render={props => <EditReservationForm isAdmin={true} {...props} />}
          />
          <Route
            exact
            path="/admin/dashboard/customer/add"
            component={CreateCustomerForm}
          />
          <Route
            exact
            path="/admin/dashboard/reservation/add"
            render={() => <CreateReservationForm isAdmin={true} />}
          />
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
