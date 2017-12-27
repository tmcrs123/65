const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customers",
    required: "A reservation must have a customer."
  },
  startDate: {
    type: Date,
    required: "A reservation must have a starting date."
  },
  endDate: {
    type: Date,
    required: "A reservation must have a ending date."
  },
  reservationValueTotal: {
    type: Number,
    min: 0,
    default: 0,
    required: "You must supply a price for the reservation."
  },
  reservationValuePaid: {
    type: Number,
    min: 0,
    default: 0
  },
  observations: String,
  totalPayment: {
    type: Boolean,
    required: "You must select a payment type"
  },
  numberAdults: {
    type: Number,
    min: 1,
    default: 1
  },
  numberChildrens: {
    type: Number,
    min: 0,
    default: 0
  }
});

reservationSchema.virtual("reservationLeftToPay").get(() => {
  return this.reservationValueTotal - this.reservationValuePaid;
});

const Reservation = mongoose.model("reservations", reservationSchema);
module.exports = Reservation;
