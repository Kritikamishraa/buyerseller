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
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllContacts, deleteContact } from "../redux/slices/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
const { contactList, loading } = useSelector((state) => state.contact);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (contactList?.length === 0) {
      dispatch(getAllContacts());
    }
  }, [dispatch, contactList?.length]);


  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this contact?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await dispatch(deleteContact(id)).unwrap();
          AntMessage.success("Contact deleted successfully");
        } catch (err) {
          AntMessage.error(err || "Failed to delete contact");
        }
      },
    });
  };

  const filteredContacts = contactList?.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      (contact.name && contact.name.toLowerCase().includes(term)) ||
      (contact.email && contact.email.toLowerCase().includes(term)) ||
      (contact.phone && contact.phone.toLowerCase().includes(term))
    );
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const title = "Contact Report";
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
      "message",
    ];

    const tableRows = [];

    filteredContacts.forEach((contact, index) => {
      const contactData = [
        index + 1,
        contact.name || "-",
        contact.email || "-",
        contact.phone || "-",
        contact.message || "-",
      ];
      tableRows.push(contactData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      margin: { top: 30 },
    });

    // Save the PDF with date in filename
    const fileName = `Contact_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
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
        Manage Contacts
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
        <Typography sx={{ color: "primary.main" }}>Contacts</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, or phone"
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
                  <strong>Message</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts?.map((contact, index) => (
                <TableRow key={contact._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{contact.name || "-"}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone || "-"}</TableCell>
                  <TableCell>{contact.message || "-"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(contact._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredContacts?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No contact found.
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

export default Contact;
