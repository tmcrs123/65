const mongoose = require("mongoose");
const Admin = mongoose.model("admins");

module.exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ error: "You must be logged in to do that." });
    return;
  }
  Admin.findById(req.user.id).then(user => {
    if (user) {
      next();
    } else {
      res.status(401).send({ error: "You dont have permission to do that." });
      return;
    }
  });
};
