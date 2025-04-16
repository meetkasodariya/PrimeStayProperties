import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Local fallback image (make sure this exists in your public folder)
  const fallbackImage = "/images/placeholder.jpg";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Process listings to ensure proper image format
        const processedListings = response.data.map(listing => ({
          ...listing,
          // Ensure we have a valid image URL or use fallback
          image: listing.image && isValidImage(listing.image) 
            ? listing.image 
            : fallbackImage,
          // Handle array of images if your API returns them
          images: Array.isArray(listing.images) 
            ? listing.images.map(img => typeof img === 'string' ? img : img.url)
            : [fallbackImage]
        }));

        setListings(processedListings);
      } catch (error) {
        setError("Failed to fetch listings.");
        toast.error("Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Helper function to check if image URL is valid
  const isValidImage = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized! Please log in.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setListings(prevListings => prevListings.filter(listing => listing._id !== id));
      toast.success("Listing deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete listing.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  const handleShowCard = (listing) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedListing(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Listings
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing._id}>
                <TableCell>{listing.title}</TableCell>
                <TableCell>₹{listing.price}</TableCell>
                <TableCell>{listing.city}</TableCell>
                <TableCell>{listing.country}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(listing._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(listing._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleShowCard(listing)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show Card Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Listing Details</DialogTitle>
        <DialogContent>
          {selectedListing && (
            <>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Image Section */}
                <Box sx={{ flex: 1 }}>
                  <img
                    src={selectedListing.images?.[0] || selectedListing.image || fallbackImage}
                    alt={selectedListing.title}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                    style={{
                      width: '100%',
                      maxHeight: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
                
                {/* Details Section */}
                <Box sx={{ flex: 1 }}>
                  <DialogContentText>
                    <strong>Title:</strong> {selectedListing.title}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Description:</strong> {selectedListing.description}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Price:</strong> ₹{selectedListing.price}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Location:</strong> {selectedListing.city}, {selectedListing.country}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Property Type:</strong> {selectedListing.propertyType}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Available:</strong> {new Date(selectedListing.availableFrom).toLocaleDateString()} to {new Date(selectedListing.availableTo).toLocaleDateString()}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Max Guests:</strong> {selectedListing.maxGuests}
                  </DialogContentText>
                  {selectedListing.amenities?.length > 0 && (
                    <DialogContentText>
                      <strong>Amenities:</strong> {selectedListing.amenities.join(", ")}
                    </DialogContentText>
                  )}
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageListings;