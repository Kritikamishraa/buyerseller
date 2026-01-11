import { GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  EmailOutlined,
  LockOutlined,
  PhoneIphone as PhoneIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  userRegister,
  clearErrors,
  hydrateUserFromStorage,
  refreshTokenUserFromStorage,
  googleRegister,
} from "../redux/slices/userSlice";

import axios from "../axiosInstance";
import { toast } from "react-toastify";

const Register = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, token } = useSelector(
    (state) => state.user
  );

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset all fields on mount
  useEffect(() => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setShowPassword(false);
  }, []);

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // if (isAuthenticated) navigate("/");
  }, [error, isAuthenticated, navigate, dispatch]);

  // Check server status
  const checkServerStatus = async () => {
    try {
      const response = await axios.get("/api/status");
      if (response?.data?.data !== true) {
        toast.error(
          "Oops! Something went wrong. Please try again later or contact support."
        );
      }
    } catch {
      toast.error(
        "Error: Oops! Something went wrong. Please try again later or contact support."
      );
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedToken && storedUser && !token) {
      dispatch(
        hydrateUserFromStorage({
          token: storedToken,
          user: JSON.parse(storedUser),
        })
      );
    }

    if (storedRefreshToken && storedUser && !token) {
      dispatch(
        refreshTokenUserFromStorage({
          refreshToken: storedRefreshToken,
          user: JSON.parse(storedUser),
        })
      );
    }

    // Redirect based on role and mode
    if (isAuthenticated && token && storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 1) {
        navigate("/admin-dashboard");
      } else if (user.role === 0) {
        if (user.mode === "seller") {
          navigate("/seller-dashboard");
        } else if (user.mode === "buyer") {
          navigate("/buyer-dashboard");
        } else {
          navigate("/login"); // fallback if mode not yet chosen
        }
      } else {
        navigate("/login"); // fallback for unknown roles
      }
    }
  }, [dispatch, navigate, isAuthenticated, token]);
  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    checkServerStatus();
    dispatch(userRegister({ name, email, phone, password }))
      .unwrap()
      .then(() => {
        toast.success("Register successful!");
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          if (storedUser.role === 1) {
            navigate("/admin-dashboard");
          } else if (storedUser.role === 0) {
            if (storedUser.mode === "seller") {
              navigate("/seller-dashboard");
            } else if (storedUser.mode === "buyer") {
              navigate("/buyer-dashboard");
            } else {
              navigate("/login");
            }
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      })
      .catch((errMsg) => {
        toast.error(errMsg);
      });
  };

  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* White background */}
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
            Register
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
          {/* Glass Card */}

          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              padding: isSm ? "28px 20px" : "40px",
              width: "100%",
              maxWidth: 420,
              boxShadow:
                "0px 10px 25px rgba(0,0,0,0.08), 0px 4px 10px rgba(0,0,0,0.05)",
              border: "1px solid rgba(200,200,200,0.4)",
              overflow: "hidden",
            }}
          >
            <Typography
              variant={isSm ? "h5" : "h4"}
              sx={{
                textAlign: "center",
                fontWeight: 700,
                mb: 3,
                color: "#4A90E2",
              }}
            >
              Create Your Account
            </Typography>

            {/* Full Name */}
            <TextField
              fullWidth
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  background: "#f5f5f5",
                  borderRadius: "10px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline sx={{ color: "#4A90E2" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
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
            />

            {/* Phone */}
            <TextField
              fullWidth
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  background: "#f5f5f5",
                  borderRadius: "10px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#4A90E2" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  background: "#f5f5f5",
                  borderRadius: "10px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "#4A90E2" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {/* Submit button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "#4A90E2",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                mt: 1,
                "&:hover": { background: "#3b7acc" },
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <Box sx={{ mt: 2 }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const tokenId = credentialResponse.credential;

                  dispatch(googleRegister(tokenId))
                    .unwrap()
                    .then((res) => {
                      toast.success("Google registration successful!");

                      const user = res.user;

                      if (user.role === 1) navigate("/admin-dashboard");
                      else if (user.mode === "seller")
                        navigate("/seller-dashboard");
                      else if (user.mode === "buyer")
                        navigate("/buyer-dashboard");
                      else navigate("/login");
                    })
                    .catch((err) => {
                      toast.error(err || "Google registration failed!");
                    });
                }}
                onError={() => toast.error("Google registration failed!")}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography align="center" sx={{ color: "#555" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#4A90E2", fontWeight: 600 }}>
                Login
              </Link>
            </Typography>

            <Typography
              align="center"
              sx={{ mt: 3, color: "#777", fontSize: "11px" }}
            >
              © {currentYear} All rights reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
