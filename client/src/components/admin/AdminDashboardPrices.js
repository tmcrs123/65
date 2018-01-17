import React, { Component } from "react";
import { connect } from "react-redux";
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
import * as actions from "../../actions/actions_index";

class AdminDashboardPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({
        showMessage: true
      });
    } else {
      this.setState({
        showMessage: false
      });
    }
  }

  handleRequestClose() {
    this.props.clearMessage();
  }

  render() {
    return (
      <div>
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
        <Snackbar
          open={this.state.showMessage}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.messages.message
  };
}

AdminDashboardPrices = reduxForm({
  form: "setPriceForm",
  enableReinitialize: true
})(AdminDashboardPrices);

AdminDashboardPrices = connect(mapStateToProps, actions)(AdminDashboardPrices);

export default AdminDashboardPrices;
