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
  const { customers, reservations } = mongoose.connection.collections;

  customers.drop(() => {
    reservations.drop(() => {
      done();
    });
  });
});
