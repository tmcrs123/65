import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import { Card, CardTitle } from "material-ui/Card";
import _ from "lodash";
import moment from "moment";
import FastFwd from "material-ui/svg-icons/av/fast-forward";
import { styles } from "../../../styles/styles";

class ApprovalList extends Component {
  renderReservations(reservations) {
    if (reservations.length === 0) {
      return (
        <ListItem
          primaryText="Oh no!"
          secondaryText={"There are no upcoming reservations."}
        />
      );
    }

    return reservations.map(reservation => {
      return (
        <ListItem
          key={reservation._id}
          primaryText={reservation.customer.name}
          secondaryText={`${moment(reservation.startDate).format(
            "YYYY/MM/DD"
          )} to ${moment(reservation.endDate).format("YYYY/MM/DD")}`}
          leftIcon={<i className="material-icons">face</i>}
          nestedItems={[
            <ListItem
              key={1}
              insetChildren={true}
              primaryText="Status"
              secondaryText={`${_.capitalize(reservation.status)}`}
            />,
            <ListItem
              key={2}
              insetChildren={true}
              primaryText="Price"
              secondaryText={`${reservation.price}€`}
            />,
            <ListItem
              key={3}
              insetChildren={true}
              primaryText="Paid"
              secondaryText={`${reservation.price_paid}€`}
            />
          ]}
        />
      );
    });
  }

  render() {
    return (
      <Paper zDepth={5}>
        <List style={styles.AdminDashboard.nextReservationList}>
          <div className="container-fluid">
            <h5>
              <FastFwd style={styles.AdminDashboard.icon} />Next Reservations
            </h5>
          </div>

          <Divider inset={false} />
          {this.renderReservations(
            this.props.nextReservations ? this.props.nextReservations : []
          )}
        </List>
      </Paper>
    );
  }
}

export default ApprovalList;
