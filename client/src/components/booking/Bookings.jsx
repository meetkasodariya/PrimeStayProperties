/*import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Grid,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching bookings...");

        const response = await axios.get("http://localhost:5000/api/bookings/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Bookings Data:", response.data); // Debugging API response

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error("Invalid bookings data format:", response.data);
          setError("Invalid bookings data format.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.response?.data?.message || "Failed to fetch bookings. Please try again.");
        toast.error(error.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false); // Ensure loading is stopped after the request
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography variant="body1">You have no bookings yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => {
            // Safely access nested fields with fallbacks
            const listingImage = booking?.listing?.image || "https://picsum.photos/800/400";
            const listingTitle = booking?.listing?.title || "No Title Available";
            const userName = booking?.user?.name || "Unknown User";
            const checkInDate = formatDate(booking?.startDate);
            const checkOutDate = formatDate(booking?.endDate);
            const totalPrice = booking?.totalPrice ? `₹${booking.totalPrice}` : "Price Not Available";
            const status = booking?.status || "Unknown";

            return (
              <Grid item key={booking._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={listingImage}
                    alt={listingTitle}
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/800/400"; // Fallback image
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {listingTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Booked by: <strong>{userName}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Check-in: {checkInDate}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Check-out: {checkOutDate}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Total Price: {totalPrice}
                    </Typography>
                    <Chip
                      label={status}
                      sx={{
                        backgroundColor:
                          status === "confirmed"
                            ? "#4caf50"
                            : status === "canceled"
                            ? "#f44336"
                            : "#ff9800",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Bookings;*/



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";

// PDFMake initialization
let pdfMake;

