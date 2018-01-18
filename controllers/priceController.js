const mongoose = require("mongoose");
const DateInterval = mongoose.model("dateIntervals");
const DefaultPrice = mongoose.model("defaultPrice");
const moment = require("moment");

module.exports = {
  getDateIntervals(req, res, next) {
    DateInterval.find()
      .sort({ startDate: 1 })
      .then(intervals => res.send(intervals));
  },

  saveDateInterval(req, res, next) {
    const availableDates = res.locals.availableDates;
    if (availableDates) {
      new DateInterval(req.body).save().then(() => {
        DateInterval.find().then(intervals =>
          res.send({ intervals, availableDates })
        );
      });
      return;
    } else {
      res.send({ availableDates: res.locals.availablesDates });
    }
  },

  deleteDateInterval(req, res, next) {
    DateInterval.findByIdAndRemove(req.params.id).then(() =>
      res.status(204).send({ deleted: true })
    );
  },

  getDefaultPrice(req, res, next) {
    DefaultPrice.find().then(price => res.send(price[0]));
  },

  updateDefaultPrice(req, res, next) {
    DefaultPrice.findOneAndUpdate({ _id: req.body._id }, req.body).then(price =>
      res.send(price)
    );
  },

  availableDates(req, res, next) {
    let availableDates = true;
    const sDate = new Date(req.body.startDate);
    const eDate = new Date(req.body.endDate);

    DateInterval.aggregate([
      {
        $match: {
          $or: [
            { startDate: { $gte: sDate, $lt: eDate } },
            { endDate: { $gte: sDate, $lt: eDate } },
            { startDate: { $lt: sDate }, endDate: { $gt: eDate } }
          ]
        }
      }
    ]).then(dbDateIntervals => {
      dbDateIntervals.length >= 1 ? (availableDates = false) : availableDates;
      res.locals.availableDates = availableDates;
      next();
    });
  },

  calculateDatesPrice(req, res, next) {
    const startDate = moment(req.body.startDate);
    const endDate = moment(req.body.endDate);
    const dates = [];
    let finalPrice = 0;

    if (startDate > endDate) {
      res
        .status(400)
        .send({
          price: 0,
          error: "Start date cannot be a date after end date."
        });
      return;
    }

    while (startDate < endDate) {
      dates.push(moment(startDate));
      startDate.add(1, "days");
    }
    const defaultPricePromise = DefaultPrice.find();
    const intervalsPromise = DateInterval.find();

    Promise.all([defaultPricePromise, intervalsPromise])
      .then(response => {
        return response;
      })
      .then(response => {
        const defaultPrice = response[0][0].price;
        const intervals = response[1];

        dates.forEach(date => {
          intervals.forEach(interval => {
            if (
              date >= moment(interval.startDate) &&
              date < moment(interval.endDate)
            ) {
              finalPrice = finalPrice + interval.price;
            } else {
              finalPrice = finalPrice + defaultPrice;
            }
          });
        });

        res.status(200).send({ price: finalPrice });
      });
  }
};
