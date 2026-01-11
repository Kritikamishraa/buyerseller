import { GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  PhoneIphone,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  login,
  clearErrors,
  hydrateUserFromStorage,
  refreshTokenUserFromStorage,
  googleLogin,
} from "../redux/slices/userSlice";
import axios from "../axiosInstance";

const Login = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, token } = useSelector(
    (s) => s.user || {}
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("email"); // email | phone
  const [phone, setPhone] = useState("");

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
          navigate("/select-mode"); // fallback if mode not yet chosen
        }
      } else {
        navigate("/select-mode"); // fallback for unknown roles
      }
    }
  }, [dispatch, navigate, isAuthenticated, token]);

  useEffect(() => {
    if (error) {
      // message.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const togglePassword = () => setShowPassword((p) => !p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("/api/status");
      if (!data?.data) {
        return toast.error("Server unreachable. Try again later.");
      }
    } catch {
      return toast.error("Server unreachable. Try again later.");
    }
    // dispatch(clearErrors());
    dispatch(
      login(loginType === "email" ? { email, password } : { phone, password })
    )
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
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

  return (
    <Box
    // sx={{
    //   minHeight: "100vh",
    //   width: "100%",
    //   background: "#ffffff",
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   overflowY: "auto", // ⭐ Keyboard safe
    //   // padding: "20px",
    // }}
    >
      {/* Breadcrumb */}
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
          Login
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
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: isSm ? 3 : 4,
            boxShadow:
              "0px 10px 25px rgba(0,0,0,0.08), 0px 4px 10px rgba(0,0,0,0.05)",
            border: "1px solid rgba(200,200,200,0.4)",
            textAlign: "center",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          <Typography
            variant={isSm ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              color: "#4A90E2",
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography sx={{ color: "#555", mb: 3 }}>
            Login to your account
          </Typography>

          {/* Email / Phone */}
          <TextField
            fullWidth
            placeholder="Email or Phone Number"
            value={loginType === "email" ? email : phone}
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d*$/.test(v)) {
                setLoginType("phone");
                setPhone(v);
              } else {
                setLoginType("email");
                setEmail(v);
              }
            }}
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
                  {loginType === "email" ? (
                    <EmailOutlined sx={{ color: "#4A90E2" }} />
                  ) : (
                    <PhoneIphone sx={{ color: "#4A90E2" }} />
                  )}
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
              mb: 1.5,
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

          <Button
            component={RouterLink}
            to="/forgot-password"
            sx={{
              textTransform: "none",
              color: "#4A90E2",
              fontSize: 14,
              mb: 2,
            }}
          >
            Forgot Password?
          </Button>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            sx={{
              background: "#4A90E2",
              padding: "12px",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              mb: 2,
              "&:hover": {
                background: "#3b7acc",
              },
            }}
          >
            {loading ? "Processing..." : "Login"}
          </Button>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={(res) => {
              const id = res.credential;
              dispatch(googleLogin(id))
                .unwrap()
                .then((data) => {
                  toast.success("Google login successful!");
                  const user = data.user;

                  if (user.role === 1) navigate("/admin-dashboard");
                  else if (user.mode === "seller")
                    navigate("/seller-dashboard");
                  else if (user.mode === "buyer") navigate("/buyer-dashboard");
                  else navigate("/select-mode");
                })
                .catch((err) => toast.error(err));
            }}
            onError={() => toast.error("Google login failed!")}
          />

          <Divider sx={{ my: 3 }} />

          <Typography sx={{ color: "#555" }}>
            Don't have an account?{" "}
            <Button
              component={RouterLink}
              to="/register"
              sx={{
                textTransform: "none",
                color: "#4A90E2",
                fontWeight: 600,
              }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
