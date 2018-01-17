const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultPriceSchema = new Schema({
  price: {
    type: Number,
    required: true
  }
});

mongoose.model("defaultPrice", defaultPriceSchema);
