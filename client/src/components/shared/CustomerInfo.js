import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions_index";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { styles } from "../../styles/styles";
import Info from "material-ui/svg-icons/action/info-outline";
import _ from "lodash";
import moment from "moment";

class CustomerInfo extends Component {
  componentDidMount() {
    this.props.getCustomer(this.props.match.params.id);
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    const customer = this.props.customer;
    if (_.isEmpty(this.props.customer)) return null;
    return (
      <div className="container">
        <Paper style={styles.paper}>
          <h4>
            <Info style={styles.createReservation.icon} />
            Customer Info
          </h4>
          <hr />

          <div className="col s6">
            <p>
              <strong>Name</strong>: {customer.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone: </strong>
              {customer.phone}
            </p>
          </div>
          <div className="col s6">
            <p>
              <strong>Blacklisted</strong>: {_.capitalize(customer.blacklisted)}
            </p>
            <p>
              <strong># Reservations:</strong> {customer.reservations.length}
            </p>
            <p>
              <strong>Notes:</strong> {customer.notes}
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
  return { customer: state.customer };
}

export default connect(mapStateToProps, actions)(CustomerInfo);
