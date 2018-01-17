const mongoose = require("mongoose");
const keys = require("../config/keys.js");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

require("../models/DefaultPrice");

const DefaultPrice = mongoose.model("defaultPrice");

DefaultPrice.collection.drop();

new DefaultPrice({ price: 100 }).save().then(res => console.log(res));
