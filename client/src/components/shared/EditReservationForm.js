import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { reduxForm, Field, formValueSelector } from "redux-form";
import * as actions from "../../actions/actions_index";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderCheckbox } from "../../helpers/formComponents/checkbox.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import { renderTextField } from "../../helpers/formComponents/textFields.js";
import validate from "../../helpers/formValidation/editReservationFormValidation";
import { REJECTED, APPROVED, PENDING } from "../../helpers/constants";

class CustomerEditReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      hideBookingFee: true
    };
  }

  componentDidMount() {
    const selectedReservationId = this.props.match.params.id;
    this.props.getReservation(selectedReservationId);
    this.props.getMargin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  renderBookingFeeText() {
    if (this.state.hideBookingFee) {
      return null;
    } else {
      return (
        <p>Booking fee: {Math.round(this.props.price * this.props.margin)}€</p>
      );
    }
  }

  renderMenuItems = (startValue, endValue) => {
    let menuItems = [];
    for (let i = startValue; i <= endValue; i++) {
      let item = <MenuItem key={i} value={i} primaryText={`${i}`} />;
      menuItems.push(item);
    }
    return menuItems;
  };

  renderPricePaid() {
    if (this.props.isAdmin) {
      return (
        <Field
          style={styles.textField}
          name="price_paid"
          label="Paid"
          component={renderPriceField}
        />
      );
    }
  }

  renderStatusDropdown() {
    if (this.props.isAdmin) {
      let menuItems = [];
      let statusType = [APPROVED, PENDING, REJECTED];
      statusType.forEach(status => {
        let item = (
          <MenuItem
            key={status}
            value={status}
            primaryText={`${_.capitalize(status)}`}
          />
        );
        menuItems.push(item);
      });

      return (
        <Field
          name="status"
          label="Reservation Status"
          component={renderSelectField}
        >
          {menuItems}
        </Field>
      );
    }
  }

  handleRequestClose() {
    this.props.clearMessage();
  }
  handleDateChange() {
    /**
     * Explain why set timeout
     */
    setTimeout(() => {
      if (this.props.startDate && this.props.endDate) {
        if (this.props.startDate > this.props.endDate) {
          this.props.sendInvalidDatesMessage();
          return;
        }
        axios
          .post("/api/calculatePrice", {
            startDate: this.props.startDate,
            endDate: this.props.endDate
          })
          .then(res => {
            this.props.change("price", res.data.price);
            this.setState({ hideBookingFee: false });
          });
      }
    }, 500);
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("forma data", formData);
    formData["price"] = Number(formData["price"]);
    validate(
      formData,
      this.props.isAdmin,
      this.props.sendInvalidDatesMessage,
      this.props.sendInvalidPersonsMessage,
      this.props.sendInvalidPriceMessage,
      this.props.sendNoCustomerSelectedMessage,
      this.props.sendInvalidPricePaidMessage
    );
    this.props.updateReservation(
      this.props.match.params.id,
      formData,
      this.props.history
    );
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <div className="container">
        <Paper style={styles.editReservation.paper}>
          <h4>
            <strong>Edit </strong>reservation
          </h4>
          <hr />
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="col s6">
              <Field
                name="startDate"
                label="Start-Date"
                component={renderDatePicker}
                onChange={() => this.handleDateChange()}
              />
              <Field
                name="endDate"
                label="End-Date"
                component={renderDatePicker}
                onChange={() => this.handleDateChange()}
              />
              <Field
                name="price"
                label="Price"
                component={renderPriceField}
                disabled={!this.props.isAdmin}
              />
              {this.renderPricePaid()}
              {this.renderBookingFeeText()}
            </div>
            <div className="col s6">
              {this.renderStatusDropdown()}
              <Field
                name="numberAdults"
                label="Number of Adults"
                component={renderSelectField}
              >
                {this.renderMenuItems(1, 4)}
              </Field>
              <Field
                name="numberChildrens"
                label="Number of childrens"
                component={renderSelectField}
              >
                {this.renderMenuItems(0, 3)}
              </Field>
              <Field
                name="observations"
                label="Observations"
                component={renderTextField}
                multiline={true}
              />
            </div>
            <div className="right">
              <RaisedButton
                style={styles.submitButton}
                type="Submit"
                label="Submit"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={false}
              />
            </div>
          </form>
          <Snackbar
            open={this.state.showMessage}
            message={this.props.message}
            autoHideDuration={3000}
            onRequestClose={() => this.handleRequestClose()}
          />
        </Paper>
      </div>
    );
  }
}

const selector = formValueSelector("customerEditReservationForm");

function mapStateToProps(state) {
  const startDate = selector(state, "startDate");
  const endDate = selector(state, "endDate");
  const upfrontPayment = selector(state, "upfrontPayment");
  const price = selector(state, "price");
  const priceToPay = selector(state, "price_toPay");

  return {
    message: state.messages.message,
    initialValues: state.reservation,
    margin: state.margin.margin / 100,
    startDate,
    endDate,
    upfrontPayment,
    price,
    priceToPay
  };
}
/**
 * A Ordem interessa!
 *
 */

CustomerEditReservationForm = reduxForm({
  form: "customerEditReservationForm",
  enableReinitialize: true
})(CustomerEditReservationForm);

CustomerEditReservationForm = connect(mapStateToProps, actions)(
  CustomerEditReservationForm
);

export default CustomerEditReservationForm;
