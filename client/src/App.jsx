import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./comman/Navbar";
import Home from "./comman/Home";
import AddListing from "./components/listings/AddListing";
import Login from "./comman/Login";
import Signup from "./comman/Signup";
import ListingDetail from "./components/listings/ListingDetails";
import EditListing from "./components/listings/EditListing";
import Dashboard from "./admin/Dashboard";
import Bookings from "./components/booking/Bookings";
import YourListings from "./components/listings/YourListings";
import ProfilePage from "./comman/ProfilePage";
import PaymentPage from "./components/booking/PaymentPage";
import ReviewForm from "./components/reviews/ReviewForm";
import ReviewsList from "./components/reviews/ReviewsList";
// Reusable PrivateRoute Component
const PrivateRoute = ({ element, isAuthenticated, redirectPath = "/", ...props }) => {
  return isAuthenticated ? element : <Navigate to={redirectPath} state={{ from: props.location }} />;
};

// Reusable AdminRoute Component
const AdminRoute = ({ element, isAuthenticated, role, redirectPath = "/dashboard", ...props }) => {
  return isAuthenticated && role === "admin" ? element : <Navigate to={redirectPath} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  // Handle login
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setRole(role);
  };

  return (
    <Router>
      <div>
        {/* Navbar with search functionality */}
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          role={role}
        />

        {/* Routes */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} />

          {/* Protected Add Listing Route */}
          <Route
            path="/add-listing"
            element={
              <PrivateRoute
                element={<AddListing />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* Listing Details Route */}
          <Route
            path="/listing/:id"
            element={
              <ListingDetail
                isAuthenticated={isAuthenticated}
                role={role}
              />
            }
          />

          {/* Protected Edit Listing Route */}
          <Route
            path="/edit-listing/:id"
            element={
              <PrivateRoute
                element={<EditListing />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Protected Admin Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute
                element={<Dashboard />}
                isAuthenticated={isAuthenticated}
                role={role}
              />
            }
          />

          {/* Protected Bookings Route */}
          <Route
            path="/bookings"
            element={
              <PrivateRoute
                element={<Bookings />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Protected Your Listings Route */}
          <Route
            path="/your-listings"
            element={
              <PrivateRoute
                element={<YourListings />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Protected Profile Page Route */}
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<ProfilePage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Payment Page Route */}
          <Route
            path="/payment/:bookingId"
            element={
              <PrivateRoute
                element={<PaymentPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Toast Container for Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;