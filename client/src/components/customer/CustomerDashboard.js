import React from "react";
import CustomerDashboardLanding from "./CustomerDashboardLanding";
import Sidebar from "../shared/Sidebar";
import { Route } from "react-router-dom";
import CreateReservationForm from "../shared/CreateReservationForm";
import EditReservationForm from "../shared/EditReservationForm";
import { styles } from "../../styles/styles";

export default () => {
  return (
    <div className="row" style={styles.noMargin}>
      <div className="col s2" style={styles.sidebar.sidebarDiv}>
        <Sidebar />
      </div>
      <div className="col s10" style={styles.rightSide}>
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
          render={props => <EditReservationForm isAdmin={false} {...props} />}
        />
      </div>
    </div>
  );
};
