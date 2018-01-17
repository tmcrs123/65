const mongoose = require("mongoose");
const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");
const _ = require("lodash");
const moment = require("moment");

module.exports = {
  /**Reservations for the next month from the date i'm currently in */

  getNextReservations(req, res, next) {
    const today = moment(new Date());
    const oneMonthFromNow = moment(new Date()).add(1, "Month");

    Reservation.find({
        startDate: {
          $gte: today,
          $lte: oneMonthFromNow
        }
      })
      .populate("customer", "name")
      .then(reservations => {
        res.send(reservations);
      });
  },

  getReservationCount(req, res, next) {
    const count = Reservation.count().then(count =>
      res.send({
        totalReservations: count
      })
    );
  },

  getMonthReservationCount(req, res, next) {
    const firstDayMonth = getFirstDayOfMonth()._d;

    const lastDayMonth = getLastDayOfMonth()._d;

    Reservation.find({
      startDate: {
        $gte: firstDayMonth,
        $lte: lastDayMonth
      }
    }).then(reservations => {
      res.send({
        count: reservations.length
      });
    });
  },

  getAllReservations(req, res, next) {
    Reservation.aggregate([{
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer"
        }
      },
      {
        $unwind: "$customer"
      },
      {
        $addFields: {
          customerName: "$customer.name"
        }
      },
      {
        $project: {
          __v: 0,
          customer: 0,
          createdByAdmin: 0,
          upfrontPayment: 0
        }
      }
    ])
    .sort({customerName:1})    
    .then(customers => res.send(customers));
  },

  searchReservationByCustomerName(req, res, next) {
    const name = req.query.name;
    const exp = new RegExp(name, "g");

    Reservation.aggregate([{
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer"
        }
      },
      {
        $match: {
          "customer.name": {
            $regex: exp,
            $options: "i"
          }
        }
      },
      {
        $unwind: "$customer"
      },
      {
        $addFields: {
          customerName: "$customer.name"
        }
      },
      {
        $project: {
          __v: 0,
          customer: 0,
          createdByAdmin: 0,
          upfrontPayment: 0
        }
      }
    ])
    .sort({customerName:1})
    .then(customers => res.send(customers));
  },

  getTotalReservationsValue(req, res, next) {
    Reservation.aggregate({
      $group: {
        _id: "",
        price: {
          $sum: "$price"
        }
      }
    }, {
      $project: {
        _id: 0,
        price: "$price"
      }
    }).then(sum => res.send({
      reservationsTotal: sum[0].price
    }));
  },

  getTotalReservationsValueByStatus(req, res, next) {
    Reservation.aggregate([{
        $match: {
          status: req.params.status
        }
      },
      {
        $group: {
          _id: null,
          price: {
            $sum: "$price"
          }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]).then(sum => res.send({
      [req.params.status]: sum
    }));
  },

  getReservation(req, res, next) {
    const reservationId = req.params.id;
    Reservation.findById({
      _id: reservationId
    }).then(reservation =>
      res.send(reservation)
    );
  },

  create(req, res, next) {
    const availableDates = res.locals.availableDates;
    let reservationCustomer;
    let reservationData;
    let formData = { ...req.body
    };

    console.log("req.body", req.body);

    if (req.body.createdByAdmin) {
      reservationCustomer = req.body.customer;
    } else {
      reservationCustomer = req.user.id;
    }
    reservationData = { ...formData,
      customer: reservationCustomer
    };

    const reservation = new Reservation(reservationData);

    Customer.findById(reservationCustomer).then(customer => {
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
    Reservation.findByIdAndUpdate({
        _id: reservationId
      },
      reservationProps
    ).then(reservation => {
      Reservation.findById({
        _id: reservation.id
      }).then(reservation => {
        res.send(availableDates);
      });
    });
  },

  delete(req, res, next) {
    const reservationId = req.params.id;
    Reservation.findByIdAndRemove(req.params.id)
      .then(reservation => {
        return Customer.findById(reservation.customer);
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
    let availableDates = {
      availableDates: true
    };
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    let reservationId = req.params.id ? req.params.id : null;

    console.log(
      "in available dates the id of the reservation I sent is ",
      reservationId
    );

    Reservation.find({
      $or: [{
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
        availableDates = {
          availableDates: false
        };
        res.send(availableDates);
        return;
      }

      res.locals.availableDates = availableDates;
      next();
    });
  }
};

//helpers

function getFirstDayOfMonth() {
  const today = moment(new Date());
  const currentDay = today.date();
  const firstDayMonth = today
    .subtract(currentDay - 1, "days")
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
  return firstDayMonth;
}

function getLastDayOfMonth() {
  const LastDayMonth = getFirstDayOfMonth().add(1, "Month");
  return LastDayMonth;
}