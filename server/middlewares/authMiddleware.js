const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User"); // Ensure User model is imported

/**
 * Middleware to manually verify JWT tokens and attach user data to req.user.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Fetch user details

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // Attach the authenticated user
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    res.status(401).json({ message: "Invalid or expired token." });
  }
};

/**
 * Middleware to protect routes using Passport's JWT strategy.
 * Ensures `req.user` is populated with authenticated user data.
 */
const protect = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      console.error("Passport JWT authentication failed:", err);
      return res.status(401).json({ message: "Unauthorized. Invalid token or session expired." });
    }
    req.user = user; // Attach the authenticated user
    next();
  })(req, res, next);
};

/**
 * Middleware to restrict access based on user roles.
 * @param {string[]} roles - Allowed roles (e.g., ["admin", "user"]).
 */
const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "User role not found." });
    }
    if (!roles.includes(req.user.role)) {
      console.warn(`Unauthorized access attempt by user ${req.user._id} with role ${req.user.role}`);
      return res.status(403).json({ message: `Unauthorized. Required roles: ${roles.join(", ")}` });
    }
    next();
  };
};

module.exports = { authMiddleware, protect, restrictTo };