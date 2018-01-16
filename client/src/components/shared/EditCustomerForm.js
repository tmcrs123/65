import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderTextField } from "../../helpers/formComponents/textFields";
import { renderCheckbox } from "../../helpers/formComponents/checkbox";
import * as actions from "../../actions/actions_index";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";

/**
 * Same validator as admin edit customer form - Change names!
 */
import { validate } from "../../helpers/formValidation/customerFormValidation";

class AddCustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  componentDidMount() {
    this.props.getCustomer(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    validate(formData);
    this.props.editCustomer(formData, this.props.reset);
  }
  handleRequestClose() {
    this.props.clearMessage();
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <div className="container">
        <h1>Add customer form</h1>
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
          message={this.props.message}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.messages.message,
    initialValues: state.customer
  };
}

AddCustomerForm = reduxForm({
  form: "adminAddCustomerForm",
  enableReinitialize: true
})(AddCustomerForm);

AddCustomerForm = connect(mapStateToProps, actions)(AddCustomerForm);

export default AddCustomerForm;
