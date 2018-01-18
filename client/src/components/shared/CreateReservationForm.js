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
import { renderCheckbox } from "../../helpers/formComponents/checkbox.js";
import validate from "../../helpers/formValidation/createReservationFormValidation";

class CreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  componentDidMount() {
    if (this.props.isAdmin) {
      this.props.getCustomerList();
      this.props.getMargin();
    }
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

  handleRequestClose() {
    this.props.clearMessage();
  }

  handlePriceChange() {
    setTimeout(() => {
      this.props.upfrontPayment
        ? this.props.change("payNow", this.props.price)
        : this.props.change("payNow", this.props.price * 0.1);
    }, 500);
  }

  handleDateChange() {
    /**
     * Explain why set timeout
     */
    setTimeout(() => {
      if (this.props.startDate && this.props.endDate) {
        axios
          .post("/api/calculatePrice", {
            startDate: this.props.startDate,
            endDate: this.props.endDate
          })
          .then(res => {
            this.props.change("price", res.data.price);
            this.handleCheckboxChange(this.props.upfrontPayment);
          });
      }
    }, 500);
  }

  handleCheckboxChange(value) {
    let price = "";

    value
      ? this.props.change("payNow", this.props.price)
      : this.props.change("payNow", this.props.price * this.props.margin);
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
      this.props.sendNoCustomerSelectedMessage
    );
    this.props.submitReservationForm(
      {
        ...formData,
        createdByAdmin: this.props.isAdmin
      },
      this.props.reset
    );
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    return (
      <div className="container">
        <Paper style={styles.paper}>
          <h3>Create a reservation</h3>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="col s6">
              {this.props.isAdmin ? this.renderSelectCustomerField() : null}
              <Field
                name="startDate"
                label="Start-Date"
                component={renderDatePicker}
                onChange={() => this.handleDateChange()}
              />
              <br />
              <Field
                name="endDate"
                label="End-Date"
                component={renderDatePicker}
                onChange={() => this.handleDateChange()}
              />
              <br />

              <Field
                name="price"
                label="Price"
                component={renderPriceField}
                onChange={() => this.handlePriceChange()}
                disabled={!this.props.isAdmin}
              />
              <br />
              <Field
                name="upfrontPayment"
                label="Pay reservation total now?"
                component={renderCheckbox}
                onChange={(event, value) => this.handleCheckboxChange(value)}
              />
            </div>
            <br />
            <div className="col s6">
              <Field
                name="payNow"
                label="Pay Now"
                component={renderPriceField}
                disabled={!this.props.isAdmin}
              />
              <br />
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
                rows={3}
                rowsMax={4}
              />
            </div>
            <br />
            <div className="right-align">
              <RaisedButton
                type="Submit"
                label="Submit"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={false}
              />
              <RaisedButton
                type="button"
                label="Clear Value"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={false}
                onClick={reset}
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
