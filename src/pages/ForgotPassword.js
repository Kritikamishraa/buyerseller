import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  forgotPassword,
  clearErrors,
  resetOperation,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.user.operations.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("OTP sent to your email.");
      dispatch(resetOperation("forgotPassword"));
      navigate("/verify-otp", { state: { email } });
    }
  }, [error, success, dispatch, navigate, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  let cardWidth = isSm ? "100%" : isMd ? "70%" : "420px";

  return (
    <Box>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <MUILink
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          Home
        </MUILink>
        <Typography sx={{ color: "#4A90E2", fontWeight: "bold" }}>
          Forgot Password
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: cardWidth,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: isSm ? 3 : 4,
            boxShadow:
              "0px 10px 25px rgba(0,0,0,0.08), 0px 4px 10px rgba(0,0,0,0.05)",
            border: "1px solid rgba(200,200,200,0.4)",
            textAlign: "center",
          }}
        >
          <Typography
            variant={isSm ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              color: "#4A90E2",
              mb: 3,
            }}
          >
            Forgot Password
          </Typography>

          <TextField
            placeholder="Enter Your Email"
            fullWidth
            required
            autoFocus
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                background: "#f5f5f5",
                borderRadius: "10px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: "#4A90E2" }} />
                </InputAdornment>
              ),
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              background: "#4A90E2",
              padding: "12px",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": { background: "#3b7acc" },
            }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
