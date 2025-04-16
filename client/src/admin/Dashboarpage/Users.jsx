import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import AddUserDialog from "./AddUserDialog";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({ name: "", email: "", password: "" });

  // Fetch All Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users.");
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Delete User
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  // Open Show User Details Dialog
  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  // Close Show User Details Dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  // Open Add User Dialog
  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };

  // Close Add User Dialog
  const handleCloseAddUserDialog = () => {
    setAddUserDialogOpen(false);
  };

  // Handle Add New User
  const handleAddNewUser = async (newUser) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/auth/signup", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data]);
      toast.success("User added successfully!");
      handleCloseAddUserDialog();
    } catch (error) {
      toast.error("Failed to add user.");
    }
  };

  // Open Edit User Dialog
  const handleEdit = (user) => {
    setEditUserData({ name: user.name, email: user.email, password: "" });
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  // Close Edit User Dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  // Handle Edit User
  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedUser = {
        name: editUserData.name,
        email: editUserData.email,
      };

      if (editUserData.password) {
        updatedUser.password = editUserData.password;
      }

      await axios.put(`http://localhost:5000/api/auth/${selectedUser._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.map((user) => (user._id === selectedUser._id ? { ...user, ...updatedUser } : user)));
      toast.success("User updated successfully!");
      handleCloseEditDialog();
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={handleAddUser}>
        Add New User
      </Button>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id || user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleShowDetails(user)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show User Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <DialogContentText>
                <strong>Email:</strong> {selectedUser.email}
              </DialogContentText>
              <DialogContentText>
                <strong>Name:</strong> {selectedUser.name}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={editUserData.name} onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" value={editUserData.email} onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="New Password" type="password" onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
          <Button onClick={handleEditUser} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <AddUserDialog open={addUserDialogOpen} onClose={handleCloseAddUserDialog} onAddUser={handleAddNewUser} />
    </Box>
  );
};

export default Users;
