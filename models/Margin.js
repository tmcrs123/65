const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarginSchema = new Schema({
  margin: {
    type: Number,
    required: "You must supply a price margin."
  }
});

mongoose.model("margin", MarginSchema);
