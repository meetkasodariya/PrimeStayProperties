const express = require("express");
const passport = require("./utils/passportConfig");
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const bookingRoutes = require("./routes/booking"); // Import the booking routes
const dashboardRoutes = require("./routes/dashboardRoutes");
const ReviewRoutes=require("./routes/reviewRoutes")
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet"); // For secure HTTP headers
const morgan = require("morgan"); // For HTTP request logging
const path = require("path");
const paymentRoutes=require("./routes/paymentRoutes")
require("dotenv").config();

const app = express();

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI", "PORT"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Set secure HTTP headers
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow only trusted origins
    credentials: true, // Allow cookies and credentials
  })
);
app.use(morgan("dev")); // Log HTTP requests

// Serve static files (if needed)
if (process.env.NODE_ENV !== "production") {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes); // Mount the booking routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api", paymentRoutes); // Ensure this line is present

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB Connection Error:", err);
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};
connectWithRetry();

// Graceful shutdown handler
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));