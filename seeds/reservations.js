const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const faker = require("faker");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
    mongoose.connect(keys.mongoURI);
}

require("../models/Reservation.js");
require("../models/Customer");

const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");

const customerIdList = Customer.aggregate([{
    $project: {
        _id: 1
    }
}]).then(customersId => {

    Reservation.collection.drop();

    let reservationSeed = [];

    for (i = 0; i < 63; i++) {
        reservationSeed.push({
            customer: faker.random.arrayElement(customersId),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            price: faker.random.number(),
            price_paid: faker.random.number(),
            upfrontPayment: faker.random.arrayElement([true, false]),
            numberAdults: faker.random.number({
                min: 1,
                max: 4
            }),
            numberChildrens: faker.random.number(2),
            createdByAdmin: faker.random.arrayElement([true, false])
        });
    }

    Reservation.insertMany(reservationSeed).then(res => console.log(res));


});