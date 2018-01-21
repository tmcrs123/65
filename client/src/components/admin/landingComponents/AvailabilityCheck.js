import React, { Component } from "react";
import axios from "axios";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { styles } from "../../../styles/styles";
import Calendar from "material-ui/svg-icons/action/date-range";

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
          this.setState({ price: res[0].data.price });
          this.setState({ available: res[1].data.available });
        });
      }
    });
  }

  renderAvailabilitySpan() {
    if (this.state.available === "...") {
      return (
        <h6 style={styles.adminAvailability.dateCheckPhrase.text}>
          is currently ...
        </h6>
      );
    } else if (this.state.available) {
      return (
        <h6 style={styles.adminAvailability.dateCheckPhrase.text}>
          is currently{" "}
          <span style={styles.AdminDashboard.availableSpan}>
            <strong>available</strong>
          </span>
        </h6>
      );
    } else {
      return (
        <h6 style={styles.adminAvailability.dateCheckPhrase.text}>
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
          <h4>
            <Calendar style={styles.adminAvailability.icon} />
            <span style={styles.adminAvailability.dateCheckPhrase.checkHeader}>
              Check availability
            </span>
          </h4>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="col s12 center-align">
            <h6 style={styles.adminAvailability.dateCheckPhrase.text}>
              A reservation starting on
            </h6>
            &nbsp; &nbsp;&nbsp;
            <DatePicker
              textFieldStyle={
                styles.adminAvailability.dateCheckPhrase.datePicker
                  .textFieldStyle
              }
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
            <h6 style={styles.adminAvailability.dateCheckPhrase.text}>
              and ending on
            </h6>
            &nbsp; &nbsp; &nbsp;
            <DatePicker
              textFieldStyle={
                styles.adminAvailability.dateCheckPhrase.datePicker
                  .textFieldStyle
              }
              style={styles.adminAvailability.dateCheckPhrase.datePicker.style}
              name="endDate"
              hintText="Pick a end date"
              autoOk={true}
              shouldDisableDate={this.disablePastDates}
              onChange={(event, date) => this.handleDateChange(date, "endDate")}
            />
            &nbsp; &nbsp; &nbsp;
            {this.renderAvailabilitySpan()}
            &nbsp; &nbsp;
            <h6 style={styles.adminAvailability.dateCheckPhrase.text}>
              and will cost {this.state.price} €.
            </h6>
          </div>
        </div>
      </Paper>
    );
  }
}

export default AvailabilityCheck;
