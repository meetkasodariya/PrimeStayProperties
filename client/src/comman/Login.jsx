import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null); // Clear any previous errors

      try {
        console.log("Submitting:", values); // Debugging

        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response:", response.data);
        toast.success("Login Successfully PrimeStay Properties!");

        // Save token & role in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // Notify the parent component (App) about the login
        if (onLogin) {
          onLogin(response.data.role);
        }

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/dashboard"); // Redirect to dashboard for admin
        } else {
          navigate("/"); // Redirect to home for regular users
        }
      } catch (error) {
        console.error("Login error:", error.response); // Log full error response
        setError(error.response?.data?.message || "Login failed. Please try again.");
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            textAlign="center"
            marginBottom={2}
            color="primary"
          >
            Login
          </Typography>

          {/* Display error message if any */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }} aria-live="assertive">
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit} aria-label="Login form">
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              aria-label="Email"
              aria-describedby="email-error"
              sx={{ marginBottom: 2 }}
              disabled={loading}
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
              aria-label="Password"
              aria-describedby="password-error"
              sx={{ marginBottom: 2 }}
              disabled={loading}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1.5 }}
              disabled={loading}
              aria-label="Login"
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login; 