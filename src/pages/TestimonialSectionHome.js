import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Rating,
  CircularProgress,
  Button,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Link as RouterLink } from "react-router-dom"; // Import Link for navigation

// --- MOCK TESTIMONIALS (SAMPLE DATA) ---
const mockTestimonials = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer Name ${i + 1}`,
  role: i % 3 === 0 ? "Startup Founder" : (i % 3 === 1 ? "Marketing Head" : "Tech Lead"),
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  quote: "BizBridge has completely transformed our workflow. Their tools are intuitive and powerful, saving us countless hours. Highly recommended for any growing business!",
  rating: 4.5 + (i % 5) / 10,
}));

// --- Animation variants for Framer Motion ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const TestimonialSectionHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setTestimonials(mockTestimonials);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show only the first 4 testimonials on the home page
  const visibleTestimonials = testimonials.slice(0, 4);

  return (
    <Box
      sx={{
        background: "#f9fafb",
        width: "100%",
      }}
    >
      <Container maxWidth="xl" sx={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        px: { xs: 3, sm: 6, md: 10, lg: 16 },
        py: { xs: 3, sm: 6, md: 8, lg: 10 },
      }}>
        {/* Section Title */}
        <Box textAlign="center">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
              color: "#101828",
              lineHeight: 1.3,
              mb: "10px",
            }}
          >
            What Our <Box component="span" sx={{ color: '#2E9E53' }}>Clients Say</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#8b8e94",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 650,
              mx: "auto",
            }}
          >
            Discover how businesses like yours have achieved success and growth by partnering with BizBridge. Real stories, real results.
          </Typography>
        </Box>

        {loading && (
          <Box textAlign="center" sx={{ py: 6 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading Testimonials...</Typography>
          </Box>
        )}

        {!loading && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid
                container
                spacing={isMobile ? 3 : 4}
                justifyContent="center"
                alignItems="stretch"
              >
                {visibleTestimonials.map((t) => (
                  <Grid item xs={12} sm={6} md={3} key={t.id}>
                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                      <Card
                        sx={{
                          height: "100%",
                          borderRadius: "12px",
                          boxShadow: "none",
                          border: "1px solid #e5e7eb",
                          display: 'flex',
                          flexDirection: 'column',
                          // transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                          // '&:hover': {
                          //   transform: 'translateY(-8px)',
                          //   boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                          //   borderColor: '#28a745',
                          // }
                        }}
                      >
                        <CardContent sx={{ textAlign: "left", p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* <FormatQuoteIcon sx={{ color: '#28a745', fontSize: 40, mb: 2 }} /> */}
                          <Rating value={t.rating} readOnly precision={0.5} size="small" sx={{ marginBottom:"20px" }} />
                          <Typography
                            variant="body2"
                            color="##494949"
                            sx={{ marginBottom:"20px", flexGrow: 1 }}
                          >
                            {`${t.quote}`}
                          </Typography>

                          <Box sx={{ mt: 'auto' }}>
                            
                            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <Avatar
                                src={t.avatar}
                                alt={t.name}
                                sx={{ width: 42, height: 42 }}
                              />
                              <Box sx={{ display: "flex",flexDirection:"column", alignItems: "flex-start", gap: 0 }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {t.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {t.role}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
            <Box textAlign="center" sx={{  }}>
              <Button
                component={RouterLink}
                to="/testimonials" 
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: "#0B4064",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "none",
                  // "&:hover": {
                  //   bgcolor: "#218838",
                  //   boxShadow:"none",
                  // },
                }}
              >
                View All Testimonials
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialSectionHome;