import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useSelector, useDispatch } from "react-redux";
import {
  setTicketForm,
  resetForm,
  createSupportTicket,
} from "../redux/slices/supportSlice";
import { toast } from "react-toastify"; // Optional: for user feedback

export default function SupportPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { subject, description } = useSelector(
    (state) => state.support.ticketForm
  );
  const loading = useSelector((state) => state.support.loading);
  const error = useSelector((state) => state.support.error);

  const supportOptions = [
    {
      icon: <HelpOutlineIcon fontSize="large" color="primary" />,
      title: "FAQ",
      desc: "Find answers to frequently asked questions.",
    },
    {
      icon: (
        <ChatBubbleOutlineIcon fontSize="large" sx={{ color: "#1976d2" }} />
      ),
      title: "Live Chat",
      desc: "Chat with a support agent for immediate help.",
    },
    {
      icon: <SupportAgentIcon fontSize="large" sx={{ color: "#1976d2" }} />,
      title: "Support Ticket",
      desc: "Create a new ticket for your issue.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createSupportTicket({ subject, description })).unwrap();
      toast.success("Support ticket created successfully!");
      dispatch(resetForm());
    } catch (err) {
      toast.error(error || "Failed to create support ticket");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          paddingRight: "10px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ mb: 3, color: "#13131F", fontWeight: 700 }}
        >
          Help & Support
        </Typography>

        {/* Support Option Cards */}
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          justifyContent={isMobile ? "center" : "flex-end"}
          sx={{
            width: "100%",
            mx: 0,
          }}
        >
          {supportOptions.map(({ icon, title, desc }, i) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={i}
              sx={{
                width: "100%",
                mx: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  height: 140,
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(80, 80, 80, 0.04)",
                }}
              >
                <Box>{icon}</Box>
                <Typography
                  variant="h6"
                  sx={{ mt: 0.5, fontWeight: "bold", color: "#192233" }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, color: "#567" }}
                >
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Support Ticket Form */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Submit a Support Ticket
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "#547" }}>
            Describe your issue in detail and our team will get back to you.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              placeholder="Subject (e.g., Issue with Order #ORD002)"
              variant="outlined"
              size="small"
              fullWidth
              multiline={false}
              sx={{ bgcolor: "#f5f7fa", borderRadius: 2 }}
              value={subject}
              onChange={(e) =>
                dispatch(setTicketForm({ subject: e.target.value }))
              }
            />
            <TextField
              placeholder="Please describe your issue..."
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={6}
              sx={{ bgcolor: "#f5f7fa", borderRadius: 2 }}
              value={description}
              onChange={(e) =>
                dispatch(setTicketForm({ description: e.target.value }))
              }
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#125ea8" },
                textTransform: "none",
              }}
            >
              Submit Ticket
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
