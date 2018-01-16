import React from "react";
import CustomerDashboardLanding from "./CustomerDashboardLanding";
import CustomerCreateReservationForm from "./CustomerCreateReservationForm";
import CustomerEditReservationForm from "./CustomerEditReservationForm";
import CreateReservationForm from "../shared/CreateReservationForm";
import Sidebar from "../shared/Sidebar";
import { Route } from "react-router-dom";

export default () => {
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
            path="/customer/dashboard/landing"
            component={CustomerDashboardLanding}
          />
          <Route
            exact
            path="/customer/dashboard/createReservation"
            render={() => <CreateReservationForm isAdmin={false} />}
          />

          <Route
            exact
            path="/customer/dashboard/editReservation/:id"
            component={CustomerEditReservationForm}
          />
        </div>
      </div>
    </div>
  );
};
