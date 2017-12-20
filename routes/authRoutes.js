const passport = require("passport");

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

  app.get("/api/whoami", (req, res) => {
    if (req.user) {
      res.send(req.user.name);
    } else {
      res.send("A boy has no name...");
    }
  });
};
