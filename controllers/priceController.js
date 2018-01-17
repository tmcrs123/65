const mongoose = require("mongoose");
const DateInterval = mongoose.model("dateIntervals");
const DefaultPrice = mongoose.model("defaultPrice");

module.exports = {
  getDateIntervals(req, res, next) {
    DateInterval.find().then(intervals => res.send(intervals));
  },

  saveDateInterval(req, res, next) {
    new DateInterval(req.body).save().then(() => {
      DateInterval.find().then(intervals => res.send(intervals));
    });
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
    DefaultPrice.findByIdAndUpdate({ _id: req.body.id }, req.body).then(res =>
      res.send(req.body.price)
    );
  }
};
