const mongoose = require("mongoose");
const assert = require("assert");
const request = require("supertest");
const app = require("../../index.js");
const Customer = mongoose.model("customers");
const testCustomerBody = {
  name: "Test Customer",
  email: "test@customer.com",
  googleId: "123456",
  facebookId: "123456",
  phone: "210216982",
  notes: "A test customer",
  blacklisted: false
};

describe("Customer controller methods", () => {
  it("POST to /api/customers creates a new customer", done => {
    Customer.count().then(count => {
      request(app)
        .post("/api/customers")
        .send(testCustomerBody)
        .end(() => {
          Customer.count().then(newCount => {
            assert(newCount > count);
            done();
          });
        });
    });
  });

  it("PUT to /api/customers edits an existing customer", done => {
    const testCustomer = new Customer(testCustomerBody);
    testCustomer.save().then(customer => {
      request(app)
        .put(`/api/customers/${customer.id}`)
        .send({ blacklisted: true })
        .end(() => {
          Customer.findById(customer.id).then(customer => {
            assert(customer.blacklisted === true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/customers deletes an existing customer", done => {
    const testCustomer = new Customer(testCustomerBody);
    testCustomer.save().then(() => {
      request(app)
        .delete(`/api/customers/${testCustomer.id}`)
        .end(() => {
          Customer.findById(testCustomer.id).then(customer => {
            assert(customer === null);
            done();
          });
        });
    });
  });

  it("GET to /api/customers gets all existing customers", done => {
    const testCustomer = new Customer(testCustomerBody);
    testCustomer.save().then(() => {
      request(app)
        .get("/api/customers")
        .end(() => {
          Customer.count().then(count => {
            assert(count === 1);
            done();
          });
        });
    });
  });

  it("GET to api/customers gets a specific customer", done => {
    const testCustomer = new Customer(testCustomerBody);
    testCustomer.save().then(() => {
      request(app)
        .get(`/api/customer/${testCustomer.id}`)
        .end(() => {
          Customer.findById(testCustomer.id).then(customer => {
            assert(customer.id === testCustomer.id);
            done();
          });
        });
    });
  });
});
