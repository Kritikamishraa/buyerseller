import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import Navbar from "../Components/Navbar"; // adjust path if needed
import Footer from "../Components/Footer"; // adjust path if needed
import ScrollToTop from "../Components/ScrollToTop"; // adjust path if needed
import logo from "../Images/logo.jpg"; 

const logoUrl = logo;

// Reusable HeaderSection component with the desired styling
const HeaderSection = ({ image, title, description }) => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`, // Dark overlay
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh", // Standard header height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start", // Left alignment
        textAlign: "left",
        px: { xs: 4, md: 12 }, // Horizontal padding
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
          color: "white", // White text
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          maxWidth: "700px",
          fontSize: { xs: "1rem", md: "1.5rem" },
          color: "white", // White text
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const TermsOfService = () => {
  // Data for the HeaderSection
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
  const titleText = "Terms of Service";
  const descriptionText =
    "Welcome to BizBridge. These Terms of Service ('Terms') govern your use of our B2B platform, services, and products.";

  return (
    <>
      <ScrollToTop />
      {/* Navbar positioned to float over the header image */}
      <Box sx={{ position: "absolute", top: 0, width: "100%", zIndex: 1100 }}>
        <Navbar />
      </Box>

      {/* Header Section */}
      <Box>
        <HeaderSection
          image={imageUrl}
          title={titleText}
          description={descriptionText}
        />
      </Box>

      {/* Terms of Service Content */}
      <Box
        sx={{
          py: 4,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            width: "100%",
            maxWidth: "1000px", // Max width for better readability
            margin: "0 auto",
            boxShadow: "none",
            borderRadius: 0,
            boxSizing: "border-box",
            backgroundColor: 'transparent',
          }}
        >
          {/* Page Title removed from here as it is now in the HeaderSection */}

          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            Welcome to BizBridge. These Terms of Service ("Terms") govern your
            use of our B2B platform, services, and products.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            By using BizBridge, you agree to comply with these Terms. If you do
            not agree, please do not use our services.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            2. Services Provided
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            BizBridge connects businesses for trade, collaboration, and
            networking. We reserve the right to modify or discontinue services
            at any time.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            3. User Responsibilities
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            You are responsible for all activities under your account, ensuring
            provided information is accurate and lawful.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            4. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            All content, logos, and trademarks remain the property of BizBridge
            unless otherwise stated.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            BizBridge is not liable for business losses, data breaches, or
            outcomes from business transactions made through the platform.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            6. Termination
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We may suspend or terminate your account if you violate these Terms.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            7. Governing Law
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            These Terms are governed by the laws of [Your Country/State].
          </Typography>

          <Typography variant="body1" sx={{ mt: 4, textAlign: "left" }}>
            For questions, contact us at: <strong>support@bizbridge.com</strong>
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default TermsOfService;