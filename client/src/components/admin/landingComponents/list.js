import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import { Card, CardTitle } from "material-ui/Card";

class ApprovalList extends Component {
  renderReservations(reservations) {
    return reservations.map(reservation => {
      return (
        <ListItem
          key={reservation._id}
          primaryText={reservation.customer.name}
          secondaryText={`${reservation.startDate} to ${reservation.endDate}`}
          leftIcon={<i className="material-icons">face</i>}
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
