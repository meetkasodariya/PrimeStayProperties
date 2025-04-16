import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ onLogout, searchQuery, setSearchQuery, role }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status on component mount
  const token = localStorage.getItem("token");
    useEffect(() => {
    setIsAuthenticated(!!token); // Convert token presence to boolean
  }, [token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setAuthChecked(true);
  }, []);
  
 
  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    onLogout();
    navigate("/login");
    handleMenuClose();
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  if (!authChecked) return null;
  // Hide Navbar if the logged-in user is an admin
  if (isAuthenticated && role === "admin") {
    return null;
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left Side - Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/"
            sx={{
              color: "#000",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              },
            }}
            aria-label="Home"
          >
            <i
              className="fa-regular fa-compass"
              style={{
                fontSize: "2rem",
                color: "#3f51b5",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "rotate(15deg)")}
              onMouseLeave={(e) => (e.target.style.transform = "rotate(0deg)")}
            />
          </IconButton>
        </Box>

        {/* Middle - Search Box */}
        <Box
          sx={{
            flexGrow: 0.5,
            display: "flex",
            justifyContent: "center",
            mx: 2,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by city, country (e.g., New York, USA)"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#757575" }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} aria-label="Clear search">
                    <ClearIcon sx={{ color: "#757575" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#ccc" },
                "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
              },
            }}
          />
        </Box>

        {/* Right Side - Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isMobile && (
            <>
              {isAuthenticated ? (
                <>
                  {/* Add additional buttons for authenticated users if needed */}
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      color: "#000",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#f5f5f5", borderRadius: "8px" },
                    }}
                    component={Link}
                    to="/login"
                    aria-label="Login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{
                      color: "#000",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#f5f5f5", borderRadius: "8px" },
                    }}
                    component={Link}
                    to="/signup"
                    aria-label="Signup"
                  >
                    Signup
                  </Button>
                </>
              )}
            </>
          )}

          {/* Profile Icon (Logged In) */}
          {isAuthenticated && (
            <IconButton sx={{ color: "#000" }} onClick={handleMenuOpen} aria-label="Open profile menu">
              <AccountCircleIcon />
            </IconButton>
          )}

          {/* Mobile - Menu Icon (Not Logged In) */}
          {isMobile && !isAuthenticated && (
            <IconButton sx={{ color: "#000" }} onClick={handleMenuOpen} aria-label="Open menu">
              <MenuIcon />
            </IconButton>
          )}

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {!isAuthenticated ? (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login" sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Login
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/signup" sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Signup
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/add-listing" sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Add Listing
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/your-listings" sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Your Listings
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/bookings" sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Bookings
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/profile" sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "#000", fontSize: "0.9rem" }}>
                  Logout
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;