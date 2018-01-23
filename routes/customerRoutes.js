/**
 * Customer routes require auth!
 */
const customerController = require("../controllers/customerController.js");
const requireCustomer = require("../middlewares/isCustomer");
const requireAdmin = require("../middlewares/isAdmin");
const requireAuth = require("../middlewares/isAuthenticated");

module.exports = app => {
  app.get(
    "/api/customers",
    requireAdmin.isAdmin,
    customerController.getAllCustomers
  );

  app.get(
    "/api/customers/:id",
    requireAdmin.isAdmin,
    customerController.getPlainCustomer
  );

  app.get(
    "/api/customerReservations/",
    requireCustomer.isCustomer,
    customerController.getCustomerReservations
  );
  app.post(
    "/api/customers/",
    requireAuth.isAuthenticated,
    customerController.create
  );
  app.put(
    "/api/customers/:id",
    requireAuth.isAuthenticated,
    customerController.edit
  );
  app.delete("/api/customers/:id", customerController.delete);
  app.get(
    "/api/search",
    requireAdmin.isAdmin,
    customerController.searchCustomers
  );
};
