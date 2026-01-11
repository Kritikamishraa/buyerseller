import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Password from "@mui/icons-material/Password";
import { resetPassword, resetPasswordUpdate } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.user.operations.passwordUpdate
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const location = useLocation();
  // const token = location.state?.resetPasswordToken;
  const token = location.state?.token;

  // handle submit api call
  const handleSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    myForm.set("token", token);

    const resultAction = await dispatch(resetPassword({ passwords: myForm }));

    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success("Password has been reset successfully!");
      dispatch(resetPasswordUpdate());
      navigate("/login");
    } else {
      toast.error(resultAction.payload || "Failed to reset password");
    }
  };
  const currentYear = new Date().getFullYear();

  return (
    <>
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
          Reset Password
        </Typography>
      </Breadcrumbs>

      {/* Main Box */}
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
            width: "100%",
            maxWidth: "420px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            boxShadow:
              "0px 10px 25px rgba(0,0,0,0.10), 0px 4px 10px rgba(0,0,0,0.06)",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              mb: 2,
              bgcolor: "#4A90E2",
              width: 60,
              height: 60,
            }}
          >
            <Password sx={{ color: "#fff" }} />
          </Avatar>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#4A90E2",
              mb: 3,
              letterSpacing: "1px",
            }}
          >
            Reset Password
          </Typography>

          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                background: "#f5f5f5",
                borderRadius: "10px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                background: "#f5f5f5",
                borderRadius: "10px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            disabled={loading}
            fullWidth
            variant="contained"
            type="submit"
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
            {loading ? "Updating..." : "Reset Password"}
          </Button>

          <Typography
            sx={{
              fontSize: "12px",
              mt: 4,
              opacity: 0.6,
            }}
          >
            © {currentYear} Bizbridge – All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
