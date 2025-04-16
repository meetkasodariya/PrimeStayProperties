import React, { useState } from "react";
import { 
  Rating, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert,
  useMediaQuery,
  useTheme 
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewForm = ({ listingId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!rating) {
      setError("Please provide a rating");
      setSubmitting(false);
      return;
    }

    if (!comment.trim()) {
      setError("Please provide a comment");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        { listingId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review submitted successfully!");
      onReviewSubmit(response.data);
      setRating(0);
      setComment("");
      setError(null);
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 600, mx: "auto", px: isSmallScreen ? 2 : 4 }}>
      <Typography variant="h6" gutterBottom>
        {isLoggedIn ? "Add Your Review" : "Log in to leave a review"}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            precision={0.5}
            size={isSmallScreen ? "medium" : "large"}
            disabled={!isLoggedIn || submitting}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
          disabled={!isLoggedIn || submitting}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isLoggedIn || submitting || !rating || !comment.trim()}
            sx={{ width: isSmallScreen ? "100%" : "auto" }}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;