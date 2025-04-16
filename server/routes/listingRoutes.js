const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const { upload, handleMulterErrors } = require("../middlewares/uploadMiddleware");
// 🚀 **Get all listings**
router.get("/", listingController.getListings);

// 🚀 **Get a single listing by ID**
router.get("/:id", listingController.getListingById);

// Create a new listing (admin or user)
router.post(
  "/",
  protect,
  restrictTo(["admin", "user"]),
  upload.array("images", 4),
  handleMulterErrors,
  listingController.createListing
);

  
// Update a listing (admin or user)
router.put(
  "/:id",
  protect,
  restrictTo(["admin", "user"]),
  upload.single("image"),
  listingController.updateListing
);

// Delete a listing (admin or user)
router.delete(
  "/:id",
  protect,
  restrictTo(["admin", "user"]),
  listingController.deleteListing
);
module.exports = router;
