const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
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
    price: {
      type: Number,
      min: 0,
      default: 0,
      required: "You must supply a price for the reservation."
    },
    price_paid: {
      type: Number,
      min: 0,
      default: 0
    },
    observations: {
      type: String,
      default: ""
    },
    upfrontPayment: {
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
    },
    status: {
      type: String,
      default: "pending"
    },
    createdByAdmin: {
      type: Boolean,
      required:
        "The role of the person who created the reservation must be supplied"
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reservationSchema.virtual("price_toPay").get(function() {
  return this.price - this.price_paid;
});

const Reservation = mongoose.model("reservations", reservationSchema);
module.exports = Reservation;
