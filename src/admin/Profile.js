import React, { useState, useEffect } from "react";
import {
  Avatar,
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  clearErrors,
  updateProfile,
  updatePassword,
  reloadUser,
  resetProfileUpdate,
  resetPasswordUpdate,
} from "../redux/slices/userSlice";
import { message } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import Password from "@mui/icons-material/Password";
import moment from "moment";
import PageTitle from "../Components/PageTitle";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const dispatch = useDispatch();
  const { user, error, isUpdated, isProfileUpdated, isPasswordUpdated, } = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  // eslint-disable-next-line no-unused-vars
  const created = moment(user?.createdAt).format("MM/DD/YYYY h:mm A");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowNewConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Toggle old password visibility
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  // Toggle new password visibility
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  // Toggle new confirm password visibility
  const handleClickShowConfirmPassword = () => {
    setShowNewConfirmPassword(!showConfirmNewPassword);
  };

  // Fetch user data on mount
  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone);
    }

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(reloadUser());
      dispatch(resetProfileUpdate()); 
    }
  }, [user, error, isUpdated, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, phone }));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(resetPasswordUpdate());
    }
  }, [error, isUpdated, dispatch]);

  return (
    <div>
      <PageTitle title={`${user?.name}'s Admin Profile | Bizbridge`} />

      <Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            mb: 3,
            fontFamily: "Poppins, sans-serif",
            color: "#2C3E50",
            letterSpacing: "2.5px",
            lineHeight: 1.8,
          }}
        >
          Profile Information
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            mb: 5,
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            width: "fit-content",
          }}
        >
          <MUILink
            component={Link}
            to="/dashboard"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Dashboard
          </MUILink>
          <Typography sx={{ color: "primary.main" }}>Profile</Typography>
        </Breadcrumbs>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{
              width: "100%",
              // overflowY: "hidden",
              overflowX: "scroll",
              overflowY: "scroll",
            }}
          >
            <Tab label="Profile" {...TabPanel(0)} />
            <Tab label="Update" {...TabPanel(1)} />
            <Tab label="Password" {...TabPanel(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                pb: 2,
                pt: 3,
                fontFamily: "Poppins, sans-serif",
                color: "#555",
                letterSpacing: "2.5px",
                lineHeight: 1.8,
              }}
            >
              Profile Information
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: "8px" }}>
              <Box sx={{ bgcolor: "white", p: 3 }}>
                <p>Full name : {name}</p>
                <p>E-mail : {email}</p>
                <p>Phone : {phone}</p>
                <p>Joined On : {created}</p>
              </Box>
            </Paper>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Typography
            variant="h6"
            sx={{
              pb: 2,
              pt: 3,
              fontFamily: "Poppins, sans-serif",
              color: "#555",
              letterSpacing: "2.5px",
              lineHeight: 1.8,
            }}
          >
            Update Profile
          </Typography>
          <Container
            onSubmit={handleSubmit}
            component="form"
            className="form_style border-style"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                <EditIcon />
              </Avatar>
              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="courses_desc"
              sx={{
                mt: 3,
                borderRadius: "5px",
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: ".1rem",
              }}
            >
              Update Profile
            </Button>
          </Container>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <Typography
            variant="h6"
            sx={{
              pb: 2,
              pt: 3,
              fontFamily: "Poppins, sans-serif",
              color: "#555",
              letterSpacing: "2.5px",
              lineHeight: 1.8,
            }}
          >
            Change Password
          </Typography>
          <Container
            onSubmit={handleSubmitPassword}
            component="form"
            className="form_style border-style"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                <Password />
              </Avatar>

              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="oldPassword"
                name="password"
                label="Old Password"
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="NewPassword"
                name="password"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="ConfirmPassword"
                name="password"
                label="Confirm Password"
                type={showConfirmNewPassword ? "text" : "password"}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className="courses_desc"
              sx={{
                mt: 3,
                borderRadius: "5px",
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: ".1rem",
              }}
            >
              Update Password
            </Button>
          </Container>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
