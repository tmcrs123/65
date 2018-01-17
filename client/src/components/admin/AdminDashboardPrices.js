import React, { Component } from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import { Card, CardActions } from "material-ui/Card";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import DateIntervalsForm from "../admin/AdminDateIntervalsForm";
import AdminDateIntervalsList from "./AdminDateIntervalsList";
import AdminDefaultPriceForm from "./AdminDefaultPriceForm";

class AdminDashboardPrices extends Component {
  render() {
    return (
      <Paper>
        <div className="container-fluid">
          <div className="row">
            <div className="col s6">
              <DateIntervalsForm />
            </div>
            <div className="col s6">
              <AdminDateIntervalsList />
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <AdminDefaultPriceForm />
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default reduxForm({
  form: "setPriceForm",
  enableReinitialize: true
})(AdminDashboardPrices);
