const mongoose = require("mongoose");
const Admin = mongoose.model("admins");

module.exports.currentAdmin = (req, res, next) => {
  if (!req.user) {
    res.send({});
    return;
  }
  Admin.findById(req.user.id).then(user => {
    if (user) {
      res.send(user);
    } else {
      res.send({});
      return;
    }
  });
};
