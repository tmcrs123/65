const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("You must be logged in to do that.");
    return;
  }
  User.findById(req.user.id).then(user => {
    console.log("Found a user in admin auth", user);
    if (user) {
      next();
    } else {
      res.status(401).send("You must be an admin to do that.");
    }
  });
};
