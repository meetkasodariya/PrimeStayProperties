import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Avatar,
  Rating,
  Alert,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useTheme, useMediaQuery } from "@mui/material";

const ReviewsList = ({ listingId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const config = token 
          ? { headers: { Authorization: `Bearer ${token}` } } 
          : {};
        
        const response = await axios.get(
          `http://localhost:5000/api/reviews/${listingId}`,
          config
        );
        setReviews(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [listingId, token]);

  const handleDeleteReview = async (reviewId) => {
    if (!token) {
      toast.error("Please log in to delete reviews");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review deleted successfully!");
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 4, maxWidth: 1200, mx: "auto", px: isSmallScreen ? 2 : 4 }}>
      <Typography variant="h6" gutterBottom>
        Reviews
      </Typography>
      
      {reviews.length === 0 ? (
        <Typography>No reviews yet. Be the first to review!</Typography>
      ) : (
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid key={review._id} item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  position: "relative",
                  height: "100%",
                }}
              >
                {userId && review.user?._id === userId && (
                  <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 24, height: 24 }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {review.user?.name || "Anonymous"}
                  </Typography>
                </Box>
                
                <Rating value={review.rating} precision={0.5} readOnly />
                
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ReviewsList;