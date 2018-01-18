import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import * as actions from "../../actions/actions_index";
import validate from "../../helpers/formValidation/adminMarginFormValidator";

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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="margin"
          label="Upfront Margin in %"
          component={renderPriceField}
        />
        <RaisedButton
          type="Submit"
          label="Submit"
          disabled={pristine || submitting}
          primary={true}
          fullWidth={false}
        />
      </form>
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
