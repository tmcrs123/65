const reservationController = require("../controllers/reservationController.js");

module.exports = app => {
  app.get("/api/reservations", reservationController.getAllReservations);
  app.get("/api/reservations/:id", reservationController.getReservation);
  app.post(
    "/api/reservations",
    reservationController.availableDates,
    reservationController.create
  );
  app.put(
    "/api/reservations/:id",
    reservationController.availableDates,
    reservationController.edit
  );
  app.delete("/api/reservations/:id", reservationController.delete);
  app.post(
    "/api/reservations/availability",
    reservationController.availableDates
  );
};
