import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderTextField } from "../../helpers/formComponents/textFields";
import { renderCheckbox } from "../../helpers/formComponents/checkbox";
import * as actions from "../../actions/actions_index";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";
import Edit from "material-ui/svg-icons/editor/mode-edit";

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
        <Paper style={styles.paper}>
          <h4>
            <Edit style={styles.createReservation.icon} />
            Edit customer
          </h4>
          <hr />
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="col s6">
              <Field name="name" label="Name" component={renderTextField} />
              <Field name="email" label="Email" component={renderTextField} />
              <Field name="phone" label="Phone" component={renderTextField} />
            </div>
            <div className="col s6">
              <Field
                name="notes"
                label="Notes"
                component={renderTextField}
                multiLine={true}
                rows={1}
                rowsMax={2}
              />
              <br />
              <br />
              <Field
                name="blacklisted"
                label="Blacklisted"
                component={renderCheckbox}
              />
              <br />
              <br />
            </div>
            <div className="right-align">
              <RaisedButton
                type="Submit"
                label="Save"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={false}
              />
            </div>
          </form>
        </Paper>
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
