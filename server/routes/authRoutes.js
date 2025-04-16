const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("../utils/passportConfig");

// Authentication Routes
router.get("/", authController.getUsers);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),authController.getProfile
);

router.post("/signup", authController.signup);
router.put("/:id",  authController.editUser);
router.post("/login", authController.login);
router.delete("/:id", authController.deleteUser );
// Protected Route Example (Require Authentication)
router.get("/dashboard", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
