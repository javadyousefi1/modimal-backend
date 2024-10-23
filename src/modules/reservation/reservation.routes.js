// multer
const multer = require('multer');
// router
const router = require("express").Router();
// controllers
const { ReservationController } = require("./reservation.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")


router.post("/create-reservation", ReservationController.addNewReservation)
router.get("/get-all-reservations", ReservationController.getAllReservations)
router.put("/update-reservation",  ReservationController.updateReservation)
router.delete("/delete-reservation", ReservationController.deleteReservations)
router.get("/get-reservation-byId", ReservationController.getReservationById)

module.exports = {
    reservationRoutes: router
}