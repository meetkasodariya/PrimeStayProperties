import React, { useState, useCallback } from "react";
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
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

const AddListing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newAmenity, setNewAmenity] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleCancel = useCallback(() => {
    const userRole = localStorage.getItem("role");
    navigate(userRole === "admin" ? "/dashboard" : "/");
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to add a listing.");
          navigate("/login");
          return;
        }
  
        // Validate images
        if (imageFiles.length === 0) {
          toast.error("Please select at least one image");
          return;
        }
  
        const formData = new FormData();
        
        // Append images
        imageFiles.forEach(file => {
          formData.append("images", file);
        });
  
        // Append other fields with proper formatting
        const listingData = {
          title: values.title,
          description: values.description,
          price: values.price,
          city: values.city,
          country: values.country,
          propertyType: values.propertyType,
          availableFrom: values.availableFrom,
          availableTo: values.availableTo,
          maxGuests: values.maxGuests,
          amenities: JSON.stringify(values.amenities)
        };
  
        Object.entries(listingData).forEach(([key, value]) => {
          formData.append(key, value);
        });
  
        const response = await axios.post(
          "http://localhost:5000/api/listings",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        toast.success("Listing added successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error adding listing:", error);
        
        // Enhanced error handling
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to add listing. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
  });
  const handleImageChange = useCallback((event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
  
    // Validate files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload valid image files (JPEG, PNG, GIF).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Each image must be less than 5MB.");
        return;
      }
    }
  
    // Update state
    setImageFiles(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    
    // Update formik
    formik.setFieldValue("images", previews);
  }, [formik]);

  const handleRemoveImage = useCallback((index) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    formik.setFieldValue("images", newPreviews);
  }, [imageFiles, imagePreviews, formik]);

  const handleAddAmenity = useCallback(() => {
    if (newAmenity.trim() && !formik.values.amenities.includes(newAmenity.trim())) {
      const updatedAmenities = [...formik.values.amenities, newAmenity.trim()];
      formik.setFieldValue("amenities", updatedAmenities);
      setNewAmenity("");
    }
  }, [formik, newAmenity]);

  const handleDeleteAmenity = useCallback(
    (amenityToDelete) => {
      const updatedAmenities = formik.values.amenities.filter(
        (amenity) => amenity !== amenityToDelete
      );
      formik.setFieldValue("amenities", updatedAmenities);
    },
    [formik]
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3, textAlign: "center", fontWeight: "bold" }}>
        Add New Listing
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
       
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

          {/* Available From Field */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
          </Grid>

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
                aria-label="Add Amenity"
              >
                Add Amenity
              </Button>
              <Box sx={{ mt: 2 }}>
                {formik.values.amenities.map((amenity) => (
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

          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
                disabled={loading}
                multiple
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  color="secondary"
                  disabled={loading}
                  aria-label="Upload Images"
                >
                  Upload Images (1-4)
                </Button>
              </label>
              {imagePreviews.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Previews:</Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {imagePreviews.map((preview, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box position="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{ 
                              width: "100%", 
                              height: "150px", 
                              objectFit: "cover", 
                              borderRadius: "8px" 
                            }}
                          />
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleRemoveImage(index)}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              minWidth: "auto",
                              padding: "4px",
                            }}
                          >
                    
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ mt: 4, textAlign: "center" }}>
            <Box sx={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                aria-label="Add Listing"
                sx={{ width: "20%" }}
              >
                {loading ? <CircularProgress size={24} /> : "Add Listing"}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
                aria-label="Cancel"
                sx={{ width: "20%" }}
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

export default AddListing; 