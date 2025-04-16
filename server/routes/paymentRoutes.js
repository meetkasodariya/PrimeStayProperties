// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const passport = require("passport");

// Fetch all payments (Admin-only)
router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  paymentController.getAllPayments
);

module.exports = router;