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
import {
  adminGetAllSellerCategories,
  deleteSellerCategory,
} from "../redux/slices/sellerCategoriesSlice";

const SellerCategories = () => {
  const dispatch = useDispatch();
  const { adminCategories, loading } = useSelector(
    (state) => state.sellerCategory
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(adminGetAllSellerCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await dispatch(deleteSellerCategory(id)).unwrap();
          AntMessage.success("Category deleted successfully");
          dispatch(adminGetAllSellerCategories());
        } catch (err) {
          AntMessage.error(err || "Failed to delete category");
        }
      },
    });
  };

  const filteredCategories = adminCategories?.filter((category) => {
    const term = searchTerm.toLowerCase();
    return category.name?.toLowerCase().includes(term);
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const title = "Seller Categories Report";
    const currentDate = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 22);

    const tableColumn = [
      "#",
      "Category Name",
      "GST",
      "User Name",
      "User Email",
      "User Phone",
    ];
    const tableRows = [];

    filteredCategories.forEach((cat, index) => {
      const rowData = [
        index + 1,
        cat.name || "-",
        cat.gst || "-",
        cat.user?.name || "-",
        cat.user?.email || "-",
        cat.user?.phone,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      margin: { top: 30 },
    });

    doc.save(`Seller_Categories_${new Date().toISOString().slice(0, 10)}.pdf`);
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
        Manage Seller Categories
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
        <Typography sx={{ color: "primary.main" }}>
          Seller Categories
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by category name"
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
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
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
                  <strong>Category Name</strong>
                </TableCell>
                <TableCell>
                  <strong>GST</strong>
                </TableCell>
                <TableCell>
                  <strong>User Name</strong>
                </TableCell>
                <TableCell>
                  <strong>User Email</strong>
                </TableCell>
                <TableCell>
                  <strong>User Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>CreatedAt</strong>
                </TableCell>

                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories?.map((cat, index) => (
                <TableRow key={cat._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.gst}</TableCell>
                  <TableCell>{cat.user?.name}</TableCell>
                  <TableCell>{cat.user?.email}</TableCell>
                  <TableCell>{cat.user?.phone}</TableCell>
                  <TableCell>
                    {new Date(cat.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleDelete(cat._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCategories?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Seller Categories found.
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

export default SellerCategories;
