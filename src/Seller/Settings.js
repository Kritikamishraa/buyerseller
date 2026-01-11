// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Button,
//   Switch,
//   FormControlLabel,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { updateProfile, reloadUser } from "../redux/slices/userSlice";
// import { toast } from "react-toastify";

// export default function SellerSettings() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const dispatch = useDispatch();

//   // const profile = useSelector((state) => state.user.user);

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

// // notifications
// const [notifications, setNotifications] = useState({
//   newOrders: true,
//   payments: true,
//   chatMessages: false,
//   buyerRequests: true,
// });

//   // const handleProfileChange = (field) => (e) => {
//   //   dispatch(updateProfile({ field, value: e.target.value }));
//   // };
//   const handleProfileChange = (field) => (e) =>
//     setLocalProfile((prev) => ({ ...prev, [field]: e.target.value }));

// const handleNotificationChange = (field) => (e) => {
//   const value = e.target.checked;

//   // Update local state
//   setNotifications((prev) => ({ ...prev, [field]: value }));

//   // Dispatch to redux
//   // dispatch(updateNotificationField({ field, value }));
// };

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

//   const inputMarginStyle = { mb: isMobile ? 2 : 0 };

//   return (
//     <Box
//       sx={{
//         top: 0,
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
//           maxWidth: 1200,
//           boxSizing: "border-box",
//         }}
//       >
//         {/* Title */}
//         <Typography
//           variant="h4"
//           component="h1"
//           fontWeight={700}
//           mb={3}
//           sx={{ fontSize: { xs: 26, md: 32 }, color: "#222" }}
//         >
//           Settings
//         </Typography>

//         {/* Business Profile Card */}
//         <Card
//           elevation={1}
//           sx={{
//             mb: 4,
//             borderRadius: 5,
//             backgroundColor: "#fff",
//             px: { xs: 2, sm: 4 },
//             py: { xs: 3, sm: 4 },
//           }}
//         >
//           <CardContent>
//             <Typography
//               variant="h5"
//               fontWeight={700}
//               mb={2}
//               color="textPrimary"
//             >
//               Business Profile
//             </Typography>
//             <Typography variant="body2" mb={3} color="primary.main">
//               Manage your public business information.
//             </Typography>
//             <Box component="form" onSubmit={handleProfileSave} noValidate>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Business Name"
//                     name="businessName"
//                     value={localProfile.businessName || ""}
//                     onChange={handleProfileChange("businessName")}
//                     fullWidth
//                     size="small"
//                     sx={inputMarginStyle}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Contact Person"
//                     name="name"
//                     value={localProfile.name || ""}
//                     onChange={handleProfileChange("contactPerson")}
//                     fullWidth
//                     size="small"
//                     sx={inputMarginStyle}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Email Address"
//                     name="email"
//                     value={localProfile.email || ""}
//                     onChange={handleProfileChange("email")}
//                     fullWidth
//                     size="small"
//                     sx={inputMarginStyle}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Contact Phone"
//                     name="phone"
//                     value={localProfile.phone || ""}
//                     onChange={handleProfileChange("phone")}
//                     fullWidth
//                     size="small"
//                     sx={inputMarginStyle}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="GST Number"
//                     name="gstNumber"
//                     value={localProfile.gstNumber || ""}
//                     onChange={handleProfileChange("gstNumber")}
//                     fullWidth
//                     size="small"
//                     sx={inputMarginStyle}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     label="Business Address"
//                     name="address"
//                     value={localProfile.businessAddress || ""}
//                     onChange={handleProfileChange("businessAddress")}
//                     fullWidth
//                     size="small"
//                     multiline
//                     minRows={2}
//                     sx={inputMarginStyle}
//                   />
//                 </Grid>
//               </Grid>
//               <Box mt={3}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth={isMobile}
//                   sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16 }}
//                 >
//                   Save Profile
//                 </Button>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>

