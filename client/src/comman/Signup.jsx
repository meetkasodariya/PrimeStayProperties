  import React, { useState } from "react";
  import axios from "axios";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import {
    TextField,
    Button,
    Container,
    Typography,
    CircularProgress,
    Box,
    Paper,
  } from "@mui/material";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  import "react-toastify/dist/ReactToastify.css";

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Formik configuration
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          // Send signup request to the backend
          const response = await axios.post(
            "http://localhost:5000/api/auth/signup",
            values
          );

          // Store token in localStorage and redirect to home
          localStorage.setItem("token", response.data.token);
          toast.success("Signup successful! Redirecting to home...");
          navigate("/"); // Redirect to home after signup
        } catch (error) {
          console.error("Error signing up:", error);
          toast.error(error.response?.data?.message || "Error signing up. Try again.");
        } finally {
          setLoading(false);
        }
      },
    });

    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              width: "100%",
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 3, textAlign: "center", color: "primary.main" }}
            >
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {/* Name Field */}
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 2 }}
              />

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 2 }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ mb: 2 }}
              />

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign Up"}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    );
  };

  export default Signup;