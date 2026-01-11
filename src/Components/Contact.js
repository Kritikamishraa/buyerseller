import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../redux/slices/contactSlice"; 

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  // Redux state
  const { loading, success, error } = useSelector((state) => state.contact);

  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch API call
    dispatch(createContact(formData));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 2,
          bgcolor: "#fff",
          p: { xs: 3, sm: 5, md: 6 },
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: 800,
            mb: 3,
            textAlign: "center",
            color: "#28a745",
          }}
        >
          Send Us an Enquiry
        </Typography>

        {/* Contact Form */}
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="medium"
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                variant="outlined"
                sx={{ bgcolor: "#f7f7f9" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="medium"
                label="Your Email (Optional)"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                type="email"
                variant="outlined"
                sx={{ bgcolor: "#f7f7f9" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="medium"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                type="tel"
                variant="outlined"
                sx={{ bgcolor: "#f7f7f9" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                minRows={4}
                maxRows={10}
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                variant="outlined"
                sx={{ bgcolor: "#f7f7f9" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                disabled={loading}
                sx={{
                  fontWeight: 700,
                  backgroundColor: "#28a745",
                  color: "#fff",
                  py: 1.3,
                  borderRadius: 2,
                  fontSize: "1rem",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#218838",
                  },
                }}
              >
                {loading ? "Sending..." : "SEND MESSAGE"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Success / Error Messages */}
        {success && (
          <Typography
            sx={{ mt: 2, color: "green", textAlign: "center", fontWeight: 600 }}
          >
            ✅ Message sent successfully!
          </Typography>
        )}
        {error && (
          <Typography
            sx={{ mt: 2, color: "red", textAlign: "center", fontWeight: 600 }}
          >
            ❌ {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Contact;
