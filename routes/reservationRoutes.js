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
  app.post("/api/availability", reservationController.availability);

  app.get("/api/price", (req, res) => res.send({ price: Math.random() * 11 }));

  app.get("/api/nextReservations", reservationController.getNextReservations);
  app.get("/api/reservationsCount", reservationController.getReservationCount);
  app.get(
    "/api/reservationsCountMonth",
    reservationController.getMonthReservationCount
  );
  app.get(
    "/api/reservationsTotalValue",
    reservationController.getTotalReservationsValue
  );
  app.get(
    "/api/reservationsTotalValue/:status",
    reservationController.getTotalReservationsValueByStatus
  );

  app.get(
    "/api/reservationSearch",
    reservationController.searchReservationByCustomerName
  );

  app.get(
    "/api/currentReservationCustomer",
    reservationController.currentReservationCustomer
  );
};
