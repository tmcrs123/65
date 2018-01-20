import React, { Component } from "react";
import { connect } from "react-redux";
import ApprovalList from "./landingComponents/list";
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
            <ApprovalList />
          </div>
          <div className="col s3">
            <InfoCard />
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
