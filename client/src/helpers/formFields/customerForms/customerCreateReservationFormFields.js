import React from "react";
import MenuItem from "material-ui/MenuItem";
import { renderTextField } from "../../formComponents/textFields.js";
import { renderDatePicker } from "../../formComponents/datepickers.js";
import { renderSelectField } from "../../formComponents/selectFields.js";

export const formFields = [
  {
    name: "startDate",
    label: "Start Date",
    required: true,
    component: renderDatePicker,
    onChange: (event, newValue) =>
      this.handleDateChange(event, newValue, "startDate")
  },
  {
    name: "endDate",
    label: "End Date",
    required: true,
    component: renderDatePicker,
    onChange: (event, newValue) =>
      this.handleDateChange(event, newValue, "startDate")
  },
  {
    name: "reservationPrice",
    disabled: true,
    fullWidth: false,
    label: "Price",
    value: 0,
    reservationPrice: 0,
    component: renderTextField
  },
  {
    name: "numberAdults",
    label: "Number of Adults",
    component: renderSelectField,
    required: true,
    nestedFields: () => {
      return (
        <div>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
        </div>
      );
    }
  },
  {
    name: "numberChildrens",
    label: "Number of Children",
    component: renderSelectField,
    required: true,
    nestedFields: () => {
      return (
        <div>
          <MenuItem value={0} primaryText="0" />
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
        </div>
      );
    }
  },
  {
    name: "observations",
    label: "Observations",
    component: renderTextField,
    required: false
  }
];
