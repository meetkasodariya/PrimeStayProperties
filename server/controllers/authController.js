/*const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Listing=require("../models/Listing");
const Booking=require("../models/Booking")
require("dotenv").config();
const secretKey = process.env.JWT_SECRET || "mySuperSecretKey2107!@#"; // Ensure you have this in .env

// ✅ Predefined Admin Credentials
const ADMIN_EMAIL =process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// 📌 Signup (Only for Users, Not Admin)
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (email === ADMIN_EMAIL) {
      return res.status(403).json({ message: "Admin cannot sign up" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Login (Admin & Users)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔹 Admin Login
    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) {
        return res.status(400).json({ message: "Invalid admin credentials" });
      }

      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ token, role: "admin", message: "Admin login successful" });
    }

    // 🔹 User Login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });

    }
    const token = jwt.sign({ userId: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, role: "user", message: "User login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// get all user
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch additional stats
    const totalListings = await Listing.countDocuments({ userId: req.user._id });
    const totalBookings = await Booking.countDocuments({ userId: req.user._id });
    const totalCanceledBookings = await Booking.countDocuments({
      userId: req.user._id,
      status: "canceled",
    });
    const totalSuccessfulBookings = await Booking.countDocuments({
      userId: req.user._id,
      status: "completed",
    });
    const totalPendingBookings = await Booking.countDocuments({
      userId: req.user._id,
      status: "pending",
    });
    const totalUsers = await User.countDocuments(); // Optional: Only for admins

    // Log the results for debugging
    console.log("User ID:", req.user._id);
    console.log("Total Listings:", totalListings);
    console.log("Total Bookings:", totalBookings);
    console.log("Canceled Bookings:", totalCanceledBookings);
    console.log("Successful Bookings:", totalSuccessfulBookings);
    console.log("Pending Bookings:", totalPendingBookings);
    console.log("Total Users:", totalUsers);

    res.json({
      ...user.toObject(),
      totalListings,
      totalBookings,
      totalCanceledBookings,
      totalSuccessfulBookings,
      totalPendingBookings,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
};*/
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET || "mySuperSecretKey2107!@#";

// 📌 Signup (Admin & Users)
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the role based on the email
    const role = email === "admin@gmail.com" ? "admin" : "user";

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", role });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Login (Admin & Users)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ token, role: user.role, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get All Users (Admin Only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Edit User (Admin Only)
exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// 📌 Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch additional stats
    const totalListings = await Listing.countDocuments({ user: req.user._id }); // Ensure `user` is the correct field
    const totalBookings = await Booking.countDocuments({ user: req.user._id }); // Ensure `user` is the correct fiel
    const totalUsers = await User.countDocuments(); // Optional: Only for admins

    // Log the results for debugging
    /*console.log("User ID:", req.user._id);
    console.log("Total Listings:", totalListings);
    console.log("Total Bookings:", totalBookings);
    console.log("Total Users:", totalUsers);
    */
    res.json({
      ...user.toObject(),
      totalListings,
      totalBookings,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
