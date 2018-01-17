import React, { Component } from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import Divider from "material-ui/Divider";
import { Card, CardActions } from "material-ui/Card";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import DateIntervalsForm from "../admin/AdminDateIntervalsForm";

class AdminDashboardPrices extends Component {
  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("form data", formData);
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <Paper>
        <div className="container-fluid">
          <div className="col s6">
            <DateIntervalsForm />
          </div>
        </div>
        <div className="col s6">
          <h3>A list of price intervals</h3>
        </div>
        <Divider inset={false} />
      </Paper>
    );
  }
}

export default reduxForm({
  form: "setPriceForm",
  enableReinitialize: true
})(AdminDashboardPrices);
