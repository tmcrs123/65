const mongoose = require("mongoose");
const keys = require("../config/keys.js");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

require("../models/Reservation.js");
require("../models/Customer.js");

const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");

const TiagoRodrigues = Customer.findOne({
  googleId: "107796806649419791901"
}).then(tr => {
  Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const seedReservation = new Reservation({
    customerId: tr.id,
    startDate: new Date().setHours(0, 0, 0, 0),
    endDate: new Date().setHours(0, 0, 0, 0),
    totalPayment: false
  });

  tr.reservations.push(seedReservation);

  Promise.all([tr.save(), seedReservation.save()]).then(() =>
    console.log("saved all")
  );
});
