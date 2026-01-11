import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ShoppingCart, Assignment, LocalOffer } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function BuyerDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const navigate = useNavigate();

  const handleBrowseCatalog = () => {
    navigate("/buyer-dashboard/buyer-catalog");
  };

  const handleViewMyOrders = () => {
    navigate("/buyer-dashboard/my-orders");
  }

  const handlePaymentHistory = () => {
    navigate("/buyer-dashboard/ledger");
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          paddingRight: "10px",
        }}
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: 22, md: 28 }}
          sx={{ mb: { xs: 2, md: 3 }, color: "#22364a" }}
        >
          Buyer Dashboard
        </Typography>

        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} md={8}>
            {/* <Card
              sx={{
                p: { xs: 0, md: 3 },
                mb: 3,
                borderRadius: 3,
                background: "#fff",
                boxShadow: 0,
                width: "100%",
              }}
            >
              <Typography
                fontWeight={700}
                fontSize={19}
                color="#22364a"
                sx={{ mb: 1, ml: 2 }}
              >
                Featured Ads & Offers
              </Typography>
              <Box
                sx={{
                  py: { xs: 2, sm: 4, md: 5 },
                  background: "#888",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: { xs: 110, sm: 170, md: 200 },
                  color: "#fff",
                  fontWeight: 700,
                  width: "100%",
                  fontSize: { xs: 22, sm: 32, md: 44 },
                  textAlign: "center",
                  ml: { xs: 0, sm: 0 },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  800 × 400
                  <br />
                  <Typography
                    fontWeight={700}
                    fontSize={{ xs: 16, sm: 19, md: 22 }}
                    sx={{ mt: 1 }}
                    color="#fff"
                  >
                    Diwali Special: 20% off on all oils!
                  </Typography>
                  <Typography
                    color="#ededed"
                    fontWeight={500}
                    fontSize={14}
                    sx={{ mt: 0.5 }}
                  >
                    From Sharma Wholesalers
                  </Typography>
                </Box>
              </Box>
            </Card> */}

            {/* Order Summary */}
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                background: "#fff",
                boxShadow: 0,
                width: "90%",
                mr: { xs: 0, sm: 0 }, 
              }}
            >
              <Typography
                fontWeight={700}
                fontSize={19}
                color="#22364a"
                sx={{ mb: 1.2 }}
              >
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  width: "100%",
                  ml: { xs: 0, sm: 0 },
                }}
              >
                {[
                  { label: "Pending Orders", value: 3 },
                  { label: "Shipped", value: 1 },
                  { label: "Delivered", value: 25 },
                ].map(({ label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      background: "#e9f0ff",
                      borderRadius: 2,
                      flex: "1 1 120px",
                      minWidth: 80,
                      py: 2,
                      px: 2,
                      textAlign: "left",
                      mb: isMobile ? 1.5 : 0,
                    }}
                  >
                    <Typography
                      color="#22364a"
                      fontWeight={500}
                      fontSize={15}
                      sx={{ mb: 1 }}
                    >
                      {label}
                    </Typography>
                    <Typography color="#2961e1" fontWeight={700} fontSize={24}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Right Area: Quick Actions & Top Sellers */}
          <Grid item xs={12} md={4}>
            {/* Quick Actions */}
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                mb: 3,
                borderRadius: 3,
                background: "#fff",
                boxShadow: 0,
                width: "90%",
                ml: { xs: 0, sm: 0 },

                marginLeft: { xs: 0, sm: 0, md: 4, lg: 6 },
              }}
            >
              <Typography
                fontWeight={700}
                fontSize={19}
                color="#22364a"
                sx={{ mb: 1.5 }}
              >
                Quick Actions
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart />}
                 onClick={handleBrowseCatalog} 
                sx={{
                  textTransform: "none",
                  mb: 1.5,
                  background: "#fb8900",
                  fontWeight: 700,
                  fontSize: 16,
                  "&:hover": { background: "#d87106" },
                  py: 1.2,
                }}
              >
                Browse Catalog
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Assignment />}
                onClick={handleViewMyOrders} 
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.2,
                  fontSize: 16,
                  mb: 1.5,
                  borderColor: "#abc3dd",
                  color: "#22364a",
                  background: "#f5f8fc",
                  "&:hover": {
                    background: "#d87106",
                    color: "#fff",
                    borderColor: "#d87106",
                  },
                }}
              >
                View My Orders
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LocalOffer />}
                onClick={handlePaymentHistory} 
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.2,
                  fontSize: 16,
                  borderColor: "#abc3dd",
                  color: "#22364a",
                  background: "#f5f8fc",
                  "&:hover": {
                    background: "#d87106",
                    color: "#fff",
                    borderColor: "#d87106",
                  },
                }}
              >
                Payment History
              </Button>
            </Card>

            {/* Top Sellers */}
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                background: "#fff",
                boxShadow: 0,
                width: "90%",
                marginLeft: { xs: 0, sm: 0, md: 4, lg: 6 },
              }}
            >
              <Typography
                fontWeight={700}
                fontSize={19}
                color="#22364a"
                sx={{ mb: 0.2 }}
              >
                Top Sellers
              </Typography>
              <Typography color="#8b99a8" fontSize={14} sx={{ mb: 1.1 }}>
                Your most frequently ordered from sellers.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  "Kumar Kirana Store",
                  "Sharma Textiles",
                  "Singh Electronics",
                ].map((seller) => (
                  <Box
                    key={seller}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography fontSize={15} color="#22364a" fontWeight={500}>
                      {seller}
                    </Typography>
                    <Button
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fb8900",
                        textTransform: "none",
                      }}
                    >
                      View Product
                    </Button>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
