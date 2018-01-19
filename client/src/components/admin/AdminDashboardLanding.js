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

  render() {
    return (
      <div>
        <h2>Landing</h2>
        <div className="row">
          <div className="col s3">
            <ApprovalList />
          </div>
          <div className="col s3">
            <InfoCard />
          </div>
          <div className="col s3">
            <ApprovalList />
          </div>
          <div className="col s3">
            <InfoCard />
          </div>
        </div>
        <div className="row">
          <div className="container">
            <AvailabilityCheck />
          </div>
        </div>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(AdminDashboardLanding);
