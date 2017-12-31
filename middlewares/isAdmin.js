const mongoose = require("mongoose");
const User = mongoose.model("users");
const Customer = mongoose.model("customers");

module.exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("You must be logged in to do that.");
    return;
  }
  User.findById(req.user.id).then(user => {
    if (user) {
      next();
    } else {
      res.status(401).send("You must be an admin to do that.");
      return;
    }
  });
};

module.exports.isCustomer = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("You must be logged in to do that.");
    return;
  }
  Customer.findById(req.user.id).then(customer => {
    if (customer) {
      next();
    } else {
      res.status(401).send("You must be a customer to do that.");
      return;
    }
  });
};
