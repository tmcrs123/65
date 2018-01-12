import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/admin_actions";
import Sidebar from "../shared/Sidebar";
import AdminDashboardCustomers from "./AdminDashboardCustomers";
import AdminDashboardPrices from "./AdminDashboardPrices";
import { Route } from "react-router-dom";

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getReservations();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const styles = {
      backgroundColor: "#BDBDBD"
    };

    return (
      <div className="row">
        <Sidebar />
        <div className="row">
          <div className="col s10" style={styles}>
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
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reservations: state.adminReservations };
}

export default connect(mapStateToProps, actions)(AdminDashboard);
