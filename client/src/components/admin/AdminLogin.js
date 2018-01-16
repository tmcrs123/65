import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "material-ui/TextField";
import { renderTextField } from "../../helpers/formComponents/textFields";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import * as actions from "../../actions/actions_index";
import { connect } from "react-redux";
import validate from "../../helpers/formValidation/adminLoginFormValidation";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  handleFormSubmit(loginInfo, dispatchFunction, formProps) {
    this.props.loginUser(loginInfo, formProps.history);
  }

  handleRequestClose() {
    this.props.clearMessage();
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
        <Paper zDepth={5} className="center-align">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field
              name="email"
              label="Email"
              component={renderTextField}
              type="text"
            />
            <br />
            <Field
              name="password"
              label="Password"
              component={renderTextField}
              type="password"
            />
            <br />
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
            <Snackbar
              open={this.state.showMessage}
              message={this.props.message}
              autoHideDuration={3000}
              onRequestClose={() => this.handleRequestClose()}
            />
          </form>
        </Paper>
        <div />
      </div>
    );
  }
}

function mapStateToProps({ authReducer, messages }) {
  return { authReducer, message: messages.message };
}

AdminLogin = connect(mapStateToProps, actions)(AdminLogin);

export default reduxForm({
  form: "adminLoginForm",
  validate
})(AdminLogin);
