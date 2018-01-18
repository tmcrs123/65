const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const faker = require("faker");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

require("../models/Margin.js");

const Margin = mongoose.model("margin");

Margin.collection.drop();

new Margin({ margin: 0.1 }).save().then(() => console.log("saved"));
