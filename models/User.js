const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: String,
  password: String
});

userSchema.methods.generateHash = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

userSchema.methods.validatePassword = password => {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model("users", userSchema);
