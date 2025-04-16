const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { protect } = require("../middlewares/authMiddleware"); 
// Create a new booking (protected route)
router.post(
  "/", protect,bookingController.createBooking
);
router.get("/user", protect,bookingController.getBookings);
router.get("/", bookingController.getAllBookings);
router.put("/:id/confirm", bookingController.confirmBooking);
router.put("/:id/cancel", bookingController.cancelBooking);
router.get("/:bookingId", protect,bookingController.getBookingById);
router.post("/:bookingId/pay", protect, bookingController.processFakePayment);
module.exports = router;