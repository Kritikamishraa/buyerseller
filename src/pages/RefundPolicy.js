import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import Navbar from "../Components/Navbar"; // adjust path if needed
import Footer from "../Components/Footer"; // adjust path if needed
import ScrollToTop from "../Components/ScrollToTop"; // adjust path if needed
import logo from "../Images/logo.jpg"; 

const logoUrl = logo;

// DUMMY HeaderSection component (agar aapke paas iska code nahi hai)
// Agar aapke paas HeaderSection ka original code hai, toh usmein yeh styling add karein.
const HeaderSection = ({ image, title, description }) => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`, // Dark overlay
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh", // Image height set to 70% of viewport height
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


const RefundPolicy = () => {
  // Data to pass as props to HeaderSection - Updated
  const imageUrl =
    "https://images.unsplash.com/photo-1556742044-3c52d6e88c62"; // Using your provided image URL
  const titleText = "Refund Policy"; // Title simplified
  const descriptionText =
    "At BizBridge, we are committed to providing transparent and reliable services. This policy outlines the conditions under which refunds may be granted to ensure fairness and clarity for all our users."; // Description for header

  return (
    <>
      <ScrollToTop />
      {/* Navbar को image के ऊपर रखने के लिए position absolute */}
      <Box sx={{ position: "absolute", top: 0, width: "100%", zIndex: 1100 }}>
        <Navbar />
      </Box>

      {/* Header Section - अब यह full image और left-aligned content के साथ दिखेगा */}
      <Box>
        <HeaderSection
          image={imageUrl}
          title={titleText}
          description={descriptionText}
        />
      </Box>

      {/* Refund Policy Content */}
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
            maxWidth: "1000px", // Max width set for better readability
            margin: "0 auto",
            boxShadow: "none",
            borderRadius: 0,
            boxSizing: "border-box",
            backgroundColor: 'transparent' // Background transparent for parent Box color
          }}
        >
          {/* Page Title - Removed as it's now in the HeaderSection */}
          {/* <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              fontSize: { xs: "2rem", md: "2.5rem" },
              mb: 3,
            }}
          >
            BizBridge - Refund Policy
          </Typography> */}

          {/* Refund Policy Content - Initial Paragraph */}
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            At BizBridge, we strive to provide the best possible services and
            ensure complete satisfaction for our users. However, we understand
            that situations may arise where a refund is required. Please read
            our Refund Policy carefully to understand when and how refunds may
            apply.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            1. Eligibility for Refunds
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            Refunds are applicable only under specific circumstances where the
            services have not been delivered as promised or in case of technical
            errors on our platform. Refund requests will be evaluated on a
            case-by-case basis.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            2. Non-Refundable Services
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            Certain services such as consultation, personalized business
            matchmaking, and completed transactions are non-refundable once
            delivered. Please ensure to review details before making any
            payments.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            3. Refund Process
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            If you are eligible for a refund, you must submit a request within{" "}
            <b>7 working days</b> of the transaction. Once approved, the refund
            will be processed to your original payment method within 5–10
            business days.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            4. Contact for Refunds
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            To request a refund, please reach out to our support team at{" "}
            <b>support@bizbridge.com</b> with your transaction details. Our team
            will verify the request and update you on the status of your refund.
          </Typography>

          <Typography variant="body1" sx={{ mt: 4, textAlign: "left" }}>
            By using BizBridge, you acknowledge and agree to this Refund Policy.
            This policy may be updated from time to time, and we encourage users
            to review it periodically.
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default RefundPolicy;