/**
 * connect to test database and drop collections if needed
 */
const mongoose = require("mongoose");
const keys = require("../config/keys");

/**
 * Before starting testing connect to the database
 */
before(done => {
  mongoose.connect(keys.mongoURI);
  mongoose.connection
    .once("open", () => {
      console.log("connected to test database");
      done();
    })
    .on("error", error => console.warn("Error!", error));
});

beforeEach(done => {
  const { customers } = mongoose.connection.collections;
  customers
    .drop()
    .then(() => {
      console.log("dropped customers collection");
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
});
