import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Navbar from "../Components/Navbar";
import heroBgImage from "../Images/christina-wocintechchat-com-Q80LYxv_Tbs-unsplash.jpg";


const Hero = () => (
<>
<Navbar />
  <Box
    sx={{
      width: "100%",
      minHeight: "calc(100vh - 79px)",
      marginTop: "79px",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url(${heroBgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(135deg, rgba(2,29,47,0.95), rgba(2,29,47,0.7))",
        zIndex: 1,
      }}
    />

    <Container maxWidth="xl" sx={{ zIndex: 2, position: "relative" }}>
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: 600, md: 750, lg: 900 },
            textAlign: "center",
          }}
        >
          {/* HERO HEADING */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 600,
              fontSize: {
                xs: "2.4rem",
                sm: "3.5rem",
                md: "3.8rem",
                lg: "4rem",
              },
              lineHeight: { xs: 1.2, md: 1.3 },
              mb: 3,
              color: "#fff",
              whiteSpace: { xs: "normal" },
            }}
          >
            Empower Your MSME with<br></br> Digital Sales & {""}
            <Box
              component="span"
              sx={{
                color: "#2E9E53",
                fontWeight: 900,
              }}
            >
              Credit
            </Box>
          </Typography>

          {/* NEW SUBHEADING */}
          <Typography
            variant="h6"
            sx={{
              color: "#e4e4e4f2",
              fontWeight: 300,
              maxWidth: "720px",
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.2rem" },
              mb: "50px",
            }}
          >
            A modern SaaS platform that unifies product catalogs, orders,
            payments, and buyer performance giving MSMEs a connected, automated,
            and insight driven sales ecosystem.
          </Typography>

          {/* CTA BUTTON */}
          <Button
            variant="contained"
            sx={{
              background: "#2E9E53",
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              borderRadius: "100px",
              textTransform: "none",
              // "&:hover": {
              //   background: "#FFEB39",
              //   transform: "translateY(-3px)",
              //   boxShadow: "0 8px 30px rgba(255, 214, 0, 0.4)",
              // },
            }}
            href="/login"
          >
            Start your free trial
          </Button>
        </Box>
      </Box>
    </Container>
  </Box>
</>
);

export default Hero;
