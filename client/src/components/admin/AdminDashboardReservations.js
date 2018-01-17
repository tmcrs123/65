import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as actions from "../../actions/admin_actions";
import axios from "axios";
import ReservationsTable from "./reservationsTable";
import RaisedButton from "material-ui/RaisedButton";
import _ from "lodash";
import { Link } from "react-router-dom";

class AdminDashboardCustomer extends Component {
  componentDidMount() {
    this.props.getReservationList();
  }

  handleSearchChange(event, query) {
    this.props.searchCustomerByName(query);
  }

  render() {
    const styles = {
      padding: "20px",
      margin: "10px"
    };

    const searchNames = _.debounce(
      (event, query) => this.handleSearchChange(event, query),
      500
    );

    return (
      <div className="row">
        <div className="container-fluid">
          <div className="col s12">
            <Paper style={styles}>
              <div>
                <p className="left">Reservation List</p>
                <Link to="/admin/dashboard/reservation/add">
                  <RaisedButton
                    className="right"
                    label="+ Add Customer"
                    primary={true}
                  />
                </Link>
                <br />
                <TextField floatingLabelText="Search" onChange={searchNames} />
              </div>
              <ReservationTable customers={this.props.reservations} />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reservations: state.reservationList };
}

export default connect(mapStateToProps, actions)(AdminDashboardCustomer);
