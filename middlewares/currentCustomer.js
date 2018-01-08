const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports.currentCustomer = (req, res, next) => {
  if (!req.user) {
    res.send({});
    return;
  }
  Customer.findById(req.user.id)
    .populate("reservations")
    .then(customer => {
      if (customer) {
        res.send(customer);
      } else {
        res.send({});
        return;
      }
    });
};
