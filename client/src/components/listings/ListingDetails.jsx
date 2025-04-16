/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
  Grid,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import BookingCard from "../booking/BookingCard";
import ReviewForm from "../reviews/ReviewForm";
import ReviewsList from "../reviews/ReviewsList";
// Reusable Section Component
const Section = ({ title, children, sx = {} }) => (
  <Box sx={{ mt: 2, ...sx }}>
    <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

// Reusable Chip List Component
const ChipList = ({ items }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
    {items.map((item, index) => (
      <Chip key={index} label={item.trim()} />
    ))}
  </Box>
);

// Main Component
const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch listing details by ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        const formattedListing = {
          ...response.data,
          availableFrom: response.data.availableFrom.split("T")[0], // Extract YYYY-MM-DD
          availableTo: response.data.availableTo.split("T")[0], // Extract YYYY-MM-DD
        };
        setListing(formattedListing);
      } catch (error) {
        setError("Failed to fetch listing details. Please try again later.");
        toast.error("Failed to fetch listing details.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Format date to show month and day (e.g., "Oct 15")
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading listing details...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Show message if listing is not found
  if (!listing) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="warning">Listing not found.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ padding: isSmallScreen ? 2 : 4 }}>
  
      <Typography variant={isSmallScreen ? "h4" : "h3"} sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}>
        {listing.title}
      </Typography>

        <Card sx={{ maxWidth: 800, margin: "auto", mt: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={listing.image || "https://via.placeholder.com/800x400"}
          alt={listing.title}
          sx={{ height: isSmallScreen ? 200 : 400, objectFit: "cover" }}
        />
      </Card>

       <Grid
        container
        spacing={4}
        sx={{
          mt: 2,
          maxWidth: "90%",
          margin: "auto",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
      
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main", width: 24, height: 24 }}>
                <PersonIcon sx={{ fontSize: 16 }} />
              </Avatar>
              <Typography variant="body2" color="textSecondary">
                Posted by: <strong>{listing.user?.name || "Unknown User"}</strong>
              </Typography>
            </Box>
            <CardContent>
              <Typography variant={isSmallScreen ? "h6" : "h5"} color="primary" gutterBottom>
                ₹{listing.price}/per night
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {listing.city}, {listing.country}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
                {listing.description || "No description available."}
              </Typography>

              <Section title="Property Type">
                <Typography variant="body2">{listing.propertyType}</Typography>
              </Section>

              <Section title="Available Dates">
                <Typography variant="body2">
                  {formatDate(listing.availableFrom)} - {formatDate(listing.availableTo)}
                </Typography>
              </Section>

              <Section title="Max Guests">
                <Typography variant="body2">{listing.maxGuests}</Typography>
              </Section>

              <Section title="Amenities">
                <ChipList items={listing.amenities || []} />
              </Section>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <BookingCard
            listingId={listing._id}
            price={listing.price}
            availableFrom={listing.availableFrom}
            availableTo={listing.availableTo}
            maxGuests={listing.maxGuests}
          />
        </Grid>
      </Grid>

      <ReviewForm listingId={listing._id} onReviewSubmit={(newReview) => setReviews([...reviews, newReview])} />

      <ReviewsList listingId={listing._id} />
    </Container>
  );
};

export default ListingDetail;*/



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import BookingCard from "../booking/BookingCard";
import ReviewForm from "../reviews/ReviewForm";
import ReviewsList from "../reviews/ReviewsList";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Helper function to ensure we always get a string URL
const getImageUrl = (image) => {
  if (typeof image === 'string') return image;
  if (image && image.url) return image.url;
  return "https://via.placeholder.com/800x400";
};

// Reusable Section Component
const Section = ({ title, children, sx = {} }) => (
  <Box sx={{ mt: 2, ...sx }}>
    <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

// Reusable Chip List Component
const ChipList = ({ items }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
    {items.map((item, index) => (
      <Chip key={index} label={item.trim()} />
    ))}
  </Box>
);

// Image Gallery Component
const ImageGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Ensure we have at least one image URL
  const imageUrls = images.length > 0 
    ? images.map(img => getImageUrl(img))
    : [getImageUrl(null)];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Main Image */}
      <CardMedia
        component="img"
        image={imageUrls[currentIndex]}
        alt={`Listing image ${currentIndex + 1}`}
        sx={{
          width: "100%",
          height: isSmallScreen ? 250 : 400,
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />

      {/* Navigation Arrows */}
      {imageUrls.length > 1 && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </>
      )}

      {/* Thumbnail Strip */}
      {imageUrls.length > 1 && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 1,
            py: 1,
            mt: 1,
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "2px",
            },
          }}
        >
          {imageUrls.map((img, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 80,
                height: 60,
                minWidth: 80,
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                border: currentIndex === index ? "2px solid" : "1px solid",
                borderColor: currentIndex === index ? "primary.main" : "divider",
                opacity: currentIndex === index ? 1 : 0.7,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

// Main Component
const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch listing details by ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        const formattedListing = {
          ...response.data,
          availableFrom: response.data.availableFrom?.split("T")[0] || "",
          availableTo: response.data.availableTo?.split("T")[0] || "",
          // Ensure images is always an array of URLs
          images: Array.isArray(response.data.images) 
            ? response.data.images.map(img => getImageUrl(img))
            : [getImageUrl(null)],
        };
        setListing(formattedListing);
      } catch (error) {
        setError("Failed to fetch listing details. Please try again later.");
        toast.error("Failed to fetch listing details.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Format date to show month and day (e.g., "Oct 15")
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading listing details...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Show message if listing is not found
  if (!listing) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="warning">Listing not found.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ padding: isSmallScreen ? 2 : 4, maxWidth: "lg" }}>
      {/* Title Section */}
      <Typography variant={isSmallScreen ? "h4" : "h3"} sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}>
        {listing.title}
      </Typography>

      {/* Image Gallery Section */}
      <Box sx={{ maxWidth: 1000, margin: "auto", mt: 3, mb: 4 }}>
        <ImageGallery images={listing.images} />
      </Box>

      {/* Details and Booking Section */}
      <Grid
        container
        spacing={4}
        sx={{
          mt: 2,
          maxWidth: "100%",
          margin: "auto",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        {/* Left Column: Listing Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main", width: 24, height: 24 }}>
                <PersonIcon sx={{ fontSize: 16 }} />
              </Avatar>
              <Typography variant="body2" color="textSecondary">
                Posted by: <strong>{listing.user?.name || "Unknown User"}</strong>
              </Typography>
            </Box>
            <CardContent>
              <Typography variant={isSmallScreen ? "h6" : "h5"} color="primary" gutterBottom>
                ₹{listing.price}/per night
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {listing.city}, {listing.country}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
                {listing.description || "No description available."}
              </Typography>

              {/* Property Type */}
              <Section title="Property Type">
                <Typography variant="body2">{listing.propertyType}</Typography>
              </Section>

              {/* Available Dates */}
              <Section title="Available Dates">
                <Typography variant="body2">
                  {formatDate(listing.availableFrom)} - {formatDate(listing.availableTo)}
                </Typography>
              </Section>

              {/* Max Guests */}
              <Section title="Max Guests">
                <Typography variant="body2">{listing.maxGuests}</Typography>
              </Section>

              {/* Amenities */}
              <Section title="Amenities">
                <ChipList items={listing.amenities || []} />
              </Section>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Booking Card */}
        <Grid item xs={12} md={4}>
          <BookingCard
            listingId={listing._id}
            price={listing.price}
            availableFrom={listing.availableFrom}
            availableTo={listing.availableTo}
            maxGuests={listing.maxGuests}
          />
        </Grid>
      </Grid>

      {/* Review Form */}
      <Box sx={{ mt: 4 }}>
        <ReviewForm listingId={listing._id} onReviewSubmit={(newReview) => setReviews([...reviews, newReview])} />
      </Box>

      {/* Reviews List */}
      <Box sx={{ mt: 4 }}>
        <ReviewsList listingId={listing._id} />
      </Box>
    </Container>
  );
};

export default ListingDetail;