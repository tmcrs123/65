const priceController = require("../controllers/priceController");
const requireCustomer = require("../middlewares/isCustomer");
const requireAdmin = require("../middlewares/isAdmin");
const requireAuth = require("../middlewares/isAuthenticated");

module.exports = app => {
  app.get(
    "/api/dateIntervals",
    requireAdmin.isAdmin,
    priceController.getDateIntervals
  );
  app.post(
    "/api/dateIntervals",
    requireAdmin.isAdmin,
    priceController.availableDates,
    priceController.saveDateInterval
  );
  app.delete(
    "/api/dateIntervals/:id",
    requireAdmin.isAdmin,
    priceController.deleteDateInterval
  );
  app.get(
    "/api/defaultPrice",
    requireAdmin.isAdmin,
    priceController.getDefaultPrice
  );
  app.post(
    "/api/defaultPrice",
    requireAdmin.isAdmin,
    priceController.updateDefaultPrice
  );
  app.post(
    "/api/calculatePrice",
    requireAuth.isAuthenticated,
    priceController.calculateDatesPrice
  );
  app.get(
    "/api/margin",
    requireAuth.isAuthenticated,
    priceController.getMargin
  );
  app.post("/api/margin", requireAdmin.isAdmin, priceController.updateMargin);
};
