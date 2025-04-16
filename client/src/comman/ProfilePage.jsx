import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  Container,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your profile.");
        setLoading(false);
        navigate("/login"); // Redirect to login if no token
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile Data:", response.data); // Debugging: Log the response
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch profile data. Please try again later.");
        toast.error(error.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Profile Icon */}
        <Avatar
          alt={user?.name || "User"}
          src={user?.profileImage || "https://via.placeholder.com/150"}
          sx={{ width: 100, height: 100, mb: 2 }}
        />

        {/* Username */}
        <Typography variant="h4" sx={{ mb: 1 }}>
          {user?.name || "User"}
        </Typography>

        {/* Email */}
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {user?.email || "user@example.com"}
        </Typography>

        {/* Additional User Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Listings</Typography>
              <Typography variant="h4" color="primary">
                {user?.totalListings || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4" color="secondary">
                {user?.totalBookings || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" color="success.main">
                {user?.totalUsers || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* Logout Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;