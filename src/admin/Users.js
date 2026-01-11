import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MUILink,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message as AntMessage } from "antd";
import { Search } from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DownloadIcon from "@mui/icons-material/Download";
import { getAllUsers, deleteUser } from "../redux/slices/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
  const dispatch = useDispatch();
  const { adminAllUsers, loading, error } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (adminAllUsers?.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, adminAllUsers?.length]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await dispatch(deleteUser(id)).unwrap();
          AntMessage.success("User deleted successfully");
        } catch (err) {
          AntMessage.error(err || "Failed to delete user");
        }
      },
    });
  };

  const filteredUsers = adminAllUsers?.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.phone && user.phone.toLowerCase().includes(term)) ||
      (user.bussinessName && user.bussinessName.toLowerCase().includes(term))
    );
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const title = "User Report";
    const currentDate = new Date().toLocaleString();

    // Add title and date
    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 22);

    const tableColumn = [
      "#",
      "Name",
      "Email",
      "Phone",
      "Email Verified",
      "Phone Verified",
      "Business Name",
      "GST Number",
      "Business Address",
    ];

    const tableRows = [];

    filteredUsers.forEach((user, index) => {
      const userData = [
        index + 1,
        user.name || "-",
        user.email || "-",
        user.phone || "-",
        user.emailVerified ? "Yes" : "No",
        user.phoneVerified ? "Yes" : "No",
        user.bussinessName || "-",
        user.gstNumber || "-",
        user.businessAddress || "-",
      ];
      tableRows.push(userData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      margin: { top: 30 },
    });

    // Save the PDF with date in filename
    const fileName = `User_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          mb: 3,
          fontFamily: "Poppins, sans-serif",
          color: "#2C3E50",
          letterSpacing: "2.5px",
          lineHeight: 1.8,
        }}
      >
        Manage Users
      </Typography>

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          mb: 5,
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "fit-content",
        }}
      >
        <MUILink
          component={Link}
          to="/dashboard"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          Dashboard
        </MUILink>
        <Typography sx={{ color: "primary.main" }}>Users</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, business name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Search sx={{ color: "primary.main" }} />
              </IconButton>
            ),
          }}
          sx={{
            // mb: 3,
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
        >
          Export
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>#</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Email Verified</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone Verified</strong>
                </TableCell>
                <TableCell>
                  <strong>Business Name</strong>
                </TableCell>
                <TableCell>
                  <strong>GST Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Business Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers?.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name || "-"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.phoneVerified ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.businessName || "-"}</TableCell>
                  <TableCell>{user.gstNumber || "-"}</TableCell>
                  <TableCell>{user.businessAddress || "-"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Users;
