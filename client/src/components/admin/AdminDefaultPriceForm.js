import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import * as actions from "../../actions/actions_index";
import validate from "../../helpers/formValidation/adminDefaultPriceFormValidation";

class AdminDefaultPriceForm extends Component {
  componentDidMount() {
    this.props.getDefaultPrice();
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    formData.price = Number(formData.price);
    validate(formData, this.props.sendInvalidPriceMessage);
    this.props.updateDefaultPrice(formData);
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <Paper style={styles.pricesDashboard.defaultPrice.paper}>
        <h5>
          <strong>Edit</strong> default price
        </h5>
        <hr />
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="price" label="Price" component={renderPriceField} />
          <RaisedButton
            style={styles.pricesDashboard.defaultPrice.submitButton}
            type="Submit"
            label="Submit"
            disabled={pristine || submitting}
            primary={true}
            fullWidth={false}
          />
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { initialValues: state.defaultPrice };
}

AdminDefaultPriceForm = reduxForm({
  form: "AdminDefaultPriceForm",
  enableReinitialize: true
})(AdminDefaultPriceForm);

AdminDefaultPriceForm = connect(mapStateToProps, actions)(
  AdminDefaultPriceForm
);

export default AdminDefaultPriceForm;
