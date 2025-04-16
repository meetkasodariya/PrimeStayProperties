// controllers/paymentController.js
const Payment = require("../models/Payment");
const Booking=require("../models/Booking")
// controllers/paymentController.js
exports.getAllPayments = async (req, res) => {
    try {
      const payments = await Payment.find()
        .populate("bookingId", "startDate endDate totalPrice")
        .populate("userId", "name email");
  
      res.status(200).json(payments); // Return the array directly
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ success: false, message: "Failed to fetch payments." });
    }
  };

// Fetch a single payment by ID (Admin-only)
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("bookingId", "startDate endDate totalPrice")
      .populate("userId", "name email");

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found." });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ success: false, message: "Failed to fetch payment." });
  }
};

