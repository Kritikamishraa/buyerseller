import React from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const offers = [
  {
    category: "Oils",
    title: "Diwali Dhamaka: 20% Off",
    seller: "Sharma Wholesalers",
    desc: "Get a flat 20% discount on all cooking oils. Minimum purchase of ₹5000.",
    expires: "2023-11-15",
    sellerLink: "#",
  },
  {
    category: "Groceries",
    title: "Bulk Buy Bonanza",
    seller: "Kumar Kirana Store",
    desc: "Buy 10kg of Basmati Rice and get 1kg of Sugar absolutely free!",
    expires: "2023-11-20",
    sellerLink: "#",
  },
  {
    category: "Textiles",
    title: "Winter Special",
    seller: "Gupta Textiles",
    desc: "Flat 15% off on all blankets and shawls. Stock up for the cold season.",
    expires: "2023-12-31",
    sellerLink: "#",
  },
];

export default function OffersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          color="text.primary"
          mb={3}
        >
          Active Offers & Schemes
        </Typography>

        <Grid
          container
          spacing={isMobile ? 2 : 4}
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          {offers.map((offer, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  background: "#f8f9fb",
                  boxShadow: "0 2px 8px 0 rgba(80,80,80,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 370,
                  overflow: "hidden",
                }}
              >
                {/* Placeholder Image */}
                <Box
                  sx={{
                    background: "#e9e9e9",
                    height: 170,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    color: "#bdbdbd",
                    fontWeight: 700,
                    letterSpacing: 2,
                    borderBottom: "1px solid #eee",
                    width: "100%",
                  }}
                >
                  400 × 250
                </Box>

                {/* Card Content */}
                <Box
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Chip
                    label={offer.category}
                    sx={{
                      fontWeight: 700,
                      fontSize: 13,
                      mb: 1,
                      width: "max-content",
                      background: "#eceff1",
                    }}
                    size="small"
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="text.primary"
                    gutterBottom
                  >
                    {offer.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={600}
                    sx={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                    component="a"
                    href={offer.sellerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    by {offer.seller}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {offer.desc}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#7e8792", mb: 1 }}
                  >
                    Expires on: {offer.expires}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "#1976d2",
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: 15,
                      py: 1.2,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": { background: "#195fc5" },
                    }}
                  >
                    View Products
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
