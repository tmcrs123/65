import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/customer_actions.js";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Chip from "material-ui/Chip";
import FlatButton from "material-ui/FlatButton";
import { red500, green500, yellow500 } from "material-ui/styles/colors";
import _ from "lodash";

class CustomerDashboard extends Component {
  componentDidMount() {
    this.props.fetchCustomerReservations();
  }

  renderActionButtons(reservation) {
    if (reservation.status != "rejected")
      return (
        <CardActions>
          <FlatButton label="Edit" />
          <FlatButton label="Cancel" />
        </CardActions>
      );
  }

  renderStatusChip(reservation) {
    let backgroundColor;

    switch (reservation.status) {
      case "aproved":
        backgroundColor = green500;
        break;
      case "rejected":
        backgroundColor = red500;
        break;
      default:
        backgroundColor = yellow500;
    }

    return (
      <Chip backgroundColor={backgroundColor}>
        {_.capitalize(reservation.status)}
      </Chip>
    );
  }

  renderReservations() {
    return this.props.reservations.map(reservation => {
      return (
        <div key={reservation.reservationNumber}>
          <br />
          <Card>
            <CardTitle
              title={`Reservation Number ${reservation.reservationNumber}`}
            />
            <CardText>
              <p>
                {`Period: From ${new Date(
                  reservation.startDate
                ).toLocaleString()} to ${new Date(
                  reservation.endDate
                ).toLocaleString()}`}
              </p>
              {`Observations: ${reservation.observations}`}
              <p />
              <p>
                {`Adults/Children: ${reservation.numberAdults} / ${reservation.numberChildrens}`}
              </p>
              <p>{`Price: ${reservation.totalValue}`}</p>
              {this.renderStatusChip(reservation)}
            </CardText>
            {this.renderActionButtons(reservation)}
          </Card>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Customer Dashboard</h1>
        {/* {!_.isEmpty(this.props.customer) ? this.renderReservations() : ""} */}
        {this.renderReservations()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reservations: state.customerReservations };
}

export default connect(mapStateToProps, actions)(CustomerDashboard);
