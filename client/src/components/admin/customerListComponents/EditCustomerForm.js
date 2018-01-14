import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderTextField } from "../../../helpers/formComponents/textFields";
import { renderCheckbox } from "../../../helpers/formComponents/checkbox";
import * as actions from "../../../actions/admin_actions";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";

import { validateForm } from "../../../helpers/formHelpers/adminForms/adminEditCustomerFormHelper";

class AdminEditReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  componentDidMount() {
    const customerId = this.props.match.params.id;
    this.props.getCustomer(customerId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message.text !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  handleRequestClose() {
    this.props.clearAdminMessage();
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    validateForm(formData);
    this.props.submitCustomer(formData);
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    return (
      <div className="container">
        <h2>Edit a customer</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="name" label="Name" component={renderTextField} />
          <br />
          <Field name="email" label="Email" component={renderTextField} />
          <br />
          <Field
            name="notes"
            label="Notes"
            component={renderTextField}
            multiline={true}
            rows={5}
          />
          <br />
          <Field name="phone" label="Phone" component={renderTextField} />
          <br />
          <Field
            name="blacklisted"
            label="Blacklisted"
            component={renderCheckbox}
          />
          <br />
          <RaisedButton
            type="Submit"
            label="Submit"
            disabled={pristine || submitting}
            primary={true}
            fullWidth={false}
          />
        </form>
        <Snackbar
          open={this.state.showMessage}
          message={this.props.message.text}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCustomer: state.adminSelectedCustomer,
    message: state.adminMessages,
    initialValues: state.adminSelectedCustomer
  };
}

AdminEditReservationForm = reduxForm({
  form: "adminEditCustomerForm",
  enableReinitialize: true
})(AdminEditReservationForm);

AdminEditReservationForm = connect(mapStateToProps, actions)(
  AdminEditReservationForm
);

export default AdminEditReservationForm;
