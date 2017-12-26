const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports = {
  create(req, res, next) {
    Customer.create(req.body)
      .then(customer => res.send(customer))
      .catch(err => {
        console.log(err);
        next;
      });
  },

  edit(req, res, next) {
    const customerId = req.params.id;
    const customerProps = req.body;

    Customer.findByIdAndUpdate(
      { _id: customerId },
      customerProps
    ).then(customer =>
      Customer.findById({ _id: customerId })
        .then(customer => res.send(customer))
        .catch(err => {
          console.log(err);
          next;
        })
    );
  },

  delete(req, res, next) {
    Customer.findByIdAndRemove(req.params.id)
      .then(customer => res.status(204).send(customer))
      .catch(err => {
        console.log(err);
        next;
      });
  },

  getAllCustomers(req, res, next) {
    Customer.find()
      .then(customers => res.send(customers))
      .catch(err => {
        console.log(err);
        next;
      });
  },

  getCustomer(req, res, next) {
    Customer.findById(req.params.id)
      .then(customer => res.send(customer))
      .catch(err => {
        console.log(err);
        next;
      });
  }
};
