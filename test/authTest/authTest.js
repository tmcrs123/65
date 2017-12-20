const mongoose = require("mongoose");
const assert = require("assert");
const request = require("supertest");
const app = require("../../index");

describe("authentication flow", () => {
  xit("allows a user logging in with Google", () => {
    request(app)
      .get("/auth/google")
      .end((err, response) => {
        console.log("end");
      });
  });
});
