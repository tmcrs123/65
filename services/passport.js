/**
 * Passport js Config.
 *
 * PP
 * Passport is what set the cookie in the request!
 *
 * PP
 *
 * Passport is what sets the user in req.user
 */
const passport = require("passport");
const mongoose = require("mongoose");
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const Customer = mongoose.model("customers");

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/redirect"
    },

    //PP8 accessToken - If i do subsequent request to the api I need to give them my access token.
    //If i want to keep using the access token I have to refresh it to prevent it from expiring, hence refresh token
    //profile - what I asked for
    //the done callback passes on the data defined in the second argument
    (accessToken, refreshToken, { id, displayName, emails }, done) => {
      Customer.findOne({ googleId: id }).then(existingCustomer => {
        if (existingCustomer) {
          console.log("Existing customer");
          return done(null, existingCustomer);
        } else {
          console.log("New customer");
          const newCustomer = new Customer({
            name: displayName,
            email: emails[0].value,
            googleId: id
          })
            .save()
            .then(() => done(null, newCustomer));
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
      profileFields: ["id", "displayName", "email"]
    },
    (accessToken, refreshToken, { id, displayName, emails }, done) => {
      Customer.findOne({ facebookId: id }).then(existingCustomer => {
        if (existingCustomer) {
          return done(null, existingCustomer);
        } else {
          const newCustomer = new Customer({
            name: displayName,
            email: emails[0].value,
            facebookId: id
          })
            .save()
            .then(() => done(null, newCustomer));
        }
      });
    }
  )
);

//PP
//first arg to serializeUser is the type model I want to serialize to.
//the second argument to done is the piece of information that identifies the customer in the upcoming requests
//is the mongo ID
//why mongoID? Because different users can login with different oauth providers
//_id:{_oid} --> id --> id === _id._oid -> shortuct!
passport.serializeUser((customer, done) => {
  console.log(customer);
  done(null, customer.id);
});

passport.deserializeUser((id, done) => {
  Customer.findById(id).then(customer => done(null, customer));
});