//   {/* Notification Settings Card */}
//   <Card
//     elevation={1}
//     sx={{
//       borderRadius: 5,
//       backgroundColor: "#fff",
//       px: { xs: 2, sm: 4 },
//       py: { xs: 3, sm: 4 },
//       mb: 4,
//     }}
//   >
//     <CardContent>
//       <Typography
//         variant="h5"
//         fontWeight={700}
//         mb={2}
//         color="textPrimary"
//       >
//         Notification Settings
//       </Typography>
//       <Typography variant="body2" mb={3} color="primary.main">
//         Manage how you receive notifications.
//       </Typography>
//       <Grid container spacing={3}>
//         {Object.keys(notifications).map((key) => (
//           <Grid item xs={12} sm={6} key={key}>
//             <FormControlLabel
//               control={
//                 <Switch
//                   // checked={notifications[key]}
//                   checked={true}
//                   onChange={handleNotificationChange(key)}
//                   color="primary"
//                 />
//               }
//               label={key
//                 .replace(/([A-Z])/g, " $1")
//                 .replace(/^./, (str) => str.toUpperCase())}
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             />
//           </Grid>
//         ))}
//       </Grid>
//       <Box mt={3}>
//         <Button
//           variant="contained"
//           color="primary"
//           disabled
//           fullWidth={isMobile}
//           sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16 }}
//         >
//           Save Notifications
//         </Button>
//       </Box>
//     </CardContent>
//   </Card>
// </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, reloadUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function SellerSettings() {
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
    businessName: "",
    businessAddress: "",
    gstNumber: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    upiId: "",
    ifscCode: "",
    branchName: "",
    branchAddress: "",
  });

  // notifications
  const [notifications, setNotifications] = useState({
    newOrders: true,
    payments: true,
    chatMessages: false,
    buyerRequests: true,
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setLocalProfile((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        businessName: user.businessName || "",
        businessAddress: user.businessAddress || "",
        gstNumber: user.gstNumber || "",
        bankName: user.bankDetails?.bankName || "",
        accountName: user.bankDetails?.accountName || "",
        accountNumber: user.bankDetails?.accountNumber || "",
        upiId: user.bankDetails?.upiId || "",
        ifscCode: user.bankDetails?.ifscCode || "",
        branchName: user.bankDetails?.branchName || "",
        branchAddress: user.bankDetails?.branchAddress || "",
      }));
    }
  }, [user]);

  const handleProfileChange = (field) => (e) =>
    setLocalProfile((prev) => ({ ...prev, [field]: e.target.value }));

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: localProfile.name,
        phone: localProfile.phone,
        email: localProfile.email,
        businessName: localProfile.businessName,
        businessAddress: localProfile.businessAddress,
        gstNumber: localProfile.gstNumber,
        bankDetails: {
          bankName: localProfile.bankName,
          accountName: localProfile.accountName,
          accountNumber: localProfile.accountNumber,
          upiId: localProfile.upiId,
          ifscCode: localProfile.ifscCode,
          branchName: localProfile.branchName,
          branchAddress: localProfile.branchAddress,
        },
      };

      const result = await dispatch(updateProfile(payload)).unwrap();
      if (result) {
        toast.success("Profile updated successfully!");
        dispatch(reloadUser());
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleNotificationChange = (field) => (e) => {
    const value = e.target.checked;

    // Update local state
    setNotifications((prev) => ({ ...prev, [field]: value }));

    // Dispatch to redux
    // dispatch(updateNotificationField({ field, value }));
  };

  const inputStyle = { mb: isMobile ? 2 : 0 };

  // -------- UI Rendering --------
  return (
    <Box
      sx={{
        top: 0,
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
      <Box sx={{ width: "100%", maxWidth: 1200, boxSizing: "border-box" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
          sx={{ fontSize: { xs: 26, md: 32 }, color: "#222" }}
        >
          Settings
        </Typography>
        {/* Profile Card with Tabs */}
        <Paper
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mb: 4 }}
          elevation={0}
        >
          <Typography variant="h6" fontWeight={700} color="#131e32">
            Profile Information
          </Typography>
          <Card
            elevation={1}
            sx={{
              borderRadius: 5,
              backgroundColor: "#fff",
              px: { xs: 2, sm: 4 },
              py: { xs: 3, sm: 4 },
            }}
          >
            <CardContent>
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

              <Box component="form" onSubmit={handleProfileSave}>
                {/* Personal Profile Tab */}
                {tabIndex === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={localProfile.name}
                        onChange={handleProfileChange("name")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={localProfile.email}
                        onChange={handleProfileChange("email")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone"
                        name="phone"
                        value={localProfile.phone}
                        onChange={handleProfileChange("phone")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                  </Grid>
                )}

                {/* Business Profile Tab */}
                {tabIndex === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Business Name"
                        name="businessName"
                        value={localProfile.businessName}
                        onChange={handleProfileChange("businessName")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="GST Number"
                        name="gstNumber"
                        value={localProfile.gstNumber}
                        onChange={handleProfileChange("gstNumber")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Business Address"
                        variant="outlined"
                        size="small"
                        value={localProfile.businessAddress}
                        onChange={handleProfileChange("businessAddress")}
                        fullWidth
                        multiline
                        minRows={2}
                      />
                    </Grid>
                  </Grid>
                )}

                {/* Bank Details Tab */}
                {tabIndex === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Bank Name"
                        name="bankName"
                        value={localProfile.bankName}
                        onChange={handleProfileChange("bankName")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Account Holder Name"
                        name="accountName"
                        value={localProfile.accountName}
                        onChange={handleProfileChange("accountName")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Account Number"
                        name="accountNumber"
                        value={localProfile.accountNumber}
                        onChange={handleProfileChange("accountNumber")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="UPI ID"
                        name="upiId"
                        value={localProfile.upiId}
                        onChange={handleProfileChange("upiId")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="IFSC Code"
                        name="ifscCode"
                        value={localProfile.ifscCode}
                        onChange={handleProfileChange("ifscCode")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Branch Name"
                        name="branchName"
                        value={localProfile.branchName}
                        onChange={handleProfileChange("branchName")}
                        fullWidth
                        size="small"
                        sx={inputStyle}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Branch Address"
                        name="branchAddress"
                        value={localProfile.branchAddress}
                        onChange={handleProfileChange("branchAddress")}
                        fullWidth
                        size="small"
                        multiline
                        minRows={2}
                        sx={inputStyle}
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

                <Box mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={isMobile}
                    disabled={profileUpdate.loading}
                    sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16 }}
                  >
                    {profileUpdate.loading ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Paper>

        {/* Notification Settings Card */}
        <Paper
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mt: 4 }}
          elevation={0}
        >
          <Card
            elevation={1}
            sx={{
              borderRadius: 5,
              backgroundColor: "#fff",
              px: { xs: 2, sm: 4 },
              py: { xs: 3, sm: 4 },
              mb: 4,
              mt: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                color="textPrimary"
              >
                Notification Settings
              </Typography>
              <Typography variant="body2" mb={3} color="primary.main">
                Manage how you receive notifications.
              </Typography>
              <Grid container spacing={3}>
                {Object.keys(notifications).map((key) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={notifications[key]}
                          checked={true}
                          onChange={handleNotificationChange(key)}
                          color="primary"
                        />
                      }
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled
                  fullWidth={isMobile}
                  sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16 }}
                >
                  Save Notifications
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
}
