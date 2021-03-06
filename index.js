const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const PORT = process.env.PORT || 8080;
const keys = require("./config/keys");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// //register schemas with mongoose - Remember this needs to come before requiring passport
require("./models/Customer");
require("./models/Admin");
require("./models/Reservation");
require("./models/DateInterval");
require("./models/DefaultPrice");
require("./models/Margin");

//load all passaport strategies
require("./services/passport");

const app = express();

// //connect to mongo
//PP explain why I need this check here and where do I set the env variable
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV != "test") {
  mongoose.connect(keys.mongoURI);
}

// //middleware - PP explain this!
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //dafuq is this?

app.use(cookieParser());

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
require("./routes/customerRoutes.js")(app);
require("./routes/reservationRoutes.js")(app);
require("./routes/priceRoutes.js")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
