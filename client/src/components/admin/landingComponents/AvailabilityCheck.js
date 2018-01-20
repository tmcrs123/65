import React, { Component } from "react";
import axios from "axios";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { styles } from "../../../styles/styles";

class AvailabilityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = { price: "...", available: "..." };
  }

  disablePastDates(date) {
    if (date.getTime() < Date.now()) return true;
    return false;
  }

  handleDateChange(date, dateField) {
    this.setState({ [dateField]: date });

    setTimeout(() => {
      if (this.state.startDate && this.state.endDate) {
        const dates = {
          startDate: this.state.startDate,
          endDate: this.state.endDate
        };

        const pricePromise = axios.post("/api/calculatePrice", dates);

        const datesPromise = axios.post("/api/availability", dates);
        Promise.all([pricePromise, datesPromise]).then(res => {
          console.log("avail", res[1].data.available);
          this.setState({ price: res[0].data.price });
          this.setState({ available: res[1].data.available });
        });
      }
    });
  }

  renderAvailabilitySpan() {
    if (this.state.available === "...") {
      return (
        <h6 style={{ display: "inline-block", fontSize: "20px" }}>
          is currently ...
        </h6>
      );
    } else if (this.state.available) {
      return (
        <h6 style={{ display: "inline-block", fontSize: "20px" }}>
          is currently{" "}
          <span style={styles.AdminDashboard.availableSpan}>
            <strong>available</strong>
          </span>
        </h6>
      );
    } else {
      return (
        <h6 style={{ display: "inline-block", fontSize: "20px" }}>
          is currently{" "}
          <span style={styles.AdminDashboard.unavailableSpan}>
            <strong>unavailable</strong>
          </span>
        </h6>
      );
    }
  }

  render() {
    return (
      <Paper style={styles.AdminDashboard.availabilityCheck.paper} zDepth={5}>
        <div className="row">
          <h5>
            <i className="material-icons">date_range</i>
            <strong>Check</strong> availability
          </h5>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="col s12 center-align">
            <h6 style={{ display: "inline-block", fontSize: "20px" }}>
              A reservation starting on
            </h6>
            &nbsp; &nbsp;&nbsp;
            <DatePicker
              textFieldStyle={{ fontSize: 20 }}
              style={{
                display: "inline-block",
                width: "150px"
              }}
              name="startDate"
              hintText="Pick a start date"
              autoOk={true}
              shouldDisableDate={this.disablePastDates}
              onChange={(event, date) =>
                this.handleDateChange(date, "startDate")
              }
            />
            &nbsp; &nbsp;&nbsp;
            <h6 style={{ display: "inline-block", fontSize: "20px" }}>
              and ending on
            </h6>
            &nbsp; &nbsp; &nbsp;
            <DatePicker
              textFieldStyle={{ fontSize: 20, textAlign: "center" }}
              style={{ display: "inline-block", width: "150px" }}
              name="endDate"
              hintText="Pick a end date"
              autoOk={true}
              shouldDisableDate={this.disablePastDates}
              onChange={(event, date) => this.handleDateChange(date, "endDate")}
            />
            &nbsp; &nbsp; &nbsp;
            {this.renderAvailabilitySpan()}
            &nbsp; &nbsp;
            <h6 style={{ display: "inline-block", fontSize: "20px" }}>
              and will cost {this.state.price} €
            </h6>
          </div>
        </div>
      </Paper>
    );
  }
}

export default AvailabilityCheck;
