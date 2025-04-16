// server/controllers/bookingController.js
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const Payment=require("../models/Payment")
// Create a new booking (User-side)
exports.createBooking = async (req, res) => {
  try {
    const { startDate, endDate, listing: listingId, totalPrice, paymentMethod } = req.body;

    // Validate required fields
    if (!startDate || !endDate || !listingId || !totalPrice || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    // Create the booking with status "processing"
    const booking = new Booking({
      startDate,
      endDate,
      listing: listingId,
      totalPrice,
      paymentMethod,
      user: req.user._id, // Assuming user ID is available in req.user
      status: "processing", // Default status
    });

    await booking.save();

    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking." });
  }
};

// Fetch bookings for a specific user (User-side)
exports.getBookings =async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request
    const bookings = await Booking.find({ user: userId })
      .populate("user", "name email")
      .populate("listing", "title image");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

// Fetch all bookings (Admin-side)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("listing", "title")
      .populate("user", "name");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

// Confirm a booking (Admin-side)
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking confirmed successfully!", booking });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ message: "Failed to confirm booking." });
  }
};
 
// Add this new method to your bookingController.js
exports.generateInvoice = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("listing", "title city country")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Create invoice data
    const invoiceData = {
      invoiceNumber: `INV-${booking._id.toString().slice(-6).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      company: {
        name: "PrimeStay Properties",
        address: "123 Vacation Lane, Suite 100",
        city: "New York",
        country: "USA",
        phone: "+1 (555) 123-4567",
        email: "info@primestay.com"
      },
      customer: {
        name: booking.user.name,
        email: booking.user.email
      },
      booking: {
        id: booking._id,
        destination: `${booking.listing.title}, ${booking.listing.city}, ${booking.listing.country}`,
        checkIn: new Date(booking.startDate).toLocaleDateString(),
        checkOut: new Date(booking.endDate).toLocaleDateString(),
        nights: Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)),
        price: booking.totalPrice,
        discount: 0, // You can add discount logic if needed
        total: booking.totalPrice
      }
    };

    res.status(200).json(invoiceData);
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ message: "Failed to generate invoice." });
  }
};
// Cancel a booking (Admin-side)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "canceled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking canceled successfully!", booking });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking." });
  }
};

// Fetch a specific booking by ID (User/Admin-side)
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("listing", "title")
      .populate("user", "name");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Failed to fetch booking details." });
  }
};

// Process fake payment (User-side)
// Process fake payment (User-side)
exports.processFakePayment = async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    // Find the booking
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Create a new payment record
    const payment = new Payment({
      bookingId: booking._id,
      userId: booking.user,
      amount: booking.totalPrice,
      paymentMethod,
      status: "completed", // Payment status is "completed"
    });

    await payment.save();

    // Update the booking status to "processing"
    booking.status = "processing";
    booking.paymentMethod = paymentMethod;
    await booking.save();

    res.status(200).json({ message: "Payment processed successfully!", booking, payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Failed to process payment." });
  }
};