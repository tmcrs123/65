import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import { Card, CardTitle } from "material-ui/Card";
import _ from "lodash";

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
          secondaryText={`${reservation.startDate} to ${reservation.endDate}`}
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
        <List>
          <Card zDepth={0}>
            <CardTitle title="Next Reservations" />
          </Card>

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
