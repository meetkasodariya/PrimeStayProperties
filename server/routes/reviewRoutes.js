const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { addReview, getReviews, deleteReview } = require("../controllers/reviewController");

// Add a review
router.post("/", protect, addReview);

// Get reviews for a listing
router.get("/:listingId",getReviews);

// Delete a review
router.delete("/:id", protect, deleteReview);

module.exports = router;