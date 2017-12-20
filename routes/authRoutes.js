const passport = require("passport");
const path = require("path");

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
      res.redirect("/welcomeGoogle");
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["public_profile"] })
  );

  app.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/welcomeFacebook");
    }
  );

  //PP passport also adds other helper functions to handle auth to the req object
  //kills the cookie and destroys req.user!
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(`You are now logged out!`);
  });

  app.get("/api/session", (req, res) => {
    let usr;

    if (Boolean(req.user)) {
      usr = req.usr;
    } else {
      usr = null;
    }

    res.json(Object.assign({}, req.session, usr, req.cookies));
  });

  app.get("/api/whoami", (req, res) => {
    if (req.user) {
      res.send(req.user.name);
    } else {
      res.send("A boy has no name...");
    }
  });

  /**
   * User creating
   */

  app.get("/admin/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/addUserForm.html"));
  });

  app.post("/admin/login", passport.authenticate("local"), (req, res) => {
    res.send("here");
  });
};
