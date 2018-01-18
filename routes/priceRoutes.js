const priceController = require("../controllers/priceController");

module.exports = app => {
  app.get("/api/dateIntervals", priceController.getDateIntervals);
  app.post(
    "/api/dateIntervals",
    priceController.availableDates,
    priceController.saveDateInterval
  );
  app.delete("/api/dateIntervals/:id", priceController.deleteDateInterval);
  app.get("/api/defaultPrice", priceController.getDefaultPrice);
  app.post("/api/defaultPrice", priceController.updateDefaultPrice);
};
