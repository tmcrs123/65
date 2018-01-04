const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports.isCustomer = (req, res, next) => {
  if (!req.user) {
    console.log("passing to next");

    res.status(401).send({});
    return;
  }
  Customer.findById(req.user.id).then(customer => {
    if (customer) {
      console.log("passing to next");
      next();
    } else {
      console.log("passing to next");

      res.status(401).send({});
      return;
    }
  });
};
