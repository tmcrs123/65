const mongoose = require("mongoose");
const Customer = mongoose.model("customers");
const Admin = mongoose.model("admins");

module.exports.currentUser = (req, res, next) => {
  if (req.user === undefined) {
    res.send({});
    return;
  }

  Customer.findById(req.user.id)
    .populate("reservations")
    .then(customer => {
      if (customer) {
        res.send(customer);
      } else {
        Admin.findById(req.user.id).then(user => {
          if (user) {
            res.send(user);
          } else {
            res.send({});
            return;
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
