const passport = require("passport");
const path = require("path");
const { isCustomer } = require("../middlewares/isCustomer.js");
const { currentUser } = require("../middlewares/currentUser");
const { isAdmin } = require("../middlewares/isAdmin.js");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/redirect",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/customer/dashboard/landing");
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  app.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/customer/dashboard/landing");
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

  app.get("/api/user", currentUser);
};
