// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Switch,
//   Paper,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { updateProfile, reloadUser } from "../redux/slices/userSlice";
// import { toast } from "react-toastify";

// export default function SettingPage() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const dispatch = useDispatch();

//   const { user, operations } = useSelector((state) => state.user);
//   const { profileUpdate } = operations;
//   // Local state for form fields
//   const [localProfile, setLocalProfile] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     businessAddress: "",
//     businessName: "",
//     gstNumber: "",
//   });

//   const [localNotifications, setLocalNotifications] = useState({
//     orderUpdates: true,
//     newOffers: true,
//     chatMessages: false,
//   });

//   // Load user data into form when component mounts or user changes
//   useEffect(() => {
//     if (user) {
//       setLocalProfile({
//         name: user.name || "",
//         phone: user.phone || "",
//         email: user.email || "",
//         businessAddress: user.businessAddress || "",
//         businessName: user.businessName || "",
//         gstNumber: user.gstNumber || "",
//       });
//     }
//   }, [user]);

//   // Handle profile field changes
//   const handleProfileChange = (field) => (e) =>
//     setLocalProfile((prev) => ({ ...prev, [field]: e.target.value }));

//   const handleSwitch = (name) => (e) =>
//     setLocalNotifications((prev) => ({ ...prev, [name]: e.target.checked }));

//   // Save Profile and reload user data
//   const handleProfileSave = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(updateProfile(localProfile)).unwrap();
//       if (result) {
//         toast.success("Profile updated successfully!");
//         // Reload user profile after successful update
//         dispatch(reloadUser());
//       }
//     } catch (error) {
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   // ✅ Save Notification Settings (local only)
//   const handleNotificationSave = (e) => {
//     e.preventDefault();
//     toast.success("Notification preferences updated!");
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "100vh",
//         background: "#f8fafc",
//         px: { xs: 2, sm: 4, md: 7, lg: 12 },
//         py: { xs: 2, sm: 4, md: 5 },
//         boxSizing: "border-box",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: 1400,
//           mx: "auto",
//           paddingRight: "10px",
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",
//           gap: 6,
//         }}
//       >
//         <Typography
//           variant={isMobile ? "h5" : "h4"}
//           fontWeight={700}
//           color="text.primary"
//           mb={3}
//         >
//           Settings
//         </Typography>

//         {/* Profile Information Section */}
//         <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }} elevation={0}>
//           <Typography variant="h6" fontWeight={700} mb={0.5} color="#131e32">
//             Profile Information
//           </Typography>
//           <Typography
//             sx={{ mb: 3, color: "#46639c", fontWeight: 500, fontSize: 15 }}
//           >
//             Update your personal and business details.
//           </Typography>

//           <Box component="form" onSubmit={handleProfileSave} autoComplete="off">
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Full Name"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   value={localProfile.name}
//                   onChange={handleProfileChange("name")}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Phone Number"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   value={localProfile.phone}
//                   onChange={handleProfileChange("phone")}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Email Address"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   value={localProfile.email}
//                   onChange={handleProfileChange("email")}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Business Name"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   value={localProfile.businessAddress}
//                   onChange={handleProfileChange("businessAddress")}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Business Address"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   value={localProfile.businessName}
//                   onChange={handleProfileChange("businessName")}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="GST Number"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   value={localProfile.gstNumber}
//                   onChange={handleProfileChange("gstNumber")}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 mt: 4,
//                 px: 4,
//                 fontWeight: 700,
//                 borderRadius: 2,
//                 backgroundColor: "#1976d2",
//                 textTransform: "none",
//                 "&:hover": { backgroundColor: "#125ea8" },
//               }}
//               disabled={profileUpdate.loading}
//             >
//               {profileUpdate.loading ? "Saving..." : "Save Profile"}
//             </Button>
//           </Box>
//         </Paper>

