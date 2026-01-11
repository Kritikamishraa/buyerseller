import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const HeaderSection = ({ image, title, description }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: 220, sm: 320, md: 400 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(30, 26, 19, 0.55)",
          zIndex: 1,
        }}
      />
      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
          py: { xs: 4, md: 8 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: 2,
            mb: { xs: 1.5, md: 3 },
            fontSize: { xs: "2rem", sm: "2.7rem", md: "3.3rem" },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </Typography>
      </Container>
    </Box>
  );
};

export default HeaderSection;
