import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { useCart } from "./CartContext";
import { getBuyerProducts } from "../redux/slices/sellerProductSlice";

const placeholderStyle = {
  width: "100%",
  paddingTop: "66.66%", // 3:2 ratio
  background: "#ededed",
  position: "relative",
  borderRadius: 1,
};

export default function Catalog() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { buyerProducts: catalogProducts, loading } = useSelector(
    (state) => state.products
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const { addToCart } = useCart();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const shown = catalogProducts.filter((product) => {
    const matchFilter = filter === "All" || product.category?.name === filter;
    const matchSearch =
      product?.name.toLowerCase().includes(search?.toLowerCase()) ||
      product?.user?.name.toLowerCase().includes(search?.toLowerCase());
    return matchFilter && matchSearch;
  });

  // const handleAdd = (product) => {
  //   addToCart(product);
  // };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    dispatch(getBuyerProducts());
  }, [dispatch]);

  const catalogFilters = [
    { key: "All", label: "All" },
    ...Array.from(new Set(catalogProducts.map((p) => p.category?.name)))
      .filter(Boolean)
      .map((cat) => ({ key: cat, label: cat })),
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#22364a",
            mb: 1,
            fontSize: { xs: 22, md: 28 },
          }}
        >
          Product Catalog
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {catalogFilters.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              clickable
              color={filter === f.key ? "primary" : "default"}
              onClick={() => setFilter(f.key)}
              sx={{
                fontWeight: filter === f.key ? 700 : 500,
                backgroundColor: filter === f.key ? undefined : "#f0f3fb",
              }}
            />
          ))}
        </Box>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            marginBottom: 16,
            width: isMobile ? "100%" : 320,
          }}
        />

        <Grid container spacing={isMobile ? 2 : 4}>
          {shown.length === 0 ? (
            <Typography sx={{ color: "#888", mt: 5, ml: 5 }}>
              No products found.
            </Typography>
          ) : (
            shown.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={placeholderStyle}>
                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={product.name}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleUserClick(product.user)}
                    >
                      Sold by {product?.user?.name || "Unknown Seller"}
                    </Typography>

                    <Typography variant="h6" color="success.main" sx={{ mt: 1 }}>
                      {product?.productVisibility?.[0]?.price
                        ? `₹${product.productVisibility[0].price.toFixed(2)}`
                        : product?.finalPrice
                        ? `₹${product.finalPrice.toFixed(2)}`
                        : "Price Unavailable"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Seller Info Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Seller Details</DialogTitle>
        <DialogContent>
          {selectedUser ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography>
                <strong>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedUser.phone}
              </Typography>
              <Typography>
                <strong>Business Name:</strong> {selectedUser.businessName}
              </Typography>
              <Typography>
                <strong>Business Address:</strong> {selectedUser.businessAddress}
              </Typography>
            </Box>
          ) : (
            <Typography>No seller info available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
