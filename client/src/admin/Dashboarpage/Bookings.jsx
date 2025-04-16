import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view bookings.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/bookings/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        setError("Failed to fetch bookings. Please try again later.");
        toast.error(error.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Update booking status (confirm/cancel)
  const updateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to manage bookings.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Booking ${status}ed successfully!`);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || `Failed to ${status} booking.`
      );
    }
  };

  // Define table columns
  const columns = [
    {
      accessorKey: "listing.title",
      header: "Title",
    },
    {
      accessorKey: "startDate",
      header: "Check-in Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "endDate",
      header: "Check-out Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Typography
          sx={{
            color:
              info.getValue() === "confirmed"
                ? "green"
                : info.getValue() === "canceled"
                ? "red"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {info.getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "_id",
      header: "Actions",
      cell: (info) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateBookingStatus(info.getValue(), "confirm")}
            disabled={info.row.original.status === "confirmed"}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateBookingStatus(info.getValue(), "cancel")}
            disabled={info.row.original.status === "canceled"}
          >
            Cancel
          </Button>
        </Box>
      ),
    },
  ];

  // Initialize the table
  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Bookings;