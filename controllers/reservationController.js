const mongoose = require("mongoose");
const Reservation = mongoose.model("reservations");

module.exports = {
  getAllReservations(req, res, next) {
    res.send("hi there");
  },

  create(req, res, next) {
    const availableDates = res.locals.availableDates;
    Reservation.create(req.body)
      .then(reservation =>
        res.status(201).send({ reservation, availableDates })
      )
      .catch(err => console.log(err));
  },

  edit(req, res, next) {
    const reservationId = req.params.id;
    const reservationProps = req.body;
    Reservation.findByIdAndUpdate(
      { _id: reservationId },
      reservationProps
    ).then(reservation => {
      Reservation.findById({ _id: reservation.id }).then(reservation => {
        res.send(reservation);
      });
    });
  },

  delete(req, res, next) {
    Reservation.findByIdAndRemove(req.params.id)
      .then(reservation => {
        res.status(204).send(reservation);
        next;
      })
      .catch(err => {
        console.log(err);
        next;
      });
  },

  availableDates(req, res, next) {
    let availableDates = { availableDates: true };
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    let reservationId = req.body.reservationId ? req.body.reservationId : null;

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
