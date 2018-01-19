import React, { Component } from "react";
import axios from "axios";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { styles } from "../../../styles/styles";

class AvailabilityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = { price: "", available: "" };
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

        const datesPromise = axios.post(
          "/api/reservations/availability",
          dates
        );
        Promise.all([pricePromise, datesPromise]).then(res => {
          console.log(res[1].data);

          this.setState({ price: res[0].data.price });
          this.setState({ available: res[1].data.availableDates });
        });
      }
    });
  }

  render() {
    return (
      <Paper style={styles.AdminDashboard.availabilityCheck.paper} zDepth={5}>
        <div className="row">
          <h5>
            <strong>Check</strong> availability
          </h5>
        </div>
        <hr />
        <div className="row">
          <div className="col s2">
            <DatePicker
              name="startDate"
              hintText="Start Date"
              autoOk={true}
              onChange={(event, date) =>
                this.handleDateChange(date, "startDate")
              }
            />
          </div>
          <div className="col s2">
            <DatePicker
              name="endDate"
              hintText="End Date"
              autoOk={true}
              onChange={(event, date) => this.handleDateChange(date, "endDate")}
            />
          </div>
          <div className="col s2">
            <TextField
              value={this.state.price}
              disabled={true}
              hintText="Price"
              underlineDisabledStyle={{ borderBottom: " 1pt solid #E0E0E0" }}
            />
          </div>
          <div className="col s2">
            <TextField
              value={this.state.available}
              disabled={true}
              hintText="Available?"
              underlineDisabledStyle={{ borderBottom: " 1pt solid #E0E0E0" }}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

export default AvailabilityCheck;
