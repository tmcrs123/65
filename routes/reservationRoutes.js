const reservationController = require("../controllers/reservationController.js");
const requireAdmin = require("../middlewares/isAdmin");
const requireCustomer = require("../middlewares/isCustomer");
const requireAuth = require("../middlewares/isAuthenticated");

module.exports = app => {
  app.get(
    "/api/reservations",
    requireAdmin.isAdmin,
    reservationController.getAllReservations
  );
  //this one needs both auth's
  app.get(
    "/api/reservations/:id",
    requireAuth.isAuthenticated,
    reservationController.getReservation
  );
  app.post(
    "/api/reservations",
    requireAuth.isAuthenticated,
    reservationController.availableDates,
    reservationController.create
  );
  app.put(
    "/api/reservations/:id",
    requireAuth.isAuthenticated,
    reservationController.availableDates,
    reservationController.edit
  );
  app.delete("/api/reservations/:id", reservationController.delete);
  app.post(
    "/api/availability",
    requireAuth.isAuthenticated,
    reservationController.availability
  );

  app.get("/api/price", (req, res) => res.send({ price: Math.random() * 11 }));

  app.get(
    "/api/nextReservations",
    requireAdmin.isAdmin,
    reservationController.getNextReservations
  );
  app.get(
    "/api/reservationsCount",
    requireAdmin.isAdmin,
    reservationController.getReservationCount
  );
  app.get(
    "/api/reservationsCountMonth",
    requireAdmin.isAdmin,
    reservationController.getMonthReservationCount
  );
  app.get(
    "/api/reservationsTotalValue",
    requireAdmin.isAdmin,
    reservationController.getTotalReservationsValue
  );
  app.get(
    "/api/reservationsTotalValue/:status",
    requireAdmin.isAdmin,
    reservationController.getTotalReservationsValueByStatus
  );

  app.get(
    "/api/reservationSearch",
    requireAdmin.isAdmin,
    reservationController.searchReservationByCustomerName
  );

  app.get(
    "/api/currentReservationCustomer",
    requireAdmin.isAdmin,
    reservationController.currentReservationCustomer
  );
};
