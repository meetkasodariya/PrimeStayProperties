import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";

const BookingCard = ({ listingId, price, availableFrom, availableTo, maxGuests }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to book this listing.");
        navigate("/login", { state: { from: `/listing/${listingId}` } });
        return;
      }
  
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select both check-in and check-out dates.");
        return;
      }
  
      const startDate = dayjs(checkInDate);
      const endDate = dayjs(checkOutDate);
  
      // Validate check-in and check-out dates
      if (endDate.isBefore(startDate)) {
        toast.error("Check-out date cannot be before check-in date.");
        return;
      }
  
      // Validate against listing availability
      const availableStart = dayjs(availableFrom);
      const availableEnd = dayjs(availableTo);
  
      if (startDate.isBefore(availableStart) || endDate.isAfter(availableEnd)) {
        toast.error("Selected dates are outside the listing's availability.");
        return;
      }
  
      // Calculate total price
      const days = endDate.diff(startDate, "day");
      const totalPrice = days * price;
  
      setLoading(true);
  
      // Create the booking
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          startDate: startDate.format("YYYY-MM-DD"), // Ensure date format is correct
          endDate: endDate.format("YYYY-MM-DD"), // Ensure date format is correct
          listing: listingId,
          totalPrice,
          paymentMethod: "creditCard", // Add a default payment method
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Redirect to payment page with booking ID
      const bookingId = response.data.booking._id;
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      toast.error("Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Book This Listing
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          ₹{price}/per night
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Check-in Date"
            value={checkInDate}
            onChange={(newValue) => setCheckInDate(newValue)}
            minDate={dayjs(availableFrom)} // Ensure check-in is after availableFrom
            maxDate={dayjs(availableTo)} // Ensure check-in is before availableTo
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                />
              ),
            }}
          />
          <DatePicker
            label="Check-out Date"
            value={checkOutDate}
            onChange={(newValue) => setCheckOutDate(newValue)}
            minDate={checkInDate ? dayjs(checkInDate).add(1, "day") : dayjs(availableFrom)} // Ensure check-out is after check-in
            maxDate={dayjs(availableTo)} // Ensure check-out is before availableTo
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                />
              ),
            }}
          />
        </LocalizationProvider>

        <TextField
          fullWidth
          label="Guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          margin="normal"
          inputProps={{ min: 1, max: maxGuests }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleBooking}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Book Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
