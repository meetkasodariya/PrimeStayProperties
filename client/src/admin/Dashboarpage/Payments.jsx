import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/payments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      //  console.log("Backend Response:", response.data); // Log the response data

        // Ensure the data is an array
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          console.error("Expected an array but got:", typeof response.data);
          setPayments([]); // Set an empty array as fallback
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "_id", headerName: "Payment ID", width: 200 }, // Use _id as the unique identifier
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "paymentMethod", headerName: "Payment Method", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "createdAt", headerName: "Date", width: 120 }, // Add createdAt field
  ];

  return    (
    <Box sx={{ height:"auto", width: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Details
      </Typography>
      <DataGrid
        rows={payments} // Ensure this is an array
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id} // Use _id as the unique identifier
        loading={loading} // Show loading spinner
      />
    </Box>
  );
};

export default AdminPayments;