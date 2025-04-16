const User = require("../models/User");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Ensure paymentStatus values match your database entries
    const successfulPayments = await Payment.countDocuments();
    res.status(200).json({
      totalUsers,
      totalListings,
      totalBookings,
      successfulPayments,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getDashboardStats };
