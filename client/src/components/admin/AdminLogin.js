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
import { styles } from "../../styles/styles";
import palmtree from "../../resources/palmTree.png";

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
      <div className="row">
        <div className="col s4 offset-s4">
          <Paper
            zDepth={4}
            className="center-align"
            style={styles.adminLogin.paper}
          >
            <img src={palmtree} width="100px" />
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
                style={styles.adminLogin.signIn}
                type="Submit"
                label="Sign in"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={false}
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
