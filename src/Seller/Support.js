import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MenuBookOutlined,
  ChatBubbleOutline,
  SupportAgent,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setTicketForm, resetForm, createSupportTicket } from "../redux/slices/supportSlice";
import { toast } from "react-toastify"; // Optional: for user feedback

export default function SellerSupport() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { subject, description } = useSelector((state) => state.support.ticketForm);
  const loading = useSelector((state) => state.support.loading);
  const error = useSelector((state) => state.support.error);

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
        width: "100vw",
        minHeight: "calc(100vh - 58px)",
        backgroundColor: "#f8fafc",
        boxSizing: "border-box",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 4, md: 6 },
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          width: "100%",
          mx: "auto",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          sx={{ color: "#222", fontSize: { xs: 22, md: 25 } }}
        >
          Help & Support
        </Typography>

        {/* Cards Row */}
        <Grid container spacing={2} mb={3}>
          {[
            {
              icon: MenuBookOutlined,
              title: "Seller Guide",
              description: "Find answers and guides on how to use the platform.",
            },
            {
              icon: ChatBubbleOutline,
              title: "Live Chat",
              description: "Chat with our support team for immediate help.",
            },
            {
              icon: SupportAgent,
              title: "Create Ticket",
              description: "Create a new support ticket for your issue.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <Grid item xs={12} sm={4} key={title}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  px: { xs: 2, sm: 3 },
                  py: { xs: 2, sm: 3 },
                  backgroundColor: "#fff",
                  height: "100%",
                  boxShadow: "0 2px 18px 0 rgba(95,134,184,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Icon sx={{ color: "#3066be", fontSize: 28, mr: 1 }} />
                  <Typography variant="h6" fontWeight={700} fontSize={17}>
                    {title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" fontSize={15} fontWeight={500}>
                  {description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Support Ticket Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 },
            backgroundColor: "#fff",
            boxShadow: "0 2px 18px 0 rgba(95,134,184,0.07)",
            mt: 8,
          }}
        >
          <CardContent sx={{ px: 0, py: 0 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={0.7}
              sx={{ fontSize: { xs: 17, md: 19 }, color: "#222" }}
            >
              Submit a Support Ticket
            </Typography>
            <Typography
              sx={{
                color: "#5070f4",
                fontWeight: 500,
                fontSize: 14,
                mb: 2,
              }}
            >
              Describe your issue in detail and our team will get back to you.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={subject}
                    onChange={(e) =>
                      dispatch(setTicketForm({ subject: e.target.value }))
                    }
                    size="small"
                    fullWidth
                    placeholder="Subject (e.g., Payment Issue for PAY003)"
                    variant="outlined"
                    sx={{ bgcolor: "#f5f6f9", borderRadius: 2 }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={description}
                    onChange={(e) =>
                      dispatch(setTicketForm({ description: e.target.value }))
                    }
                    size="small"
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="Please describe your issue in detail..."
                    variant="outlined"
                    sx={{ bgcolor: "#f5f6f9", borderRadius: 2 }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2, mt: 1 }}
                    fullWidth={isMobile}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}