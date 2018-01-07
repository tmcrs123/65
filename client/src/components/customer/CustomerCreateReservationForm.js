/**
 * Remove imports I dont need
 * merge handlechange adulsts and children
 * shorten render form method to use form fields
 * organize helpers
 */

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import axios from "axios";

import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import { validateCustomerCreateReservationForm } from "../../helpers/formHelpers/customerForms/customerCreateReservationHelper.js";
import { formFields } from "../../helpers/formFields/customerForms/customerCreateReservationFormFields.js";

class CustomerCreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      AdultValue: 1,
      ChildrenValue: 0,
      startDate: undefined,
      endDate: undefined,
      price: 0
    };
  }

  handleOpen() {
    this.setState({ dialog: true });
  }

  handleClose() {
    this.setState({ dialog: false });
  }

  handleFormClear(reset) {
    reset();
    this.setState({ startDate: undefined });
    this.setState({ endDate: undefined });
  }

  handleDateChange(event, newValue, caller) {
    this.setState({ [caller]: newValue });
    if (this.state.startDate && this.state.endDate) {
      axios.get("/api/price").then(res => {
        this.setState({ price: res.data.price });
      });
    }
    if (this.props.error) this.props.clearSubmitErrors();
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("form props on submit", formProps);
    const validationErrors = validateCustomerCreateReservationForm(formData);
    console.log("Errors", validationErrors);
  }

  renderMenuItems(startValue, endValue) {
    let menuItems = [];
    for (let i = startValue; i <= endValue; i++) {
      let item = <MenuItem key={i} value={i} primaryText={`${i}`} />;
      menuItems.push(item);
    }
    return menuItems;
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.handleClose()}
      />,
      <FlatButton
        type="submit"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleClose()}
      />
    ];
    const style = {
      margin: 12
    };

    return (
      <div className="container">
        <h3>Create a reservation</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="startDate"
            label="Start-Date"
            component={renderDatePicker}
            date={this.state.startDate}
            onChange={(event, newValue) =>
              this.handleDateChange(event, newValue, "startDate")}
          />
          <br />
          <Field
            name="endDate"
            label="End-Date"
            component={renderDatePicker}
            date={this.state.endDate}
            onChange={(event, newValue) =>
              this.handleDateChange(event, newValue, "endDate")}
          />
          <br />
          <Field
            name="reservationPrice"
            label="Price"
            reservationPrice={this.state.price}
            component={renderPriceField}
          />
          <br />
          <Field
            name="numberAdults"
            label="Number of Adults"
            component={renderSelectField}
            clearErrors={this.props.clearSubmitErrors}
          >
            {this.renderMenuItems(1, 4)}
          </Field>
          <br />
          <Field
            name="numberChildrens"
            label="Number of childrens"
            component={renderSelectField}
            clearErrors={this.props.clearSubmitErrors}
          >
            {this.renderMenuItems(0, 3)}
          </Field>
          <br />
          <Field
            name="observations"
            label="Observations"
            component={renderTextField}
            multiline={true}
            onChange={() => this.props.clearSubmitErrors()}
          />
          <br />
          <RaisedButton
            type="button"
            label="Submit"
            onClick={() => this.handleOpen()}
            disabled={pristine || submitting}
            primary={true}
            style={style}
            fullWidth={false}
          >
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={false}
              open={this.state.dialog}
              onRequestClose={() => this.handleClose()}
            >
              The actions in this window were passed in as an array of React
              objects.
            </Dialog>
          </RaisedButton>
          <RaisedButton
            type="button"
            label="Clear Value"
            disabled={pristine || submitting}
            primary={true}
            style={style}
            fullWidth={false}
            onClick={() => this.handleFormClear(reset)}
          />
        </form>
        {error && <strong>{error}</strong>}
      </div>
    );
  }
}

export default reduxForm({
  form: "customerCreateReservationForm",
  asyncBlurFields: ["startDate", "endDate"]
})(CustomerCreateReservationForm);
