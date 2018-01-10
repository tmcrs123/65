const mongoose = require("mongoose");
const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");
const _ = require("lodash");

module.exports = {
  getAllReservations(req, res, next) {
    Reservation.find().then(reservations => res.send(reservations));
  },

  getReservation(req, res, next) {
    const reservationId = req.params.id;
    Reservation.findById({ _id: reservationId }).then(reservation =>
      res.send(reservation)
    );
  },

  create(req, res, next) {
    const availableDates = res.locals.availableDates;
    let customerId;
    let reservationData;
    let formData = { ...req.body };

    if (req.body.createdByCustomer) {
      customerId = req.user.id;
    } else {
      customerId = req.body.customerId;
    }
    reservationData = { ...formData, customerId };

    const reservation = new Reservation(reservationData);

    Customer.findById(customerId).then(customer => {
      customer.reservations.push(reservation.id);
      reservation
        .save()
        .then(() => {
          customer.save().then(() => {
            res.status(201).send(availableDates);
          });
        })
        .catch(err => console.log(err));
    });
  },

  edit(req, res, next) {
    const availableDates = res.locals.availableDates;
    console.log("got info that dates are", availableDates);
    const reservationId = req.params.id;
    const reservationProps = req.body;
    Reservation.findByIdAndUpdate(
      { _id: reservationId },
      reservationProps
    ).then(reservation => {
      Reservation.findById({ _id: reservation.id }).then(reservation => {
        res.send(availableDates);
      });
    });
  },

  delete(req, res, next) {
    const reservationId = req.params.id;
    Reservation.findByIdAndRemove(req.params.id)
      .then(reservation => {
        return Customer.findById(reservation.customerId);
      })
      .then(customer => {
        customer.reservations.pull(reservationId);
        return customer.save();
      })
      .then(() => res.status(204).send(""))
      .catch(err => {
        console.log(err);
        next;
      });
  },

  availableDates(req, res, next) {
    let availableDates = { availableDates: true };
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    let reservationId = req.params.id ? req.params.id : null;

    console.log(
      "in available dates the id of the reservation I sent is ",
      reservationId
    );

    Reservation.find({
      $or: [
        {
          startDate: {
            $gte: startDate,
            $lt: endDate
          }
        },
        {
          endDate: {
            $gt: startDate,
            $lt: endDate
          }
        },
        {
          startDate: {
            $lt: startDate
          },
          endDate: {
            $gt: endDate
          }
        }
      ]
    }).then(dbReservations => {
      //If i return exactly one reservation from the DB I need to check if the reservation I'm returning is not the one I'm editing
      if (
        dbReservations.length === 1 &&
        dbReservations[0].id === reservationId
      ) {
        console.log(
          "The id of the reservation I found is",
          dbReservations[0].id
        );
        res.locals.availableDates = availableDates;
        next();
        return;
      }

      // if return something that is not a reservation I'm editing then dates are unavailable
      if (dbReservations.length > 0) {
        availableDates = { availableDates: false };
        res.send(availableDates);
        return;
      }

      res.locals.availableDates = availableDates;
      next();
    });
  }
};
