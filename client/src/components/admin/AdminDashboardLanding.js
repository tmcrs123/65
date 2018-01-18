import React, { Component } from "react";
import ApprovalList from "./landingComponents/list";
import InfoCard from "./landingComponents/infoCard";
import DatePicker from "material-ui/DatePicker";
import axios from "axios";

class AdminDashboardLanding extends Component {
  constructor(props) {
    super(props);
  }

  handleDateChange(date, dateField) {
    console.log("state", this.state);
    this.setState({ [dateField]: date });

    setTimeout(() => {
      if (this.state.startDate && this.state.endDate) {
        axios
          .post("/api/calculatePrice", {
            startDate: this.state.startDate,
            endDate: this.state.endDate
          })
          .then(res => console.log(res.data));
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Landing</h2>
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
        <DatePicker
          name="startDate"
          hintText="Start Date"
          autoOk={true}
          onChange={(event, date) => this.handleDateChange(date, "startDate")}
        />
        <DatePicker
          name="endDate"
          hintText="End Date"
          autoOk={true}
          onChange={(event, date) => this.handleDateChange(date, "endDate")}
        />
        <div />
      </div>
    );
  }
}

export default AdminDashboardLanding;
