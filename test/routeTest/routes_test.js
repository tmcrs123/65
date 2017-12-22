const assert = require("assert");
const request = require("supertest");
const app = require("../../index");

describe("Routes access", () => {
  xit("gets root route", () => {
    request(app)
      .get("/")
      .end((err, response) => {
        assert(response.text === "hi there");
      });
  });
});
