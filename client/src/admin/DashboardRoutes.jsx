import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./Dashboarpage/DashboardHome";
import ManageListings from "./Dashboarpage/ManageListings";
import AddListing from "../components/listings/AddListing";
import EditListing from "../components/listings/EditListing";
import Bookings from "./Dashboarpage/Bookings";
import AdminPayments from "./Dashboarpage/Payments";
const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<DashboardHome />} />
      <Route path="manage-listings" element={<ManageListings />} />
      <Route path="add-listing" element={<AddListing/>} /> {/* Add route for AddListing */}
      <Route path="edit-listing" element={<EditListing/>} />
      <Route path="Bookings" element={<Bookings/>} />
      <Route path="payment" element={<AdminPayments/>} />
    </Routes>
  );
};

export default DashboardRoutes;