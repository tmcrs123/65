import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/actions_index";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import Chip from "material-ui/Chip";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import { red800, green800, yellow800 } from "material-ui/styles/colors";
import _ from "lodash";
import { Route } from "react-router-dom";

import { REJECTED, APPROVED, PENDING } from "../../helpers/constants";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteReservationDialogOpen: false,
      showMessage: false
    };
  }

  componentDidMount() {
    this.props.getCustomerReservations();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  handleRequestClose() {
    this.props.clearMessage();
  }

  deleteReservation(reservationId) {
    this.props.deleteReservation(reservationId);
  }

  handleDeleteReservationDialogOpen = () => {
    this.setState({ deleteReservationDialogOpen: true });
  };

  handleDeleteReservationDialogClose = () => {
    this.setState({ deleteReservationDialogOpen: false });
  };

  renderActionButtons(reservation) {
    const actions = [
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.deleteReservation(reservation.id);
          this.handleDeleteReservationDialogClose();
        }}
      />,
      <FlatButton
        label="Back"
        primary={true}
        onClick={this.handleDeleteReservationDialogClose}
      />
    ];

    if (reservation.status !== REJECTED)
      return (
        <CardActions>
          <Link to={`/customer/dashboard/editReservation/${reservation.id}`}>
            <FlatButton label="Edit" />
          </Link>

          <FlatButton
            label="Delete Reservation"
            onClick={this.handleDeleteReservationDialogOpen}
          >
            <Dialog
              title="Delete reservation"
              actions={actions}
              modal={false}
              open={this.state.deleteReservationDialogOpen}
              onRequestClose={() => this.handleDeleteReservationDialogClose()}
            >
              Are you sure you want to delete this reservation?
            </Dialog>
          </FlatButton>
        </CardActions>
      );
  }

  renderStatusChip(reservation) {
    let backgroundColor;

    switch (reservation.status) {
      case APPROVED:
        backgroundColor = green800;
        break;
      case REJECTED:
        backgroundColor = red800;
        break;
      default:
        backgroundColor = yellow800;
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
        <div key={reservation.id}>
          <br />
          <Card>
            <CardTitle title={`# ${reservation.reservationNumber}`} />
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
                {`Adults/Children: ${reservation.numberAdults} / ${
                  reservation.numberChildrens
                }`}
              </p>
              <p>{`Price: ${reservation.price}`}</p>
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
        {this.props.reservations ? this.renderReservations() : ""}
        <Snackbar
          open={this.state.showMessage}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reservations: state.customerReservations,
    message: state.messages.message
  };
}

export default connect(mapStateToProps, actions)(CustomerDashboard);
