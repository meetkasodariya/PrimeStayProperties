import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // Default payment method
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showReel, setShowReel] = useState(false); // State to control reel visibility

  // Fetch booking details on component mount
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookingDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch booking details.");
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleFakePayment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Simulate a fake payment process
      await axios.post(
        `http://localhost:5000/api/bookings/${bookingId}/pay`,
        { paymentMethod }, // Include the selected payment method
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Payment successful! Your booking is Procesing.");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/listing/${bookingDetails.listing._id}`); // Redirect to the listing page
  };

  if (!bookingDetails) {
    return <CircularProgress />; // Show a loader while fetching booking details
  }

  // Calculate discount and final price
  const discount = bookingDetails.totalPrice * 0;
  const finalPrice = bookingDetails.totalPrice - discount;

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Payment Gateway
        </Typography>

        {/* Show Reel Button */}
        {/* Payment Options */}
        <FormControl component="fieldset" sx={{ mt: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Payment Method
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label="UPI"
            />
            <FormControlLabel
              value="netBanking"
              control={<Radio />}
              label="Net Banking"
            />
          </RadioGroup>
        </FormControl>

        {/* Display Total Price and Discount */}
        <Typography variant="body1" gutterBottom>
          <strong>Total Amount:</strong> ₹{bookingDetails.totalPrice}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Discount (0%):</strong> ₹{discount.toFixed(2)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Final Price:</strong> ₹{finalPrice.toFixed(2)}
        </Typography>

        {/* Pay Now and Cancel Buttons */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleFakePayment}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Pay Now"}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleCancel}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentPage;