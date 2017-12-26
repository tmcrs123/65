/**
 * Customer routes require auth!
 */
const customerController = require("../controllers/customerController.js");

module.exports = app => {
  app.get("api/customers", customerController.getAllCustomers);
  app.get("/api/customers/:id", customerController.getCustomer);
  app.post("/api/customers/", customerController.create);
  app.put("/api/customers/:id", customerController.edit);
  app.delete("/api/customers/:id", customerController.delete);
};
