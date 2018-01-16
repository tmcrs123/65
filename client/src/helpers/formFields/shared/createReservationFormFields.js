import React from "react";
import MenuItem from "material-ui/MenuItem";

export const formFields = [
  {
    name: "startDate",
    label: "Start Date",
    required: true
  },
  {
    name: "endDate",
    label: "End Date",
    required: true
  },
  {
    name: "price",
    label: "Price",
    required: true
  },
  {
    name: "upfrontPayment",
    required: false
  },
  {
    name: "payNow",
    required: false
  },
  {
    name: "numberAdults",
    label: "Number of Adults",
    required: true
  },
  {
    name: "numberChildrens",
    label: "Number of Children",
    required: true
  },
  {
    name: "observations",
    label: "Observations",
    required: false
  }
];