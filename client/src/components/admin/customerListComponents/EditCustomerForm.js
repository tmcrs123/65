import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderTextField } from "../../../helpers/formComponents/textFields";
import { renderCheckbox } from "../../../helpers/formComponents/checkbox";
import * as actions from "../../../actions/admin_actions";
import RaisedButton from "material-ui/RaisedButton";

class AdminEditReservationForm extends Component {
  componentDidMount() {
    const customerId = this.props.match.params.id;
    this.props.getCustomer(customerId);
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("got form data!", formData);
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCustomer: state.adminSelectedCustomer,
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
