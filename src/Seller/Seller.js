// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Stack,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import { useNavigate } from "react-router-dom";
// import axios from "../axiosInstance";

// export default function SellerPage() {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [dashboardData, setDashboardData] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     pendingInvoices: 0,
//     ledgerBook: 0,
//   });

//   const [recentActivity, setRecentActivity] = useState({
//     recentOrders: [],
//     recentInvoices: [],
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await axios.get("/api/v1/dashboard/seller");
//         console.log("Dashboard Response:", res.data.data);
//         // setDashboardData({
//         //   totalProducts: res.data.data.totalProducts,
//         //   totalOrders: res.data.data.totalOrders,
//         //   pendingInvoices: res.data.data.pendingInvoices,
//         //   // ledgerBook: res.data.ledgerBook,
//         // });

//         setDashboardData({
//           totalProducts: res.data.data.totalProducts,
//           totalOrders: res.data.data.totalOrders,
//           pendingInvoices: res.data.data.pendingInvoices,
//         });

//         setRecentActivity({
//           recentOrders: res.data.data.recentOrders,
//           recentInvoices: res.data.data.recentInvoices,
//         });
//       } catch (error) {
//         console.log("Dashboard Error:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const stats = [
//     {
//       label: "Total Products",
//       value: dashboardData.totalProducts,
//       info: "All listed products",
//     },
//     {
//       label: "Total Orders",
//       value: dashboardData.totalOrders,
//       info: "Completed + Pending",
//     },
//     {
//       label: "Pending Invoices",
//       value: dashboardData.pendingInvoices,
//       info: "Invoices to clear",
//     },
//     {
//       label: "Ledger Book",
//       value: dashboardData.ledgerBook,
//       info: "Total ledger entries",
//     },
//   ];

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
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",
//           gap: 4,
//           px: { xs: 1, sm: 2, md: 3 },
//           background: "transparent",
//         }}
//       >
//         {/* Header */}
//         <Typography
//           variant={isMobile ? "h5" : "h4"}
//           fontWeight={700}
//           gutterBottom
//           sx={{ letterSpacing: 0.5, color: "#22364a" }}
//         >
//           Seller Dashboard
//         </Typography>

//         {/* KPI Cards */}
//         <Grid
//           container
//           spacing={isMobile ? 2 : 4}
//           sx={{ mb: { xs: 2, md: 4 } }}
//         >
//           {stats.map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 4,
//                   borderRadius: 3,
//                   bgcolor: "#fff",
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                 }}
//               >
//                 <Typography
//                   fontSize={18}
//                   color="#8b9ab4"
//                   fontWeight={700}
//                   gutterBottom
//                 >
//                   {item.label}
//                 </Typography>

//                 <Typography fontSize={32} fontWeight={800} color="#222">
//                   {item.value}
//                 </Typography>

