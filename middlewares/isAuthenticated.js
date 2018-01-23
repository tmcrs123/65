module.exports.isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ error: "You must be logged in to do that." });
    return;
  } else {
    next();
  }
};
