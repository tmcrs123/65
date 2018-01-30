import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import axios from "axios";
import * as actions from "../../actions/actions_index";
import { styles } from "../../styles/styles";
import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import AddCircle from "material-ui/svg-icons/content/add-circle-outline";
import validate from "../../helpers/formValidation/createReservationFormValidation";

class CreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      hideBookingFee: true
    };
  }

  componentDidMount() {
    if (this.props.isAdmin) {
      this.props.getCustomerList();
    }
    this.props.getMargin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  createCustomerList() {
    let customers = [];
    this.props.customers.map(customer => {
      customers.push(
        <MenuItem
          key={customer._id}
          value={customer._id}
          primaryText={`${customer.name}`}
        />
      );
    });
    return customers;
  }

  renderSelectCustomerField() {
    if (!this.props.isAdmin) return null;

    return (
      <Field
        name="customer"
        label="Select a customer"
        component={renderSelectField}
      >
        {this.createCustomerList()}
      </Field>
    );
  }

  renderMenuItems = (startValue, endValue) => {
    let menuItems = [];
    for (let i = startValue; i <= endValue; i++) {
      let item = <MenuItem key={i} value={i} primaryText={`${i}`} />;
      menuItems.push(item);
    }
    return menuItems;
  };

  clearForm() {
    this.props.reset();
    this.setState({ hideBookingFee: true });
  }

  renderBookingFeeText() {
    if (this.state.hideBookingFee) return;
    let bookingFee;
    if (this.props.price != "" && this.props.price !== undefined) {
      bookingFee = Math.round(this.props.price * this.props.margin);
    } else {
      bookingFee = 0;
    }
    return <p>Booking fee: {bookingFee}€</p>;
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
        if (this.props.startDate.getTime() == this.props.endDate.getTime()) {
          this.props.sendInvalidSameDateMessage();
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
    formData["price"] = Number(formData["price"]);
    formData["payNow"] = Number(formData["payNow"]);
    validate(
      formData,
      this.props.isAdmin,
      this.props.sendInvalidDatesMessage,
      this.props.sendInvalidPersonsMessage,
      this.props.sendInvalidPriceMessage,
      this.props.sendNoCustomerSelectedMessage,
      this.props.sendInvalidSameDateMessage
    );
    this.props.submitReservationForm(
      {
        ...formData,
        createdByAdmin: this.props.isAdmin
      },
      this.props.reset
    );
    this.setState({ hideBookingFee: true });
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    return (
      <div className="container">
        <Paper style={styles.createReservation.paper}>
          <h4>
            <AddCircle style={styles.createReservation.icon} />
            Add Reservation
          </h4>
          <hr />
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="col s6">
              {this.props.isAdmin ? this.renderSelectCustomerField() : null}
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
              {this.renderBookingFeeText()}
            </div>
            <div className="col s6">
              <Field
                name="numberAdults"
                label="Number of Adults"
                component={renderSelectField}
              >
                {this.renderMenuItems(1, 4)}
              </Field>
              <br />
              <Field
                name="numberChildrens"
                label="Number of childrens"
                component={renderSelectField}
              >
                {this.renderMenuItems(0, 3)}
              </Field>
              <br />
              <Field
                name="observations"
                label="Observations"
                component={renderTextField}
                multiLine={true}
                rows={1}
                rowsMax={2}
              />
              <div>
                <RaisedButton
                  style={styles.submitButton}
                  type="Submit"
                  label="Create Reservation"
                  disabled={pristine || submitting}
                  primary={true}
                  fullWidth={false}
                />
                <RaisedButton
                  type="button"
                  label="Clear"
                  disabled={pristine || submitting}
                  primary={false}
                  secondary={true}
                  fullWidth={false}
                  onClick={() => {
                    this.clearForm();
                  }}
                />
              </div>
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

const selector = formValueSelector("CreateReservationForm");

function mapStateToProps(state) {
  const upfrontPayment = selector(state, "upfrontPayment");
  const price = selector(state, "price");
  const startDate = selector(state, "startDate");
  const endDate = selector(state, "endDate");
  const payNow = selector(state, "payNow");

  return {
    message: state.messages.message,
    auth: state.auth,
    customers: state.customerList,
    customerInfo: state.customerInfo,
    adminInfo: state.adminAuth,
    margin: state.margin.margin / 100,
    upfrontPayment,
    price,
    startDate,
    endDate,
    payNow
  };
}

CreateReservationForm = reduxForm({
  form: "CreateReservationForm",
  enableReinitialize: true,
  initialValues: { upfrontPayment: false }
})(CreateReservationForm);

CreateReservationForm = connect(mapStateToProps, actions)(
  CreateReservationForm
);

export default CreateReservationForm;
