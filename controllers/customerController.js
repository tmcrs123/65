const mongoose = require("mongoose");
const Customer = mongoose.model("customers");
const Reservation = mongoose.model("reservations");

module.exports = {
  create(req, res, next) {
    Customer.findOne({ email: req.body.email }).then(customer => {
      if (customer) {
        res.send({
          customerAlreadyExistsError:
            "A customer with that email already exists."
        });
        return;
      } else {
        Customer.create(req.body)
          .then(customer => res.send(customer))
          .catch(err => {
            console.log(err);
            next;
          });
      }
    });
  },

  edit(req, res, next) {
    const customerId = req.params.id;
    const customerProps = req.body;

    Customer.findByIdAndUpdate({ _id: customerId }, customerProps).then(
      customer =>
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
    Customer.aggregate([{ $project: { __v: 0 } }])
      .sort({ name: 1 })
      .then(customers => res.send(customers));
  },

  getCustomer(req, res, next) {
    Customer.findById(req.params.id)
      .populate("reservations")
      .then(customer => {
        res.send(customer);
      })
      .catch(err => {
        console.log(err);
        next;
      });
  },

  //customer without populating reservations
  getPlainCustomer(req, res, next) {
    Customer.findById(req.params.id)
      .then(customer => {
        res.send(customer);
      })
      .catch(err => {
        console.log(err);
        next;
      });
  },

  getCustomerReservations(req, res, next) {
    Reservation.find({ customer: req.user }).then(reservations => {
      res.send(reservations);
    });
  },

  searchCustomers(req, res, next) {
    const name = req.query.name;
    const exp = new RegExp(name, "g");

    Customer.aggregate([
      { $match: { name: { $regex: exp, $options: "i" } } },
      { $project: { __v: 0 } }
    ])
      .sort({ name: 1 })
      .then(customers => res.send(customers));
  }
};