//                 <Typography fontSize={15} color="#758ce2">
//                   {item.info}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Main Actions and Recent Activity */}
//         <Grid container spacing={isMobile ? 2 : 4}>
//           <Grid item xs={12} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 3, md: 5 },
//                 borderRadius: 3,
//                 bgcolor: "#fff",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
//                 mt: { xs: 0, md: 6 },
//                 display: "flex",
//                 flexDirection: "column",
//                 maxHeight: "100%",
//               }}
//             >
//               <Typography
//                 fontWeight={800}
//                 fontSize={22}
//                 sx={{ mb: 4, color: "#22364a" }}
//               >
//                 Quick Actions
//               </Typography>
//               <Stack spacing={3}>
//                 <Button
//                   variant="contained"
//                   startIcon={<AddCircleOutlineIcon />}
//                   sx={{
//                     borderRadius: 3,
//                     fontWeight: 800,
//                     color: "#3e4258",
//                     px: 3,
//                     py: 1.75,
//                     textTransform: "none",
//                     fontSize: "1.15rem",
//                     borderColor: "#e3eaf6",
//                     bgcolor: "#f6f7fa",
//                     transition:
//                       "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
//                     "&:hover": {
//                       bgcolor: "#104ed2",
//                       color: "#fff",
//                       borderColor: "#104ed2",
//                     },
//                     "&:not(:hover)": {
//                       bgcolor: "#f6f7fa",
//                       color: "#3e4258",
//                       borderColor: "#e3eaf6",
//                     },
//                   }}
//                   fullWidth
//                   onClick={() => navigate("/seller-dashboard/catalog")}
//                 >
//                   Add Product
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<Person2OutlinedIcon />}
//                   sx={{
//                     borderRadius: 3,
//                     fontWeight: 800,
//                     color: "#3e4258",
//                     px: 3,
//                     py: 1.75,
//                     textTransform: "none",
//                     fontSize: "1.15rem",
//                     borderColor: "#e3eaf6",
//                     bgcolor: "#f6f7fa",
//                     transition:
//                       "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
//                     "&:hover": {
//                       bgcolor: "#104ed2",
//                       color: "#fff",
//                       borderColor: "#104ed2",
//                     },
//                     "&:not(:hover)": {
//                       bgcolor: "#f6f7fa",
//                       color: "#3e4258",
//                       borderColor: "#e3eaf6",
//                     },
//                   }}
//                   fullWidth
//                   onClick={() => navigate("/seller-dashboard/orders")}
//                 >
//                   View Orders
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<DescriptionOutlinedIcon />}
//                   sx={{
//                     borderRadius: 3,
//                     fontWeight: 800,
//                     color: "#3e4258",
//                     px: 3,
//                     py: 1.75,
//                     textTransform: "none",
//                     fontSize: "1.15rem",
//                     borderColor: "#e3eaf6",
//                     bgcolor: "#f6f7fa",
//                     transition:
//                       "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
//                     "&:hover": {
//                       bgcolor: "#104ed2",
//                       color: "#fff",
//                       borderColor: "#104ed2",
//                     },
//                     "&:not(:hover)": {
//                       bgcolor: "#f6f7fa",
//                       color: "#3e4258",
//                       borderColor: "#e3eaf6",
//                     },
//                   }}
//                   fullWidth
//                   onClick={() => navigate("/seller-dashboard/payments")}
//                 >
//                   View Invoices
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<DescriptionOutlinedIcon />}
//                   sx={{
//                     borderRadius: 3,
//                     fontWeight: 800,
//                     color: "#3e4258",
//                     px: 3,
//                     py: 1.75,
//                     textTransform: "none",
//                     fontSize: "1.15rem",
//                     borderColor: "#e3eaf6",
//                     bgcolor: "#f6f7fa",
//                     transition:
//                       "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
//                     "&:hover": {
//                       bgcolor: "#104ed2",
//                       color: "#fff",
//                       borderColor: "#104ed2",
//                     },
//                     "&:not(:hover)": {
//                       bgcolor: "#f6f7fa",
//                       color: "#3e4258",
//                       borderColor: "#e3eaf6",
//                     },
//                   }}
//                   fullWidth
//                   onClick={() => navigate("/seller-dashboard/ledger")}
//                 >
//                   Manage Ledger
//                 </Button>
//               </Stack>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 3, md: 5 },
//                 borderRadius: 3,
//                 bgcolor: "#fff",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
//                 mt: { xs: 0, md: 6 },
//                 display: "flex",
//                 flexDirection: "column",
//                 minHeight: { xs: 260, md: 350 },
//               }}
//             >
//               <Typography
//                 fontWeight={800}
//                 fontSize={22}
//                 sx={{ mb: 3, color: "#22364a" }}
//               >
//                 Recent Activity
//               </Typography>
//               <Typography fontSize={17} color="#607094" mb={3}>
//                 A log of recent orders and payments.
//               </Typography>
//               {recentActivity.recentOrders.length === 0 &&
//               recentActivity.recentInvoices.length === 0 ? (
//                 <Typography fontSize={18} color="#8793af">
//                   No recent activity.
//                 </Typography>
//               ) : (
//                 <Box>
//                   {/* Recent Orders */}
//                   {recentActivity.recentOrders.length > 0 && (
//                     <>
//                       <Typography fontWeight={700} color="#22364a" mb={1}>
//                         Recent Orders
//                       </Typography>
//                       {recentActivity.recentOrders.map((order) => (
//                         <Box key={order._id} sx={{ mb: 1, color: "#607094" }}>
//                           Order #
//                           {order.orderNumber || order._id.substring(0, 6)} —
//                           {order.status} — ₹{order.totalAmount}
//                         </Box>
//                       ))}
//                     </>
//                   )}

//                   {/* Recent Invoices */}
//                   {recentActivity.recentInvoices.length > 0 && (
//                     <>
//                       <Typography
//                         fontWeight={700}
//                         color="#22364a"
//                         mt={3}
//                         mb={1}
//                       >
//                         Recent Invoices
//                       </Typography>
//                       {recentActivity.recentInvoices.map((inv) => (
//                         <Box key={inv._id} sx={{ mb: 1, color: "#607094" }}>
//                           Invoice #
//                           {inv.invoiceNumber || inv._id.substring(0, 6)} —
//                           {inv.status} — ₹{inv.amount}
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                 </Box>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

