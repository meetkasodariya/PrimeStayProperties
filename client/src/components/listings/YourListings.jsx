/*import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const YourListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();

  // Fetch the logged-in user's ID from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
      //console.log("Decoded token payload:", decoded); // Log the payload
      return decoded.userId; // Use `userId` instead of `id`
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your listings.");
        setLoading(false);
        return;
      }
  
      const userId = getUserIdFromToken(); // Get the logged-in user's ID
     // console.log("User ID from token:", userId); // Debugging log
  
      if (!userId) {
        toast.error("Failed to fetch user information.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:5000/api/listings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        //console.log("API Response:", response.data); // Debugging log
  
        // Check the structure of the `user` field in the first listing
       // console.log("Listing user field:", response.data[0].user);
  
        // Filter listings to show only those created by the logged-in user
        const userListings = response.data.filter((listing) => listing.user._id === userId); // Updated filtering logic
        //console.log("Filtered Listings:", userListings); // Debugging log
  
        setListings(userListings);
      } catch (error) {
        setError("Failed to fetch listings. Please try again later.");
        toast.error(error.response?.data?.message || "Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchListings();
  }, []);

  const handleDelete = async () => {
    if (!selectedListing) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to delete listings.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/listings/${selectedListing}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Listing deleted successfully!");
      setListings((prev) => prev.filter((listing) => listing._id !== selectedListing));
    } catch (error) {
      toast.error("Failed to delete listing.");
    } finally {
      setOpenDialog(false);
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation(); // Stop event propagation
    navigate(`/edit-listing/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Listings
      </Typography>
      {listings.length === 0 ? (
        <Typography variant="body1">You have no listings yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item key={listing._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 2,
                  ml: 2,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => navigate(`/listing/${listing._id}`)} // Redirect to listing detail
              >
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover" }}
                  image={listing.image || "https://via.placeholder.com/300"}
                  alt={listing.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {listing.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {listing.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Price: ₹{listing.price}/night
                  </Typography>
                  {!listing.image && (
                    <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                      Image not available
                    </Typography>
                  )}
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => handleEdit(listing._id, e)} // Pass event to handleEdit
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation(); // Stop event propagation
                        setSelectedListing(listing._id);
                        setOpenDialog(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this listing? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default YourListings;*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const YourListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();

  // Local fallback image
  const fallbackImage = "/images/placeholder.jpg";

  // Fetch the logged-in user's ID from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.userId;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your listings.");
        setLoading(false);
        return;
      }

      const userId = getUserIdFromToken();
      if (!userId) {
        toast.error("Failed to fetch user information.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/listings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Process listings to ensure proper image format
        const userListings = response.data
          .filter((listing) => listing.user?._id === userId)
          .map(listing => ({
            ...listing,
            // Ensure images is an array of strings
            images: Array.isArray(listing.images) 
              ? listing.images.map(img => 
                  typeof img === 'string' ? img : 
                  img.url || fallbackImage
                )
              : [fallbackImage]
          }));

        setListings(userListings);
      } catch (error) {
        setError("Failed to fetch listings. Please try again later.");
        toast.error(error.response?.data?.message || "Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async () => {
    if (!selectedListing) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to delete listings.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/listings/${selectedListing}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Listing deleted successfully!");
      setListings((prev) => prev.filter((listing) => listing._id !== selectedListing));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete listing.");
    } finally {
      setOpenDialog(false);
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-listing/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Listings
      </Typography>
      {listings.length === 0 ? (
        <Typography variant="body1">You have no listings yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item key={listing._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => navigate(`/listing/${listing._id}`)}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover" }}
                  image={listing.images[0] || fallbackImage}
                  alt={listing.title}
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {listing.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {listing.description?.substring(0, 100)}...
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Price: ₹{listing.price}/night
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {listing.images.length} {listing.images.length === 1 ? 'image' : 'images'}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => handleEdit(listing._id, e)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedListing(listing._id);
                        setOpenDialog(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this listing? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default YourListings;