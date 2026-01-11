// SelectModePage.js

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { Person, Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ModeCard = ({ title, description, icon, onClick }) => (
  <Card
    sx={{
      borderRadius: 4,
      boxShadow: 3,
      transition: "transform 0.2s",
      "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
      minHeight: { xs: 180, sm: 200, md: 240 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #ECE9E6 0%, #FFFFFF 100%)",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <CardActionArea>
      <CardContent sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default function SelectModePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "91vh",
        background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 540 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            mb: { xs: 4, sm: 5 },
            fontSize: { xs: "2rem", sm: "2.5rem" },
            color: theme.palette.primary.main,
          }}
        >
          Select Your Mode
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ModeCard
              title="Buyer"
              description="Shop products, track orders, and enjoy exclusive offers tailored for you."
              icon={<Person sx={{ fontSize: 48, color: "#1976d2" }} />}
              onClick={() => navigate("/Buyer-Dashboard")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ModeCard
              title="Seller"
              description="Manage your listings, view analytics, and connect with buyers seamlessly."
              icon={<Storefront sx={{ fontSize: 48, color: "#388e3c" }} />}
              // You can add navigation for Seller here if needed
              onClick={() => navigate("/Seller-Dashboard")}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
