const passport = require("passport");
const path = require("path");
const { currentAdmin } = require("../middlewares/currentAdmin.js");
const { currentCustomer } = require("../middlewares/currentCustomer.js");
const { isCustomer } = require("../middlewares/isCustomer.js");
const { isAdmin } = require("../middlewares/isAdmin.js");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false
    })
  );

  app.get(
    "/auth/google/redirect",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/customerDashboard");
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile"],
      session: false
    })
  );

  app.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/customerDashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/session", (req, res) => {
    let usr;

    if (Boolean(req.user)) {
      usr = req.user;
    } else {
      usr = null;
    }

    res.json(Object.assign({}, req.session, usr, req.cookies));
  });

  /**
   * User creating
   */

  app.get("/admin/create", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/addUserForm.html"));
  });

  app.post(
    "/admin/create",
    passport.authenticate("local-signup"),
    (req, res) => {
      res.send("here");
    }
  );

  app.get("/admin/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/loginUserForm.html"));
  });

  app.post(
    "/api/admin/login",
    passport.authenticate("local-login"),
    (req, res) => {
      res.send({ userId: req.user._id, isAdmin: req.user.isAdmin });
    }
  );

  app.get("/admin/dashboard", currentAdmin, (req, res) => {
    res.send("admin enpoint");
  });

  app.get("/customer/dashboard", isCustomer, (req, res) => {
    res.send("customer endpoint");
  });

  app.get("/api/current_customer", currentCustomer);

  app.get("/api/current_admin", currentAdmin);
};
