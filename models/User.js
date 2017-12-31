const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.methods.generateHash = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

userSchema.methods.validPassword = (inputedPassword, dbSavedPassword) => {
  return bcrypt.compareSync(inputedPassword, dbSavedPassword);
};

userSchema.virtual("isAdmin").get(function() {
  return true;
});

mongoose.model("users", userSchema);
