const mongoose = require("mongoose");
const DateInterval = mongoose.model("dateIntervals");

module.exports = {
  getDateIntervals(req, res, next) {
    DateInterval.find().then(intervals => res.send(intervals));
  },

  saveDateInterval(req, res, next) {
    new DateInterval(req.body)
      .save()
      .then(() => res.status(201).send({ created: true }));
  },

  deleteDateInterval(req, res, next) {
    DateInterval.findByIdAndRemove(req.params.id).then(() =>
      res.status(204).send({ deleted: true })
    );
  }
};
