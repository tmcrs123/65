const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateIntervalSchema = {
  startDate: {
    type: Date,
    required: "You must supply a start date."
  },
  endDate: {
    type: Date,
    required: "You must supply a end date."
  },
  price: {
    type: Number,
    required: "You must supply a price."
  }
};

mongoose.model("dateIntervals", DateIntervalSchema);
