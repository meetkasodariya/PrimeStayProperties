const Review = require("../models/Review");

// Add a review
const addReview = async (req, res) => {
  try {
    const { listingId, rating, comment } = req.body;

    const review = new Review({
      user: req.user._id,
      listing: listingId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

// Get reviews for a listing
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.listingId })
      .populate("user", "name _id")
      .sort({ createdAt: -1 }); // Newest first
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review." });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review." });
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview,
};