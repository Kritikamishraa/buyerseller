import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  verifyOtp,
  forgotPassword,
  clearErrors,
  resetOperation,
} from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const OTP_EXPIRE_TIME = 180;

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");

  const { loading, error, success, token } = useSelector(
    (state) => state.user.operations.otpVerification
  );

  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_TIME);

  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTimer = () => {
    setTimeLeft(OTP_EXPIRE_TIME);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!email) navigate("/forgot-password");
    startTimer();
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [email, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success && token) {
      dispatch(resetOperation("otpVerification"));
      toast.success("OTP verified successfully.");
      navigate("/reset-password", { state: { token } });
    }
  }, [error, success, token, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
      toast.error("OTP expired! Please resend.");
      return;
    }
    dispatch(verifyOtp({ email, otp }));
  };

  const handleResendOtp = () => {
    if (timeLeft > 0) return;

    setResendLoading(true);

    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => {
        toast.success("OTP resent successfully!");
        startTimer();
      })
      .catch(() => {
        toast.error("Failed to resend OTP.");
      })
      .finally(() => setResendLoading(false));
  };

  const cardWidth = isSm ? "100%" : isMd ? "70%" : "420px";

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
          Verify OTP
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
            padding: isSm ? "28px 20px" : "40px",
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
            Verify OTP
          </Typography>

          <TextField
            placeholder="Enter OTP"
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
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              background: "#4A90E2",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": { background: "#3b7acc" },
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            variant="text"
            onClick={handleResendOtp}
            disabled={resendLoading || loading || timeLeft > 0}
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: "#4A90E2",
              textTransform: "none",
              "&:hover": {
                textDecoration: timeLeft === 0 ? "underline" : "none",
              },
            }}
          >
            {resendLoading
              ? "Resending..."
              : timeLeft > 0
              ? `Resend OTP in ${formatTime(timeLeft)}`
              : "Resend OTP"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyOTP;
