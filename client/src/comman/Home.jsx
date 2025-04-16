/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";

const Home = ({ searchQuery = "" }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fallbackImage = "/images/placeholder.jpg";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/listings");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to fetch listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter listings based on search query
  const filteredListings = listings.filter((listing) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // If no search query, show all listings

    // Split the search query into parts (city and country)
    const [cityQuery, countryQuery] = query.split(",").map((part) => part.trim());

    // Check if the listing matches the city OR country
    const matchesCity = cityQuery ? listing.city.toLowerCase().includes(cityQuery) : false;
    const matchesCountry = countryQuery ? listing.country.toLowerCase().includes(countryQuery) : false;

    // Return true if the listing matches either city or country (OR condition)
    return matchesCity || matchesCountry;
  });

  // Format date to show month and day (e.g., "Oct 15")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false} // Allow full width
       >
      <Grid container spacing={4} justifyContent="flex-start" mt={1}>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <Grid
              item
              xs={12} sm={6} md={4} lg={3}
              key={listing._id}
            >
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
                  image={listing.image || fallbackImage}
                  alt={listing.title || "Listing image"}
                  sx={{ height: 240, objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                  {listing.city}, {listing.country}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {listing.title}              
                     </Typography>
                  {/* Display available dates */
               /*   <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Available: {formatDate(listing.availableFrom)} - {formatDate(listing.availableTo)}
                  </Typography>
                  <Typography variant="subtitle1">
                    ₹{listing.price}/per night
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 4,ml:"50%"}}>
            No listings available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Skeleton
} from "@mui/material";
import backgroundImage from "../assets/background.jpg";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Home = ({ searchQuery = "" }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fallbackImage = "/images/placeholder.jpg";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/listings");
        // Ensure images are in the correct format (array of URLs)
        const formattedListings = response.data.map(listing => ({
          ...listing,
          images: Array.isArray(listing.images) 
            ? listing.images.map(img => typeof img === 'string' ? img : img.url)
            : [fallbackImage]
        }));
        setListings(formattedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to fetch listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const [cityQuery, countryQuery] = query.split(",").map((part) => part.trim());
    const matchesCity = cityQuery ? listing.city.toLowerCase().includes(cityQuery) : false;
    const matchesCountry = countryQuery ? listing.country.toLowerCase().includes(countryQuery) : false;

    return matchesCity || matchesCountry;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // ImageSlider component for each listing
  const ImageSlider = ({ images, loading }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    if (loading) {
      return (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={240}
          sx={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
      );
    }

    // Ensure we have at least one image URL
    const imageUrls = images.length > 0 ? images : [fallbackImage];
    const currentImage = imageUrls[currentImageIndex] || fallbackImage;

    return (
      <Box sx={{ position: 'relative', height: 240 }}>
        <CardMedia
          component="img"
          image={currentImage}
          alt="Listing image"
          sx={{ 
            height: '100%', 
            width: '100%',
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        
        {imageUrls.length > 1 && (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }
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
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
            
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
              }}
            >
              {imageUrls.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentImageIndex ? 'primary.main' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    );
  };

  // Loading skeleton for cards
  const LoadingSkeleton = () => {
    return (
      <Grid container spacing={4} justifyContent="flex-start">
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <ImageSlider loading={true} images={[]} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="40%" height={25} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  if (error) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        py: 4,
      }}
    >
      {/* Semi-transparent overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 0,
        }}
      />
      
      <Container maxWidth={false} sx={{ position: "relative", zIndex: 1 }}>
        {loading ? (
          <LoadingSkeleton />
        ) : filteredListings.length > 0 ? (
          <Grid container spacing={4} justifyContent="flex-start">
            {filteredListings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={listing._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    background: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.5)",
                    },
                  }}
                  onClick={() => navigate(`/listing/${listing._id}`)}
                >
                  <ImageSlider images={listing.images} loading={false} />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                      {listing.city}, {listing.country}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                      {listing.title}              
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                      Available: {formatDate(listing.availableFrom)} - {formatDate(listing.availableTo)}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold', 
                      mt: 1,
                      color: "text.primary"
                    }}>
                      ₹{listing.price}/per night
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                mt: 4,
                p: 3,
                background: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: 'inline-block'
              }}
            >
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                No listings available matching your search.
              </Typography>
            </Box>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;