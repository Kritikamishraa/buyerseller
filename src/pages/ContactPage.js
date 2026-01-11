import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar"; // Navbar yahan import kiya gaya hai

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../redux/slices/contactSlice";

// Material-UI Imports
import {
  Typography, Box, Grid, TextField, Button, Paper, useMediaQuery, 
  Alert, Container, InputAdornment, Collapse, IconButton, Tooltip, Snackbar, 
  Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import { useTheme } from '@mui/material/styles';



// Icon Imports
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';


export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector((state) => state.contact);

  // const [loading, setLoading] = useState(false);
  // Controlled Inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }
    if (error) {
      toast.error(error );
    }
  }, [success, error, message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createContact(formData));
  };


  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.info("copied to clipboard!");
  };

  const contactInfo = [
    { icon: <LocationOnIcon />, title: "Our Office", lines: ["Bhamashah Techno Hub, Jaipur (Raj), India"] },
    { icon: <PhoneIcon />, title: "Contact", lines: [{ text: "+91-8302044892", copyable: true, type: 'Phone' }] },
    { icon: <HeadsetMicIcon />, title: "Customer Support", lines: [{ text: "24/7 Help: Chat & Email support" }] }, 
  ];

  const faqs = [
    {
      question: "What services does BizBridge offer?",
      answer:
        "BizBridge provides AI-driven business solutions including web development, mobile apps, and digital transformation services tailored to your needs.",
    },
    {
      question: "How can I get a customized solution?",
      answer:
        "You can contact our team to discuss your requirements, and we will create a tailored solution to match your business goals.",
    },
    {
      question: "What is the pricing model?",
      answer:
        "Our pricing is project-based. We provide transparent quotes based on the scope and complexity of your project.",
    },
    {
      question: "How does BizBridge support ongoing projects?",
      answer:
        "We assign dedicated managers and use collaboration tools to keep you updated at every stage of the project.",
    },
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          marginTop: { xs: '-56px', sm: '-64px' },
          py: { xs: 8, md: 10 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: 'brightness(0.3)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h1"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    color: '#fff', 
                    textShadow: '1px 1px 5px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' }
                  }}
                >
                  Contact BizBridge
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.8,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                  Let’s build the future of your business together. Reach out to us for innovative solutions and unparalleled support.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- CONTACT SECTION --- */}
      <Box sx={{ bgcolor: "#f9fafb", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          {/* Cards */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4, textAlign: "center", borderRadius: 4, border: "1px solid #eee",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: "0 12px 24px rgba(0,0,0,0.08)" },
                  }}
                >
                  <Box sx={{ fontSize: "3rem", color: "#00C853", mb: 1.5 }}>{info.icon}</Box>
                  <Typography variant="h6" fontWeight={700} mb={1}>{info.title}</Typography>
                  {info.lines.map((line, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                      <Typography variant="body2">{line.text || line}</Typography>
                      {line.copyable && (
                        <Tooltip title={`Copy ${line.type}`}>
                          <IconButton size="small" onClick={() => handleCopy(line.text, line.type)}>
                            <ContentCopyIcon sx={{ fontSize: "1rem", color: "#00C853" }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Enquiry Section */}
          <Box sx={{ py: 6, px: 2, backgroundColor: "#fafbfc" }}>
            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
              {/* Left Column - Contact Info */}
              <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    flex: 1,
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { transform: "translateY(-8px)", boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      gutterBottom
                      sx={{ color: "#00C853" }} 
                    >
                      Contact Information
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 3 }}>
                      Get in touch with us through the details below or send an enquiry
                      directly using the form.
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}>Address:</Typography>
                      <Typography variant="body2" color="text.secondary">
Ashapurna Township, Sheoganj, Rajasthan - 307027 Bhamashah Techno Hub, Sansthanpath, Jhalana Gram, Malviya Nagar, Jaipur - 302017                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}>Phone:</Typography>
                      <Typography variant="body2" color="text.secondary">+91 83020 44892</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}>Email:</Typography>
                      <Typography variant="body2" color="text.secondary">contact@bizbridgetech.com</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.227367375252!2d77.2075673471796!3d28.62067160999039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741446d%3A0x1f4785536486a299!2sConnaught%20Place!5e0!3m2!1sen!2sin!4v1628776890858!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: "8px" }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Google Maps Location"
                    ></iframe>
                  </Box>
                </Paper>
              </Grid>

              {/* Right Column - Enquiry Form */}
              <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 3,
                    backgroundColor: "#fff",
                    flex: 1,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { transform: "translateY(-8px)", boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{ color: "#00C853", textAlign: "center" }} 
                  >
                    BizBridge Enquiry
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}
                  >
                    Fill out the enquiry form and connect directly with the business.
                  </Typography>
                 
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ flex: 1 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Full Name"
                          name="name"
                          required
                          value={formData.name}
                        onChange={handleChange}
                          fullWidth
                          InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Phone"
                          name="phone"
                          required
                          fullWidth
                          value={formData.phone}
                        onChange={handleChange}
                          InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          name="email"
                          fullWidth
                          value={formData.email}
                        onChange={handleChange}
                          InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          name="message"
                          required
                          fullWidth
                           value={formData.message}
                        onChange={handleChange}
                          multiline
                          rows={4}
                          InputProps={{ startAdornment: <InputAdornment position="start"><CreateOutlinedIcon /></InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          sx={{
                            px: 5,
                            py: 1.5,
                            fontSize: "1rem",
                            borderRadius: 2,
                            textTransform: "none",
                            backgroundColor: "#00C853", 
                            "&:hover": {
                              backgroundColor: "#00C853",
                              transform: "scale(1.05)",
                            },
                          }}
                          endIcon={<SendIcon />}
                        >
                          {loading ? "Sending..." : "Send Enquiry"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* --- FAQ Section --- */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
            >
              Frequently Asked <Box component="span" sx={{ color: "#00C853" }}>Questions</Box>
            </Typography>

            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  borderRadius: 2,
                  mb: 2,
                  borderLeft: "5px solid #00C853",
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: "0 8px 25px rgba(0,0,0,0.15)", borderLeft: "5px solid #FFD600" },
                  "&:before": { display: "none" }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    fontWeight={600}
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": { background: "linear-gradient(90deg, #00C853, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}