//         {/* Notification Settings Section */}
//         <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }} elevation={0}>
//           <Typography variant="h6" fontWeight={700} mb={3} color="#131e32">
//             Notification Settings
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleNotificationSave}
//             sx={{ display: "flex", flexDirection: "column", gap: 3 }}
//           >
//             {[
//               {
//                 label: "Order Updates",
//                 description: "Receive notifications for order status changes.",
//                 name: "orderUpdates",
//               },
//               {
//                 label: "New Offers",
//                 description: "Get notified about new schemes and offers.",
//                 name: "newOffers",
//               },
//               {
//                 label: "Chat Messages",
//                 description: "Receive notifications for new chat messages.",
//                 name: "chatMessages",
//               },
//             ].map(({ label, description, name }) => (
//               <Box
//                 key={name}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   px: 3,
//                   py: 2,
//                   borderRadius: 2,
//                   backgroundColor: "#f6f9fc",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
//                     {label}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {description}
//                   </Typography>
//                 </Box>
//                 <Switch
//                   // checked={localNotifications[name]}
//                   checked={true}
//                   onChange={handleSwitch(name)}
//                   color="primary"
//                 />
//               </Box>
//             ))}
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={true}
//               sx={{
//                 alignSelf: "flex-start",
//                 px: 5,
//                 py: 1.5,
//                 borderRadius: 2,
//                 fontWeight: 700,
//                 bgcolor: "#1976d2",
//                 "&:hover": { bgcolor: "#125ea8" },
//                 textTransform: "none",
//               }}
//             >
//               Save
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, reloadUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function SettingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { user, operations } = useSelector((state) => state.user);
  const { profileUpdate } = operations;

  const [tabIndex, setTabIndex] = useState(0);

  const [localProfile, setLocalProfile] = useState({
    name: "",
    phone: "",
    email: "",
    businessAddress: "",
    businessName: "",
    gstNumber: "",
    bankDetails: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      upiId: "",
      ifscCode: "",
      branchName: "",
      branchAddress: "",
    },
  });

  const [localNotifications, setLocalNotifications] = useState({
    orderUpdates: true,
    newOffers: true,
    chatMessages: false,
  });

  useEffect(() => {
    if (user) {
      setLocalProfile({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        businessAddress: user.businessAddress || "",
        businessName: user.businessName || "",
        gstNumber: user.gstNumber || "",
        bankDetails: {
          bankName: user.bankDetails?.bankName || "",
          accountName: user.bankDetails?.accountName || "",
          accountNumber: user.bankDetails?.accountNumber || "",
          upiId: user.bankDetails?.upiId || "",
          ifscCode: user.bankDetails?.ifscCode || "",
          branchName: user.bankDetails?.branchName || "",
          branchAddress: user.bankDetails?.branchAddress || "",
        },
      });
    }
  }, [user]);

  const handleProfileChange = (field) => (e) =>
    setLocalProfile((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBankChange = (field) => (e) =>
    setLocalProfile((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: e.target.value },
    }));

  const handleSwitch = (name) => (e) =>
    setLocalNotifications((prev) => ({ ...prev, [name]: e.target.checked }));

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateProfile(localProfile)).unwrap();
      if (result) {
        toast.success("Profile updated successfully!");
        dispatch(reloadUser());
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleNotificationSave = (e) => {
    e.preventDefault();
    toast.success("Notification preferences updated!");
  };

  
  const inputStyle = { mb: isMobile ? 2 : 0 };

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
          // gap: 6,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          color="text.primary"
          mb={3}
        >
          Settings
        </Typography>

        {/* Profile Information Section with Tabs */}
        <Paper
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mb: 4 }}
          elevation={0}
        >
          <Typography variant="h6" fontWeight={700} mb={0.5} color="#131e32">
            Profile Information
          </Typography>
          <Typography
            sx={{ mb: 3, color: "#46639c", fontWeight: 500, fontSize: 15 }}
          >
            Update your personal, business, and bank details.
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={(e, val) => setTabIndex(val)}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              mb: 3,
              borderBottom: "1px solid #ddd",
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
              },
            }}
          >
            <Tab label="Personal Profile" />
            <Tab label="Business Profile" />
            <Tab label="Bank Details" />
            <Tab label="Change Password" />
          </Tabs>

          <Box component="form" onSubmit={handleProfileSave} autoComplete="off">
            {tabIndex === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile.name}
                    onChange={handleProfileChange("name")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile.phone}
                    onChange={handleProfileChange("phone")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile.email}
                    onChange={handleProfileChange("email")}
                  />
                </Grid>
              </Grid>
            )}

            {tabIndex === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Business Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile.businessName}
                    onChange={handleProfileChange("businessName")}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="GST Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile.gstNumber}
                    onChange={handleProfileChange("gstNumber")}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    label="Business Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile.businessAddress}
                    onChange={handleProfileChange("businessAddress")}
                    multiline
                    minRows={2}
                  />
                </Grid>
              </Grid>
            )}

            {tabIndex === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Bank Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile?.bankDetails?.bankName}
                    onChange={handleBankChange("bankName")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Account Holder Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile?.bankDetails?.accountName}
                    onChange={handleBankChange("accountName")}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Account Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile?.bankDetails?.accountNumber}
                    onChange={handleBankChange("accountNumber")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="UPI ID"
                    name="upiId"
                    value={localProfile?.bankDetails?.upiId}
                    onChange={handleBankChange("upiId")}
                    fullWidth
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="IFSC Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile?.bankDetails?.ifscCode}
                    onChange={handleBankChange("ifscCode")}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Branch Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={localProfile?.bankDetails?.branchName}
                    onChange={handleBankChange("branchName")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Branch Address"
                    name="branchAddress"
                    value={localProfile?.bankDetails?.branchAddress}
                    onChange={handleBankChange("branchAddress")}
                    fullWidth
                    size="small"
                    multiline
                    minRows={2}
                  />
                </Grid>
              </Grid>
            )}

           {tabIndex === 3 && (
            <>
              <Typography
                sx={{ color: "#46639c", fontWeight: 500, fontSize: 15 }}
              >
                Change Password functionality coming soon!
              </Typography>
           
            </>
           )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 4,
                px: 4,
                fontWeight: 700,
                borderRadius: 2,
                backgroundColor: "#f97316",
                textTransform: "none",
                "&:hover": { backgroundColor: "#f5812eff" },
              }}
              disabled={profileUpdate.loading}
            >
              {profileUpdate.loading ? "Saving..." : "Save Profile"}
            </Button>
          </Box>
        </Paper>

        {/* ✅ Keep Notification Settings Section as it is */}
        <Paper
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mt: 4 }}
          elevation={0}
        >
          <Typography variant="h6" fontWeight={700} mb={3} color="#131e32">
            Notification Settings
          </Typography>

          <Box
            component="form"
            onSubmit={handleNotificationSave}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {[
              {
                label: "Order Updates",
                description: "Receive notifications for order status changes.",
                name: "orderUpdates",
              },
              {
                label: "New Offers",
                description: "Get notified about new schemes and offers.",
                name: "newOffers",
              },
              {
                label: "Chat Messages",
                description: "Receive notifications for new chat messages.",
                name: "chatMessages",
              },
            ].map(({ label, description, name }) => (
              <Box
                key={name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  backgroundColor: "#f6f9fc",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Box>
                <Switch
                  // checked={localNotifications[name]}
                  onChange={handleSwitch(name)}
                  color="primary"
                   checked={true}
                />
              </Box>
            ))}
            <Button
              type="submit"
              variant="contained"
              disabled={true}
              sx={{
                alignSelf: "flex-start",
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#125ea8" },
                textTransform: "none",
              }}
            >
              Save Notifications
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
