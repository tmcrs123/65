import React, { Component } from "react";
import { connect } from "react-redux";
import ApprovalList from "./landingComponents/ApprovalList";
import InfoCard from "./landingComponents/infoCard";
import DatePicker from "material-ui/DatePicker";
import axios from "axios";
import AvailabilityCheck from "./landingComponents/AvailabilityCheck";
import * as actions from "../../actions/actions_index";

class AdminDashboardLanding extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAdminDashboardData();
  }

  renderPriceTitles(valueReservationType) {
    if (valueReservationType && valueReservationType != "") {
      return `${valueReservationType.price} €`;
    }
    return "0 €";
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="container-fluid">
            <AvailabilityCheck />
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <ApprovalList nextReservations={this.props.nextReservations} />
          </div>
          <div className="col s3">
            <InfoCard
              title={
                this.props.monthReservationCount
                  ? `#${this.props.monthReservationCount.count}`
                  : ""
              }
              subtitle="is the number of reservations you have this month."
            />
          </div>
          <div className="col s3">
            <InfoCard
              title={
                this.props.currentReservationCustomer
                  ? `${this.props.currentReservationCustomer.name}`
                  : "Empty!"
              }
              subtitle={
                this.props.currentReservationCustomer
                  ? "is the current customer."
                  : "Currently there is no current customer."
              }
            />
          </div>
          <div className="col s3">
            <InfoCard
              title={this.renderPriceTitles(
                this.props.valueApprovedReservations
              )}
              subtitle={"is the money you made in approved reservations"}
            />
            <InfoCard
              title={this.renderPriceTitles(
                this.props.valuePendingReservations
              )}
              subtitle={"is the money you have in pending reservations"}
            />
            <InfoCard
              title={this.renderPriceTitles(
                this.props.valueRejectedReservations
              )}
              subtitle={"is the money you lost in rejected reservations"}
            />
          </div>
        </div>

        <div />
      </div>
    );
  }
}

function mapStateToProps({ AdminDashboardData }) {
  return AdminDashboardData;
}

export default connect(mapStateToProps, actions)(AdminDashboardLanding);
