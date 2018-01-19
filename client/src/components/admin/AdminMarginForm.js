import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import * as actions from "../../actions/actions_index";
import validate from "../../helpers/formValidation/adminMarginFormValidator";
import { styles } from "../../styles/styles";

class AdminMarginForm extends Component {
  componentDidMount() {
    this.props.getMargin();
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    formData.margin = Number(formData.margin);
    validate(formData, this.props.sendInvalidMarginMessage);
    this.props.updateMargin(formData);
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <Paper style={styles.pricesDashboard.marginForm.paper}>
        <h5>
          <strong>Edit</strong> Margin
        </h5>
        <hr />
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="margin"
            label="Upfront Margin in %"
            component={renderPriceField}
          />
          <div>
            <RaisedButton
              style={styles.pricesDashboard.marginForm.submitButton}
              type="Submit"
              label="Submit"
              disabled={pristine || submitting}
              primary={true}
              fullWidth={false}
            />
          </div>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { initialValues: state.margin };
}

AdminMarginForm = reduxForm({
  form: "AdminMarginForm",
  enableReinitialize: true
})(AdminMarginForm);

AdminMarginForm = connect(mapStateToProps, actions)(AdminMarginForm);

export default AdminMarginForm;
