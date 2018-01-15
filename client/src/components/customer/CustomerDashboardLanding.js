import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/customer_actions.js";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import Chip from "material-ui/Chip";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import { red500, green500, yellow500 } from "material-ui/styles/colors";
import _ from "lodash";
import { Route } from "react-router-dom";
import CustomerCreateReservationForm from "./CustomerCreateReservationForm";
import CustomerEditReservationForm from "./CustomerEditReservationForm";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteReservationDialogOpen: false,
      showDeleteReservationMessage: false
    };
  }

  componentDidMount() {
    this.props.fetchCustomer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteReservationMessage !== "") {
      this.setState({ showDeleteReservationMessage: true });
    } else {
      this.setState({ showDeleteReservationMessage: false });
    }
  }

  handleRequestClose() {
    this.props.clearCustomerReservationFormMessage();
  }

  deleteReservation(reservationId) {
    this.props.deleteCustomerReservation(reservationId);
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
        label="Back"
        primary={true}
        onClick={this.handleDeleteReservationDialogClose}
      />,
      <FlatButton
        label="Delete Reservation"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.deleteReservation(reservation.id);
          this.handleDeleteReservationDialogClose();
        }}
      />
    ];

    if (reservation.status !== "rejected")
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
          open={this.state.showDeleteReservationMessage}
          message={this.props.deleteReservationMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />
        <Route
          exact
          path="/customer/dashboard/createReservation"
          component={CustomerCreateReservationForm}
        />
        <Route
          exact
          path="/customer/dashboard/editReservation/:id"
          component={CustomerEditReservationForm}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reservations: state.customerInfo.reservations,
    deleteReservationMessage: state.customerMessages.message
  };
}

export default connect(mapStateToProps, actions)(CustomerDashboard);
