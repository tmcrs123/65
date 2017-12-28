const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const Reservation = mongoose.model("reservations");
const Customer = mongoose.model("customers");
const app = require("../../index.js");

describe("Reservation Controller", () => {
  Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let testCustomer, testReservation;

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

    Promise.all([testCustomer.save(), testReservation.save()]).then(() =>
      done()
    );
  });

  describe("Create,Read, Update and Delete reservations", () => {
    it("POST to api/reservations creates a new reservation", done => {
      const testReservation2 = new Reservation({
        customerId: testCustomer.id,
        startDate: new Date().setHours(0, 0, 0, 0),
        endDate: new Date().setHours(0, 0, 0, 0),
        totalPayment: false
      });

      Reservation.count().then(count => {
        request(app)
          .post("/api/reservations")
          .send(testReservation2)
          .end(() => {
            Reservation.count().then(newCount => {
              assert(newCount > count);
              done();
            });
          });
      });
    });

    it("PUT to api/reservations edits an existing reservation", done => {
      request(app)
        .put(`/api/reservations/${testReservation.id}`)
        .send({ numberAdults: 20 })
        .end(() => {
          Reservation.findById({
            _id: testReservation.id
          }).then(reservation => {
            assert(reservation.numberAdults === 20);
            done();
          });
        });
    });

    it("DELETE to /api/reservations deletes an existing reservation", done => {
      request(app)
        .delete(`/api/reservations/${testReservation.id}`)
        .end(() => {
          Reservation.findById(testReservation.id).then(reservation => {
            assert(reservation === null);
            done();
          });
        });
    });
  });

  describe("Check reservation dates availability", () => {
    function datesValidationTest(
      startDaysToAdd,
      endDaysToAdd,
      desiredAssertionTestResult,
      done
    ) {
      const reservation = Reservation.create({
        customerId: testCustomer.id,
        startDate: new Date().addDays(startDaysToAdd).setHours(0, 0, 0, 0),
        endDate: new Date().addDays(endDaysToAdd).setHours(0, 0, 0, 0),
        totalPayment: false
      }).then(reservation => {
        request(app)
          .post("/api/reservations/availability")
          .send({
            startDate: reservation.startDate,
            endDate: reservation.endDate
          })
          .end((err, res) => {
            assert(res.body.availableDates === desiredAssertionTestResult);
            done();
          });
      });
    }

    it("Blocks creation when new res. start date is after existing res. startDate", done => {
      datesValidationTest(1, 5, false, done);
    });

    it("Blocks creation when new res. end date is before existing res. endDate", done => {
      datesValidationTest(-10, 1, false, done);
    });

    it("Blocks creation when new res. dates are between an existing res. dates", done => {
      datesValidationTest(1, 2, false, done);
    });

    it("Blocks creation when new res. dates are overlapping an existing res. dates", done => {
      datesValidationTest(-10, 20, false, done);
    });

    it("Blocks creation when new res. dates are equal to existing res.dates", done => {
      datesValidationTest(0, 3, false, done);
    });

    it("Blocks when updating a existing reservation to a date which is not available", done => {
      Reservation.create({
        customerId: testCustomer.id,
        startDate: new Date().addDays(10).setHours(0, 0, 0, 0),
        endDate: new Date().addDays(20).setHours(0, 0, 0, 0),
        totalPayment: true
      }).then(reservation => {
        request(app)
          .put(`/api/reservations/${reservation.id}`)
          .send({
            startDate: new Date().setHours(0, 0, 0, 0),
            endDate: reservation.endDate
          })
          .end((err, res) => {
            assert(res.body.availableDates === false);
            done();
          });
      });
    });

    it("Allows changing a reservation to an available date", done => {
      Reservation.create({
        customerId: testCustomer.id,
        startDate: new Date().addDays(10).setHours(0, 0, 0, 0),
        endDate: new Date().addDays(20).setHours(0, 0, 0, 0),
        totalPayment: true
      }).then(reservation => {
        request(app)
          .put(`/api/reservations/${reservation.id}`)
          .send({
            startDate: reservation.startDate,
            endDate: reservation.endDate.addDays(3),
            reservationId: reservation.id
          })
          .end(() => {
            Reservation.findById({ _id: reservation.id }).then(reservation => {
              const testDate = new Date().addDays(23).setHours(0, 0, 0, 0);
              assert(reservation.endDate.valueOf() === testDate);
              done();
            });
          });
      });
    });
  });
});
