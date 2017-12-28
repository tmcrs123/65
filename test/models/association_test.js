const assert = require("assert");
const request = require("supertest");
const app = require("../../index.js");
const mongoose = require("mongoose");
const Customer = mongoose.model("customers");
const Reservation = mongoose.model("reservations");

describe("Association test", () => {
  beforeEach(done => {
    testCustomer = new Customer({
      name: "test",
      email: "test@test.com",
      facebookId: "123345"
    });
    testReservation = new Reservation({
      customerId: testCustomer.id,
      startDate: new Date().setHours(0, 0, 0, 0),
      endDate: new Date().addDays(3).setHours(0, 0, 0, 0),
      totalPayment: true
    });

    testCustomer.reservations.push(testReservation);

    Promise.all([testCustomer.save(), testReservation.save()]).then(() =>
      done()
    );
  });

  it("GET to api/customer returns a customer with his reservations", done => {
    request(app)
      .get(`/api/customers/${testCustomer.id}`)
      .end(() => {
        Customer.findOne({ _id: testCustomer.id })
          .populate("reservations")
          .then(customer => {
            assert(customer.reservations[0].customerId == testCustomer.id);
            done();
          });
      });
  });
});
