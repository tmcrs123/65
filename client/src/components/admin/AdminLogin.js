import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "material-ui/TextField";
import formFields from "./adminLoginFormFields.js";
import * as actions from "../../actions/admin_actions.js";
import { connect } from "react-redux";

const renderTextField = ({ input, type, label, meta: { touched, error } }) => {
  return (
    <div>
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        type={type}
        underlineShow={true}
        {...input}
      />
      <br />
      <br />
    </div>
  );
};

class AdminLogin extends Component {
  handleFormSubmit(loginInfo, dispatchFunction, formProps) {
    this.props.authAdmin(loginInfo, formProps.history);
  }

  handleFormClear(reset) {
    reset();
    this.props.resetAuthError();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      history,
      values
    } = this.props;

    return (
      <div className="container">
        <h3>Admin login</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="email"
            label="Email"
            component={renderTextField}
            type="text"
          />
          <Field
            name="password"
            label="Password"
            component={renderTextField}
            type="password"
          />
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={() => this.handleFormClear(reset)}
          >
            Clear Values
          </button>
        </form>
        <div>
          {this.props.adminAuth.authError
            ? "Invalid email/password combination"
            : ""}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `Please insert a ${name}`;
    }
  });
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(values.email) === false) {
    errors.email = "Please insert a valid email";
  }

  return errors;
}

function mapStateToProps(state) {
  return { adminAuth: state.adminAuth };
}

AdminLogin = connect(mapStateToProps, actions)(AdminLogin);

export default reduxForm({
  form: "adminLoginForm",
  validate
})(AdminLogin);
