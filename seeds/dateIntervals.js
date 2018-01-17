const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const faker = require("faker");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

require("../models/DateInterval");

const DateInterval = mongoose.model("dateIntervals");

DateInterval.collection.drop();

let DateIntervalSeed = [];

for (i = 0; i < 3; i++) {
  DateIntervalSeed.push({
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    price: faker.random.number()
  });
}

DateInterval.insertMany(DateIntervalSeed).then(res => console.log(res));
