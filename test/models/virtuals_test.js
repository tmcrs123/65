const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");
const app = require("../../index.js");

describe("Virtuals test", () => {
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
      ValuePaid: 100,
      TotalValue: 500,
      totalPayment: true
    });

    testCustomer.reservations.push(testReservation);

    Promise.all([testCustomer.save(), testReservation.save()]).then(() =>
      done()
    );
  });

  it("GET to api/reservations returns a reservation with virtual fields", done => {
    request(app)
      .get(`/api/reservations/${testReservation.id}`)
      .end(() => {
        Reservation.findById({ _id: testReservation.id }).then(reservation => {
          assert(reservation.ValueLeftToPay === 400);
          done();
        });
      });
  });
});
