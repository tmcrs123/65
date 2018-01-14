const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const faker = require("faker");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

require("../models/Customer.js");

const Customer = mongoose.model("customers");

Customer.collection.drop();

let customersSeed = [];

for (i = 0; i < 63; i++) {
  customersSeed.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    blacklisted: faker.random.arrayElement([true, false]),
    notes: faker.random.words(20)
  });
}

Customer.insertMany(customersSeed).then(res => console.log(res));
