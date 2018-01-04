/**
 * Customer routes require auth!
 */
const customerController = require("../controllers/customerController.js");
const { isCustomer } = require("../middlewares/isCustomer.js");

module.exports = app => {
  app.get("/api/customers", customerController.getAllCustomers);
  app.get("/api/customers/:id", customerController.getCustomer);
  app.get(
    "/api/customerReservations/",
    customerController.getCustomerReservations
  );
  app.post("/api/customers/", customerController.create);
  app.put("/api/customers/:id", customerController.edit);
  app.delete("/api/customers/:id", customerController.delete);
};
