import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  MenuItem,
  Alert,
  Chip,
  Grid,
  IconButton,
  Avatar,
  Card,
  CardMedia,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// Helper function to ensure we always get a string URL
const getImageUrl = (image) => {
  if (typeof image === 'string') return image;
  if (image && image.url) return image.url;
  return "https://via.placeholder.com/800x400";
};

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  propertyType: Yup.string().required("Property type is required"),
  availableFrom: Yup.date().required("Available from date is required"),
  availableTo: Yup.date()
    .required("Available to date is required")
    .min(Yup.ref("availableFrom"), "Available to date must be after available from date"),
  maxGuests: Yup.number()
    .typeError("Max guests must be a number")
    .positive("Max guests must be greater than zero")
    .required("Max guests is required"),
  amenities: Yup.array().of(Yup.string()).min(1, "At least one amenity is required"),
  images: Yup.array()
    .of(Yup.string())
    .min(1, "At least one image is required")
    .max(4, "Maximum 4 images allowed"),
});

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    country: "",
    propertyType: "",
    availableFrom: null,
    availableTo: null,
    maxGuests: "",
    amenities: [],
    images: [],
  });

  // Fetch listing details by ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        const listing = response.data;

        // Ensure propertyType is valid
        const validPropertyTypes = ["Apartment", "House", "Condo", "Villa"];
        const propertyType = validPropertyTypes.includes(listing.propertyType)
          ? listing.propertyType
          : "Apartment";

        // Ensure images are in the correct format
        const formattedImages = Array.isArray(listing.images) 
          ? listing.images.map(img => getImageUrl(img))
          : [getImageUrl(null)];

        setInitialValues({
          ...listing,
          propertyType,
          availableFrom: listing.availableFrom ? dayjs(listing.availableFrom) : null,
          availableTo: listing.availableTo ? dayjs(listing.availableTo) : null,
          images: formattedImages,
        });

        setAmenities(listing.amenities || []);
      } catch (error) {
        setError("Failed to fetch listing details. Please try again later.");
        toast.error("Failed to fetch listing details.");
      }
    };

    fetchListing();
  }, [id]);

  const handleCancel = () => {
    const userRole = localStorage.getItem("role");
    if (userRole === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  // Formik Initialization
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to edit a listing.");
          navigate("/login", { state: { from: `/edit-listing/${id}` } });
          return;
        }

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "availableFrom" || key === "availableTo") {
            formData.append(key, values[key].toISOString());
          } else if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        });

        // Append new image files
        newImages.forEach((file) => {
          formData.append("images", file);
        });

        const response = await axios.put(`http://localhost:5000/api/listings/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Listing updated successfully!");
        const userRole = localStorage.getItem("role");
        if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Update error:", error.response?.data || error.message);
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          toast.error(error.response?.data?.message || "Failed to update listing.");
        }
        setError(error.response?.data?.message || "Failed to update listing. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle Image Upload
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + formik.values.images.length + newImages.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setNewImages([...newImages, ...validFiles]);
  };

  // Remove existing image
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  // Remove new image
  const handleRemoveNewImage = (index) => {
    const updatedNewImages = [...newImages];
    updatedNewImages.splice(index, 1);
    setNewImages(updatedNewImages);
  };

  // Handle Amenities Input
  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      const updatedAmenities = [...amenities, newAmenity.trim()];
      setAmenities(updatedAmenities);
      formik.setFieldValue("amenities", updatedAmenities);
      setNewAmenity("");
    }
  };

  const handleDeleteAmenity = (amenityToDelete) => {
    const updatedAmenities = amenities.filter((amenity) => amenity !== amenityToDelete);
    setAmenities(updatedAmenities);
    formik.setFieldValue("amenities", updatedAmenities);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3, textAlign: "center", fontWeight: "bold" }}>
        Edit Listing
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          {/* Title Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              {...formik.getFieldProps("title")}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              disabled={loading}
            />
          </Grid>

          {/* Description Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              {...formik.getFieldProps("description")}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              multiline
              rows={3}
              disabled={loading}
            />
          </Grid>

          {/* Price Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              name="price"
              {...formik.getFieldProps("price")}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              disabled={loading}
            />
          </Grid>

          {/* City Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              {...formik.getFieldProps("city")}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              disabled={loading}
            />
          </Grid>

          {/* Country Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              {...formik.getFieldProps("country")}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              disabled={loading}
            />
          </Grid>

          {/* Property Type Field */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Property Type"
              name="propertyType"
              {...formik.getFieldProps("propertyType")}
              error={formik.touched.propertyType && Boolean(formik.errors.propertyType)}
              helperText={formik.touched.propertyType && formik.errors.propertyType}
              disabled={loading}
            >
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Flat">Flat</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
            </TextField>
          </Grid>

          {/* Available From and Available To Fields */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Available From"
                    value={formik.values.availableFrom}
                    onChange={(value) => formik.setFieldValue("availableFrom", value)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: formik.touched.availableFrom && Boolean(formik.errors.availableFrom),
                        helperText: formik.touched.availableFrom && formik.errors.availableFrom,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Available To"
                    value={formik.values.availableTo}
                    onChange={(value) => formik.setFieldValue("availableTo", value)}
                    minDate={formik.values.availableFrom}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: formik.touched.availableTo && Boolean(formik.errors.availableTo),
                        helperText: formik.touched.availableTo && formik.errors.availableTo,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Grid>

          {/* Max Guests Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Max Guests"
              type="number"
              name="maxGuests"
              {...formik.getFieldProps("maxGuests")}
              error={formik.touched.maxGuests && Boolean(formik.errors.maxGuests)}
              helperText={formik.touched.maxGuests && formik.errors.maxGuests}
              disabled={loading}
            />
          </Grid>

          {/* Amenities Field */}
          <Grid item xs={12} md={6}>
            <Box>
              <TextField
                fullWidth
                label="Add Amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                disabled={loading}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddAmenity}
                disabled={loading || !newAmenity.trim()}
                sx={{ mt: 1 }}
              >
                Add Amenity
              </Button>
              <Box sx={{ mt: 2 }}>
                {amenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    onDelete={() => handleDeleteAmenity(amenity)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Image Gallery */}
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Current Images ({formik.values.images.length + newImages.length}/4)
            </Typography>
            
            {/* Existing Images */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {formik.values.images.map((image, index) => (
                <Grid item xs={6} sm={4} md={3} key={`existing-${index}`}>
                  <Card sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`Listing image ${index + 1}`}
                      sx={{ height: 120, objectFit: "cover" }}
                    />
                    <IconButton
                      sx={{ position: "absolute", top: 0, right: 0, color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
              
              {/* New Images */}
              {newImages.map((file, index) => (
                <Grid item xs={6} sm={4} md={3} key={`new-${index}`}>
                  <Card sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={URL.createObjectURL(file)}
                      alt={`New image ${index + 1}`}
                      sx={{ height: 120, objectFit: "cover" }}
                    />
                    <IconButton
                      sx={{ position: "absolute", top: 0, right: 0, color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                      onClick={() => handleRemoveNewImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Image Upload */}
            <Box sx={{ textAlign: "center" }}>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
                disabled={loading || formik.values.images.length + newImages.length >= 4}
                multiple
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  color="secondary"
                  disabled={loading || formik.values.images.length + newImages.length >= 4}
                >
                  Add More Images
                </Button>
              </label>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Maximum 4 images (JPEG, PNG, GIF, max 5MB each)
              </Typography>
            </Box>
          </Grid>

          {/* Submit and Cancel Buttons */}
          <Grid item xs={12} sx={{ mt: 4, textAlign: "center" }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ height: "50px", fontSize: "16px", width: "25%" }}
              >
                {loading ? <CircularProgress size={24} /> : "Update Listing"}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
                sx={{ height: "50px", fontSize: "16px", width: "25%" }}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditListing;