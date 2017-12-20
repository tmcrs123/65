const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
  facebookId: String
});

mongoose.model("customers", customerSchema);
