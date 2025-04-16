import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Payment as PaymentIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import DashboardHome from "./Dashboarpage/DashboardHome";
import ManageListings from "./Dashboarpage/ManageListings";
import Users from "./Dashboarpage/Users"; // Import the Users component
import Bookings from "./Dashboarpage/Bookings";
import AdminPayments from "./Dashboarpage/Payments";
const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const customTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
    toast.success("Logged out successfully!");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Manage Listings", icon: <ApartmentIcon /> },
    { text: "Users", icon: <PeopleIcon /> },
    { text: "Bookings", icon: <BookIcon /> },
    { text: "Payments", icon: <PaymentIcon /> },
  ];

  const getContent = () => {
    switch (selectedSection) {
      case "Manage Listings":
        return <ManageListings />;
      case "Users":
        return <Users />;
      case "Bookings":
        return <Bookings/>;
      case "Payments":
        return <AdminPayments/>;
      default:
        return <DashboardHome />;
    }
  };

  const drawer = (
    <Box>
      <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
      PrimeStay Properties 
       </Typography>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleMenuClick(item.text)}
              sx={{ "&:hover": { backgroundColor: darkMode ? "#333" : "#f0f0f0" } }}
            >
              <ListItemIcon sx={{ color: darkMode ? "#fff" : "#000" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: darkMode ? "#fff" : "#000" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{ "&:hover": { backgroundColor: darkMode ? "#333" : "#f0f0f0" } }}
          >
            <ListItemIcon sx={{ color: darkMode ? "#fff" : "#000" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: darkMode ? "#fff" : "#000" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              {selectedSection}
            </Typography>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: darkMode ? "#121212" : "#f5f5f5" }}>
          {getContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;