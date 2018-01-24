import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions_index";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { styles } from "../../styles/styles";
import Info from "material-ui/svg-icons/action/info-outline";
import _ from "lodash";
import moment from "moment";

class ReservationInfo extends Component {
  componentDidMount() {
    this.props.getReservation(this.props.match.params.id);
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    const reservation = this.props.reservation;
    if (_.isEmpty(this.props.reservation)) return null;
    return (
      <div className="container">
        <Paper style={styles.paper}>
          <h4>
            <Info style={styles.createReservation.icon} />
            Reservation Info
          </h4>
          <hr />

          <div className="col s6">
            <p>
              <strong>Customer</strong>: {reservation.customer.name}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {moment(reservation.startDate).format("YYYY/MM/DD")}
            </p>
            <p>
              <strong>End Date: </strong>
              {moment(reservation.endDate).format("YYYY/MM/DD")}
            </p>
            <p>
              <strong>Adults / Childrens:</strong> {reservation.numberAdults} /{
                reservation.numberAdults
              }{" "}
            </p>
          </div>
          <div className="col s6">
            <p>
              <strong>Price</strong>: {reservation.price}€
            </p>
            <p>
              <strong>Paid:</strong> {reservation.price_paid}€
            </p>
            <p>
              <strong>Status:</strong> {_.capitalize(reservation.status)}
            </p>
            <p>
              <strong>Observations: </strong>
              {reservation.observations}
            </p>
          </div>
          <div className="right-align">
            <RaisedButton
              type="butoon"
              label="Back"
              primary={true}
              fullWidth={false}
              onClick={() => this.handleBackClick()}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reservation: state.reservation };
}

export default connect(mapStateToProps, actions)(ReservationInfo);
