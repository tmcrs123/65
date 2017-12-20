const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const PORT = process.env.PORT || 8080;
const keys = require("./config/keys");
const mongoose = require("mongoose");

// //register schemas with mongoose - Remember this needs to come before requiring passport
require("./models/Customer");

//load all passaport strategies
require("./services/passport");

const app = express();

// //connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// //middleware
// app.use(bodyParser.json());

//this tells express that it needs to make use of cookies/enable cookies
//This middleware will attach the property session to req, which provides an object representing the loaded session.
app.use(
  cookieSession({
    name: "65React",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in miliseconds
    keys: [keys.cookieKey]
  })
);

//PP - tell express to use passport
app.use(passport.initialize());

//PP - tell passport to keep track of user auth state using cookies
app.use(passport.session());

//routes
require("./routes/authRoutes")(app);

app.get("/", (req, res) => {
  res.send("hi there");
});

app.get("/welcomeGoogle", (req, res) => {
  console.log(req.session);
  res.send(`Welcome from GOOGLE ${req.user.name}!`);
});

app.get("/welcomeFacebook", (req, res) => {
  console.log(req.session);
  res.send(`Welcome from FACEBOOK ${req.user.name}!`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
