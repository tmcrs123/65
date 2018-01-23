const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports.isCustomer = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({});
    return;
  }
  Customer.findById(req.user.id).then(customer => {
    if (customer) {
      next();
    } else {
      res.status(401).send({});
      return;
    }
  });
};
