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
  Avatar,
  Pagination, // ✅ FIXED: import Pagination
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
  getAllProducts,
  deleteProduct,
} from "../redux/slices/sellerProductSlice";

const SellerProduct = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, page, totalPages } = useSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await dispatch(deleteProduct(id)).unwrap();
          AntMessage.success("Product deleted successfully");
          dispatch(getAllProducts({ page: currentPage, limit: 10 }));
        } catch (err) {
          AntMessage.error(err || "Failed to delete product");
        }
      },
    });
  };

  const filteredProducts = allProducts?.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name?.toLowerCase().includes(term);
    const phoneMatch = product.user?.phone?.toLowerCase().includes(term);
    return nameMatch || phoneMatch;
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const title = "Seller Products Report";
    const currentDate = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 22);

    const tableColumn = [
      "#",
      "Product Name",
      "Price",
      "Category",
      "User Name",
      "User Phone",
    ];
    const tableRows = [];

    filteredProducts.forEach((product, index) => {
      const rowData = [
        index + 1,
        product.name || "-",
        product.price || "-",
        product.category?.name || "-",
        product.user?.name || "-",
        product.user?.phone || "-",
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      margin: { top: 30 },
    });

    doc.save(`Seller_Products_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
        Manage Seller Products
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
        <MUILink component={Link} to="/dashboard" sx={{ color: "inherit" }}>
          Dashboard
        </MUILink>
        <Typography color="primary">Seller Products</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by product name & user phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Search sx={{ color: "primary.main" }} />
              </IconButton>
            ),
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
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>GST</TableCell>
                  <TableCell>Buyer Category</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Phone</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts?.map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar
                        src={product.image}
                        alt={product.name}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>{product.category?.gst || "-"}</TableCell>
                    <TableCell>{product.buyerCategory?.name}</TableCell>
                    <TableCell>{product.buyerCategory?.discount || "-"}</TableCell>
                    <TableCell>{product.user?.name}</TableCell>
                    <TableCell>{product.user?.phone}</TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(product._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No Seller Products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SellerProduct;
