import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";


export default function AdvancedAboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const GREEN_ACCENT = '#28a745';

  return (
    <Box sx={{ bgcolor: "#f9fafb", width: '100%' }}>
      <Container maxWidth="xl" sx={{
        px: { xs: 3, sm: 6, md: 10, lg: 16 },
        py: { xs: 3, sm: 6, md: 8, lg: 10 },
      }}>

        <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              fontWeight={800}
              sx={{
                color: '#101828', textAlign: { xs: 'center', md: 'left' }, mb: "15px",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
              }}
            >
              Who We <Box component="span" sx={{ color: GREEN_ACCENT }}>Are</Box>
            </Typography>


            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.8, textAlign: { xs: 'center', md: 'left' }, mb: 4, color: "#8b8e94",
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              <p>We are a technology-driven company dedicated to simplifying, modernizing, and transforming how businesses operate in today’s digital landscape.
              </p>
              <p style={{ marginTop: "10px" }}>Our mission is to make buying, selling, and managing operations easier, faster, and more accessible for growing businesses. By combining innovation with deep industry understanding,
                we help companies adopt smarter systems that save time, reduce operational effort, and enhance decision-making.</p>

            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1470&q=80"
              alt="Our Team"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
