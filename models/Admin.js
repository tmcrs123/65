const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const adminSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

adminSchema.methods.generateHash = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

adminSchema.methods.validPassword = (inputedPassword, dbSavedPassword) => {
  return bcrypt.compareSync(inputedPassword, dbSavedPassword);
};

adminSchema.virtual("isAdmin").get(function() {
  return true;
});

mongoose.model("admins", adminSchema);
