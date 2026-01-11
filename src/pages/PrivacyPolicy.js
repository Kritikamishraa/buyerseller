import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import Navbar from "../Components/Navbar"; // adjust path if needed
import Footer from "../Components/Footer"; // adjust path if needed
import ScrollToTop from "../Components/ScrollToTop"; // adjust path if needed
import logo from "../Images/logo.jpg"; 
const logoUrl = logo;


// HeaderSection component updated for dark overlay, white text, and slightly smaller image height
const HeaderSection = ({ image, title, description }) => {
  return (
    <Box
      sx={{
        // --- CHANGES FOR DARK OVERLAY START HERE ---
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`, // Dark overlay
        // --- CHANGES END HERE ---
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh", // <<<--- IMAGE HEIGHT KO WAPAS ADJUST KIYA (70vh)
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        textAlign: "left",
        px: { xs: 4, md: 12 },
        py: 3,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "2.5rem", md: "4rem" },
          maxWidth: "800px",
          color: "white", // <<<--- TITLE KA COLOR WHITE RAKHA HAI
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          maxWidth: "700px",
          fontSize: { xs: "1rem", md: "1.5rem" },
          color: "white", // <<<--- DESCRIPTION KA COLOR WHITE RAKHA HAI
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const PrivacyPolicy = () => {
  // Data for the header
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c"; // Ye image wahi rahegi
  const titleText = "Privacy Policy";
  const descriptionText =
    "We are committed to protecting your personal and business information. This policy explains how we collect, use, and safeguard your data.";

  return (
    <>
      <ScrollToTop />
      {/* Navbar ki positioning mein koi badlav nahi kiya hai */}
      <Box sx={{ position: "absolute", top: 0, width: "100%", zIndex: 1100 }}>
        <Navbar />
      </Box>

      <Box>
        <HeaderSection
          image={imageUrl}
          title={titleText}
          description={descriptionText}
        />
      </Box>

      <Box
        sx={{
          py: 4,
          backgroundColor: "#f9f9f9",
          width: "100%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            boxShadow: "none",
            backgroundColor: 'transparent'
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, textAlign: "left", fontWeight: "bold" }}
          >
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We may collect personal information such as your name, email
            address, company details, contact information, payment details, and
            any other data you choose to provide. We also collect non-personal
            data such as browser type, IP address, and usage statistics for
            analytics purposes.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We use your information to operate, improve, and personalize our
            services, facilitate business connections, process transactions,
            send important updates, and comply with legal obligations.
          </Typography>

          {/* ... privacy policy ke baaki sections ... */}

          <Typography variant="body1" sx={{ mt: 4, textAlign: "left" }}>
            If you have any questions or concerns about this Privacy Policy,
            contact us at: <strong>support@bizbridge.com</strong>
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default PrivacyPolicy;