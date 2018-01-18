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
  app.post("/api/calculatePrice", priceController.calculateDatesPrice);
  app.get("/api/margin", priceController.getMargin);
  app.post("/api/margin", priceController.updateMargin);
};
