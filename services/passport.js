/**
 * Passport js Config.
 *
 */
const passport = require("passport");
const mongoose = require("mongoose");
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const localStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");
const Customer = mongoose.model("customers");
const Admin = mongoose.model("admins");

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/redirect",
      session: false
    },
    (accessToken, refreshToken, { id, displayName, emails }, done) => {
      Customer.findOne({ googleId: id }).then(existingCustomer => {
        if (existingCustomer) {
          return done(null, existingCustomer);
        } else {
          const newCustomer = new Customer({
            name: displayName,
            email: emails[0].value,
            googleId: id
          })
            .save()
            .then(customer => {
              done(null, customer);
              return;
            });
        }
      });
    }
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/redirect",
      profileFields: ["id", "displayName", "email"],
      session: false
    },
    (accessToken, refreshToken, { id, displayName, emails }, done) => {
      Customer.findOne({
        facebookId: id
      }).then(existingCustomer => {
        if (existingCustomer) {
          return done(null, existingCustomer);
        } else {
          const newCustomer = new Customer({
            name: displayName,
            email: emails[0].value,
            facebookId: id
          })
            .save()
            .then(customer => {
              done(null, customer);
            });
        }
      });
    }
  )
);

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      Admin.findOne({ email: email }).then(user => {
        if (user) {
          done(null, user);
        } else {
          const newUser = new Admin();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save().then(() => done(null, newUser));
        }
      });
    }
  )
);

passport.use(
  "local-login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      Admin.findOne({ email }).then(user => {
        if (!user) {
          console.log("No user found");
          return done(null, false);
        }

        if (!user.validPassword(password, user.password)) {
          console.log("Admin password is invalid");
          return done(null, false);
        }
        console.log("Valid admin!");
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((customerOrUser, done) => {
  console.log("in serialize cistomer is", customerOrUser);
  done(null, customerOrUser.id);
});

passport.deserializeUser((id, done) => {
  Customer.findById(id).then(customer => {
    if (customer) {
      console.log("this req found a customer");
      return done(null, customer);
    }
    Admin.findById(id).then(user => {
      console.log("this req found a admin");
      return done(null, user);
    });
  });
});
