const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const faker = require("faker");
const moment = require("moment");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

require("../models/Reservation");
require("../models/Customer");

function getObservations() {
  const bool = faker.random.arrayElement([true, false]);
  if (bool) return faker.random.words(10);
}

const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");

let startDate = moment(new Date())
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);
let endDate = moment(new Date())
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);

Customer.aggregate([
  {
    $project: {
      _id: 1
    }
  }
]).then(customersId => {
  Reservation.collection.drop();

  let reservationSeed = [];

  for (let i = 0; i < 100; i++) {
    let price = faker.random.number({
      min: 50,
      max: 100
    });

    let paid = faker.random.number({
      min: 20,
      max: 40
    });

    let fullPay = faker.random.arrayElement([true, false]);

    endDate.add(
      faker.random.number({
        min: 2,
        max: 15
      }),
      "days"
    );

    if (i % 2 === 0) {
      startDate.date(endDate.date());
      startDate.month(endDate.month());
      startDate.year(endDate.year());
      continue;
    }

    reservationSeed.push({
      customer: faker.random.arrayElement(customersId),
      startDate: new Date(startDate._d),
      endDate: new Date(endDate._d),
      price: price,
      price_paid: (() => {
        if (fullPay) return price;
        return paid;
      })(),
      numberAdults: faker.random.number({ min: 1, max: 2 }),
      numberChildrens: faker.random.number({ min: 1, max: 2 }),
      createdByAdmin: faker.random.arrayElement([true, false]),
      status: faker.random.arrayElement(["approved", "rejected", "pending"]),
      observations: getObservations()
    });
    startDate.date(endDate.date());
    startDate.month(endDate.month());
    startDate.year(endDate.year());
  }

  Reservation.insertMany(reservationSeed).then(reservations => {
    //push reservations to respective customer
    reservations.forEach(reservation => {
      Customer.findById({ _id: reservation.customer }).then(customer => {
        customer.reservations.push(reservation._id);
        customer.save();
      });
    });
  });
});