const initializePdfMake = async () => {
  try {
    if (!pdfMake) {
      // Dynamic imports to handle different module systems
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const vfsFontModule = await import("pdfmake/build/vfs_fonts");
      
      pdfMake = pdfMakeModule.default || pdfMakeModule;
      const pdfFonts = vfsFontModule.default || vfsFontModule;
      
      // Handle different vfs locations in different versions
      if (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      } else if (pdfFonts.vfs) {
        pdfMake.vfs = pdfFonts.vfs;
      } else {
        // Fallback to empty vfs
        console.warn("PDFMake fonts not found, using empty vfs");
        pdfMake.vfs = {};
      }
      
      // Set the default font
      pdfMake.fonts = {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-MediumItalic.ttf'
        }
      };
    }
    return true;
  } catch (error) {
    console.error("PDFMake initialization failed:", error);
    return false;
  }
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  // Initialize PDFMake when component mounts
  useEffect(() => {
    const init = async () => {
      const success = await initializePdfMake();
      setPdfReady(success);
    };
    init();
  }, []);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/bookings/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error("Invalid bookings data format:", response.data);
          setError("Invalid bookings data format.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.response?.data?.message || "Failed to fetch bookings. Please try again.");
        toast.error(error.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  const generateInvoice = async (booking) => {
    if (!booking || !pdfReady) {
      toast.error("PDF generator is not ready yet. Please try again.");
      return;
    }

    setGeneratingInvoice(true);
    try {
      const nights = Math.ceil(
        (new Date(booking.endDate) - new Date(booking.startDate)) / 
        (1000 * 60 * 60 * 24)
      );
      const pricePerNight = booking.totalPrice / nights;

      const invoiceData = {
        invoiceNumber: `INV-${booking._id.slice(-6).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        company: {
          name: "PrimeStay Properties",
          address: "123 Vacation Lane, Suite 100",
          city: "Bhavnagar",
          country: "india",
          phone: "+91 8752125694",
          email: "info@primestay.com"
        },
        customer: {
          name: booking.user?.name || "Guest",
          email: booking.user?.email || "guest@example.com"
        },
        booking: {
          id: booking._id,
          destination: `${booking.listing?.title || "Unknown"}, ${booking.listing?.city || "Unknown"}, ${booking.listing?.country || "Unknown"}`,
          checkIn: formatDate(booking.startDate),
          checkOut: formatDate(booking.endDate),
          nights: nights,
          price: pricePerNight,
          total: booking.totalPrice,
          discount: 0,
        }
      };

      const docDefinition = {
        content: [
          { text: 'PRIMESTAY PROPERTIES', style: 'header' },
          { text: 'BOOKING INVOICE', style: 'subheader' },
          { text: `Invoice #: ${invoiceData.invoiceNumber}`, style: 'invoiceNumber' },
          { text: `Date: ${invoiceData.date}`, style: 'invoiceDate' },
          
          { text: '\n\n' },
          
          {
            columns: [
              {
                width: '*',
                text: [
                  { text: 'Guest:\n', style: 'label' },
                  { text: `${invoiceData.customer.name}\n`, style: 'customerName' },
                  { text: `${invoiceData.customer.email}\n\n`, style: 'customerEmail' },
                ]
              },
              {
                width: '*',
                text: [
                  { text: 'From:\n', style: 'label' },
                  { text: `${invoiceData.company.name}\n`, style: 'companyName' },
                  { text: `${invoiceData.company.address}\n` },
                  { text: `${invoiceData.company.city}, ${invoiceData.company.country}\n` },
                  { text: `Phone: ${invoiceData.company.phone}\n` },
                  { text: `Email: ${invoiceData.company.email}\n` },
                ]
              }
            ]
          },
          
          { text: '\n\n' },
          
          { text: 'Booking Details', style: 'sectionHeader' },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Property', invoiceData.booking.destination],
                ['Check-in Date', invoiceData.booking.checkIn],
                ['Check-out Date', invoiceData.booking.checkOut],
                ['Number of Nights', invoiceData.booking.nights],
              ]
            }
          },
          
          { text: '\n\n' },
          
          { text: 'Payment Summary', style: 'sectionHeader' },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Price per Night', `₹${invoiceData.booking.price.toFixed(2)}`],
                ['Total Nights', invoiceData.booking.nights],
                ['Subtotal', `₹${(invoiceData.booking.price * invoiceData.booking.nights).toFixed(2)}`],
                ['Discount', `₹${invoiceData.booking.discount.toFixed(2)}`],
                [
                  { text: 'Total', bold: true },
                  { text: `₹${invoiceData.booking.total.toFixed(2)}`, bold: true }
                ],
              ]
            }
          },
          
          { text: '\n\nThank you for choosing PrimeStay Properties!', style: 'footer' },
          { text: '\nCancellation Policy: Full refund if cancelled at least 7 days before check-in.', style: 'policy' }
        ],
        styles: {
          header: { fontSize: 24, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
          subheader: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
          invoiceNumber: { fontSize: 12, alignment: 'right' },
          invoiceDate: { fontSize: 12, alignment: 'right' },
          label: { fontSize: 14, bold: true, margin: [0, 0, 0, 5] },
          customerName: { fontSize: 14 },
          customerEmail: { fontSize: 12 },
          companyName: { fontSize: 14 },
          sectionHeader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
          footer: { fontSize: 12, italics: true, alignment: 'center' },
          policy: { fontSize: 10, alignment: 'center' }
        },
        defaultStyle: {
          font: 'Roboto'
        }
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBlob((blob) => {
        saveAs(blob, `invoice_${invoiceData.invoiceNumber}.pdf`);
      });

    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice.");
    } finally {
      setGeneratingInvoice(false);
    }
  };

  const handleOpenInvoiceDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenInvoiceDialog(true);
  };

  const handleCloseInvoiceDialog = () => {
    setOpenInvoiceDialog(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Bookings
      </Typography>

      {!pdfReady && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Preparing PDF generator... Please wait
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Typography variant="body1">You have no bookings yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => {
            const listingImage = booking?.listing?.image || "https://picsum.photos/800/400";
            const listingTitle = booking?.listing?.title || "No Title Available";
            const userName = booking?.user?.name || "Unknown User";
            const checkInDate = formatDate(booking?.startDate);
            const checkOutDate = formatDate(booking?.endDate);
            const totalPrice = booking?.totalPrice ? `₹${booking.totalPrice}` : "Price Not Available";
            const status = booking?.status || "Unknown";

            return (
              <Grid item key={booking._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {listingTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Booked by: <strong>{userName}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Check-in: {checkInDate}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Check-out: {checkOutDate}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Total Price: {totalPrice}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={status}
                        sx={{
                          backgroundColor:
                            status === "confirmed" ? "#4caf50" :
                            status === "canceled" ? "#f44336" : "#ff9800",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                      {status === "confirmed" && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenInvoiceDialog(booking)}
                          disabled={generatingInvoice || !pdfReady}
                        >
                          {generatingInvoice ? <CircularProgress size={20} /> : 'Download Invoice'}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={openInvoiceDialog} onClose={handleCloseInvoiceDialog}>
        <DialogTitle>Booking Invoice</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {pdfReady
              ? "Would you like to download the invoice for this booking?"
              : "PDF generator is initializing. Please wait..."}
          </Typography>
          {selectedBooking && (
            <Typography variant="body2" color="textSecondary">
              Booking ID: {selectedBooking._id}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvoiceDialog}>Cancel</Button>
          <Button
            onClick={() => {
              generateInvoice(selectedBooking);
              handleCloseInvoiceDialog();
            }}
            color="primary"
            variant="contained"
            disabled={generatingInvoice || !pdfReady}
          >
            {generatingInvoice ? <CircularProgress size={20} /> : 'Download Invoice'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bookings;