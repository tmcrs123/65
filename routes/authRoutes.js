const passport = require("passport");
const path = require("path");
const isAdmin = require("../middlewares/isAdmin.js");

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
      res.redirect("/welcomeGoogle");
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
      res.redirect("/welcomeFacebook");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(`You are now logged out!`);
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

  app.get("/api/whoami", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.send("A boy has no name...");
    }
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
    "/admin/login",
    passport.authenticate("local-login", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/"
    })
  );

  app.get("/admin/dashboard", isAdmin, (req, res) => {
    res.send("admin endpoint");
  });
};
