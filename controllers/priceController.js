const mongoose = require("mongoose");
const DateInterval = mongoose.model("dateIntervals");
const DefaultPrice = mongoose.model("defaultPrice");

module.exports = {
  getDateIntervals(req, res, next) {
    DateInterval.find().then(intervals => res.send(intervals));
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
    console.log("req", req.body);
    DefaultPrice.findOneAndUpdate({ _id: req.body._id }, req.body).then(price =>
      res.send(price)
    );
  },

  availableDates(req, res, next) {
    console.log("req.body", req.body);
    let availableDates = true;
    const sDate = new Date(req.body.startDate);
    const eDate = new Date(req.body.endDate);

    // DateInterval.find({
    //   $or: [
    //     {
    //       startDate: {
    //         $gte: startDate,
    //         $lte: endDate
    //       }
    //     },
    //     {
    //       endDate: {
    //         $gte: startDate,
    //         $lte: endDate
    //       }
    //     }
    // {
    //   startDate: {
    //     $lt: startDate
    //   },
    //   endDate: {
    //     $gt: endDate
    //   }
    // }
    //   ]
    // })
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
      console.log("got from db", dbDateIntervals);
      dbDateIntervals.length === 1 ? (availableDates = false) : availableDates;
      res.locals.availableDates = availableDates;
      next();
    });
  }
};