export default function SellerPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingInvoices: 0,
    ledgerBook: 0,
  });

  const [recentActivity, setRecentActivity] = useState({
    recentOrders: [],
    recentInvoices: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/v1/dashboard/seller");
        // setDashboardData({
        //   totalProducts: res.data.data.totalProducts,
        //   totalOrders: res.data.data.totalOrders,
        //   pendingInvoices: res.data.data.pendingInvoices,
        //   // ledgerBook: res.data.ledgerBook,
        // });
        setDashboardData({
          totalProducts: res.data.data.totalProducts,
          totalOrders: res.data.data.totalOrders,
          pendingInvoices: res.data.data.pendingInvoices,
        });
        setRecentActivity({
          recentOrders: res.data.data.recentOrders,
          recentInvoices: res.data.data.recentInvoices,
        });
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: dashboardData.totalProducts,
      info: "All listed products",
    },
    {
      label: "Total Orders",
      value: dashboardData.totalOrders,
      info: "Completed + Pending",
    },
    {
      label: "Pending Invoices",
      value: dashboardData.pendingInvoices,
      info: "Invoices to clear",
    },
    {
      label: "Ledger Book",
      value: dashboardData.ledgerBook,
      info: "Total ledger entries",
    },
  ];

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
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          px: { xs: 1, sm: 2, md: 3 },
          background: "transparent",
        }}
      >
        {/* Header */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          gutterBottom
          sx={{ letterSpacing: 0.5, color: "#22364a" }}
        >
          Seller Dashboard
        </Typography>

        {/* KPI Cards */}
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          sx={{ mb: { xs: 2, md: 4 } }}
        >
          {stats.map((item, index) => (
            // <Grid item xs={12} sm={6} md={3} key={index}>
            // <Grid item xs={12} sm={6} md={3} key={index} sx={{ mb: { xs: 3, sm: 3, md: 0 } }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{ display: "flex" }}
            >
              {/* <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                   gap: 1.5,       // <-- ADD GAP INSIDE CARD FOR SPACING
    mb: 1,          // <-- OPTIONAL: ADD BOTTOM MARGIN BETWEEN CARDS
                  height: "100%",
                }}
              > */}

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2, // 🟢 internal spacing fix
                  width: "100%", // 🟢 ensures equal card size
                }}
              >
                <Typography
                  fontSize={18}
                  color="#8b9ab4"
                  fontWeight={700}
                  gutterBottom
                >
                  {item.label}
                </Typography>

                <Typography fontSize={32} fontWeight={800} color="#222">
                  {item.value}
                </Typography>

                <Typography fontSize={15} color="#758ce2">
                  {item.info}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Main Actions and Recent Activity */}
        <Grid
          container
          rowSpacing={4} // vertical gap FIX
          columnSpacing={4} // horizontal gap FIX
        >
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                mt: { xs: 0, md: 6 },
                display: "flex",
                flexDirection: "column",
                gap: 1.5, // spacing between label, value, info

                maxHeight: "100%",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize={22}
                sx={{ mb: 4, color: "#22364a" }}
              >
                Quick Actions
              </Typography>
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                  onClick={() => navigate("/seller-dashboard/catalog")}
                >
                  Add Product
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Person2OutlinedIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                  onClick={() => navigate("/seller-dashboard/orders")}
                >
                  View Orders
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DescriptionOutlinedIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                  onClick={() => navigate("/seller-dashboard/payments")}
                >
                  View Invoices
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DescriptionOutlinedIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                  onClick={() => navigate("/seller-dashboard/ledger")}
                >
                  Manage Ledger
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                mt: { xs: 0, md: 6 },
                display: "flex",
                flexDirection: "column",
                minHeight: { xs: 260, md: 350 },
              }}
            >
              <Typography
                fontWeight={800}
                fontSize={22}
                sx={{ mb: 3, color: "#22364a" }}
              >
                Recent Activity
              </Typography>
              <Typography fontSize={17} color="#607094" mb={3}>
                A log of recent orders and payments.
              </Typography>
              {recentActivity.recentOrders.length === 0 &&
              recentActivity.recentInvoices.length === 0 ? (
                <Typography fontSize={18} color="#8793af">
                  No recent activity.
                </Typography>
              ) : (
                <Box>
                  {/* Recent Orders */}
                  {recentActivity.recentOrders.length > 0 && (
                    <>
                      <Typography fontWeight={700} color="#22364a" mb={1}>
                        Recent Orders
                      </Typography>
                      {recentActivity.recentOrders.map((order) => (
                        <Box key={order._id} sx={{ mb: 1, color: "#607094" }}>
                          Order #
                          {order.orderNumber || order._id.substring(0, 6)} —
                          {order.status} — ₹{order.totalAmount}
                        </Box>
                      ))}
                    </>
                  )}

                  {/* Recent Invoices */}
                  {recentActivity.recentInvoices.length > 0 && (
                    <>
                      <Typography
                        fontWeight={700}
                        color="#22364a"
                        mt={3}
                        mb={1}
                      >
                        Recent Invoices
                      </Typography>
                      {recentActivity.recentInvoices.map((inv) => (
                        <Box key={inv._id} sx={{ mb: 1, color: "#607094" }}>
                          Invoice #
                          {inv.invoiceNumber || inv._id.substring(0, 6)} —
                          {inv.status} — ₹{inv.amount}
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
