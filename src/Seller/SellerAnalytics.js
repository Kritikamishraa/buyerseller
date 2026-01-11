import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [4000, 3000, 4800, 4300, 6000, 5300],
      backgroundColor: "#5070f4",
      borderRadius: 8,
      barPercentage: 0.65,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#3066be",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#4b4254",
        font: { size: 14, family: "inherit" },
      },
    },
    y: {
      grid: { color: "#ededed" },
      beginAtZero: true,
      ticks: {
        stepSize: 1500,
        color: "#4b4254",
        font: { size: 14, family: "inherit" },
      },
    },
  },
};

const topProducts = [
  { name: "Basmati Rice (1kg)", units: 520, revenue: "62,400" },
  { name: "Sunflower Oil (1L)", units: 450, revenue: "67,500" },
  { name: "Aashirvaad Atta (5kg)", units: 300, revenue: "75,000" },
  { name: "Tata Salt (1kg)", units: 800, revenue: "20,000" },
];

const topBuyers = [
  { name: "Kumar Retail", orders: 15, spent: "85,000" },
  { name: "Priya", orders: 12, spent: "72,000" },
  { name: "Super Mart", orders: 8, spent: "55,000" },
];

export default function SellerAnalytics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Padding for mobile cards
  const mobileCardPx = 2;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 0, sm: 4, md: 7, lg: 12 },
        py: { xs: 1, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          boxSizing: "border-box",
          mx: "auto",
        }}
      >
        <Grid container spacing={isMobile ? 2 : 3}>
          {/* Sales Analytics Card - always full width */}
          <Grid item xs={12}>
            <Box
              sx={{
                px: { xs: 0, sm: 3, md: 3, lg: 0 }, // Equal left/right space on all screens
                width: "100%",
              }}
            >
              <Card
                elevation={2}
                sx={{
                  width: "100%",
                  mb: isMobile ? 0 : 2,
                  px: 0, // Remove internal card padding, use Box for spacing
                  py: { xs: 2, sm: 3 },
                  backgroundColor: "#fff",
                  borderRadius: 5,
                }}
              >
                <CardContent sx={{ px: { xs: 1, sm: 3 }, py: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#3066be",
                      letterSpacing: 1,
                      mb: 0.5,
                      fontSize: { xs: 18, sm: 22 },
                    }}
                  >
                    Sales Analytics
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: 15, sm: 17 },
                      color: "#4b4254",
                      mb: 2,
                    }}
                  >
                    Monthly Sales
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#6e6e6e",
                      mb: { xs: 2, sm: 4 },
                    }}
                  >
                    Your sales performance over the last 6 months.
                  </Typography>
                  <Box
                    sx={{
                      height: isMobile ? 260 : 380,
                      width: "100%",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Bar data={salesData} options={chartOptions} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Top Selling Products and Top Buyers - grid 6 on desktop, full width on mobile */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={2}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
                minWidth: 0,
                px: { xs: mobileCardPx, sm: 3 },
                py: { xs: 2, sm: 2 },
                height: "100%",
              }}
            >
              <CardContent sx={{ px: { xs: 0.5, sm: 1 }, py: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: 17, sm: 19 },
                  }}
                >
                  Top Selling Products
                </Typography>
                <Box
                  component="table"
                  sx={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <Box
                    component="thead"
                    sx={{ borderBottom: "1px solid #eee" }}
                  >
                    <Box component="tr">
                      <Box
                        component="th"
                        sx={{
                          textAlign: "left",
                          padding: 1,
                          fontWeight: 700,
                          color: "#3066be",
                        }}
                      >
                        Product
                      </Box>
                      <Box
                        component="th"
                        sx={{
                          textAlign: "center",
                          padding: 1,
                          fontWeight: 700,
                          color: "#3066be",
                        }}
                      >
                        Units Sold
                      </Box>
                      <Box
                        component="th"
                        sx={{
                          textAlign: "center",
                          padding: 1,
                          fontWeight: 700,
                          color: "#3066be",
                        }}
                      >
                        Revenue (₹)
                      </Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {topProducts.map((row) => (
                      <Box component="tr" key={row.name}>
                        <Box
                          component="td"
                          sx={{
                            padding: 1,
                            fontWeight: 600,
                            fontSize: { xs: 14, sm: 15 },
                          }}
                        >
                          {row.name}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            padding: 1,
                            textAlign: "center",
                            fontSize: { xs: 14, sm: 15 },
                          }}
                        >
                          {row.units}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            padding: 1,
                            textAlign: "center",
                            fontSize: { xs: 14, sm: 15 },
                          }}
                        >
                          {row.revenue}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              elevation={2}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
                minWidth: 0,
                px: { xs: mobileCardPx, sm: 3 },
                py: { xs: 2, sm: 2 },
                height: "100%",
              }}
            >
              <CardContent sx={{ px: { xs: 0.5, sm: 1 }, py: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: 17, sm: 19 },
                  }}
                >
                  Top Buyers
                </Typography>
                <Box
                  component="table"
                  sx={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <Box
                    component="thead"
                    sx={{ borderBottom: "1px solid #eee" }}
                  >
                    <Box component="tr">
                      <Box
                        component="th"
                        sx={{
                          textAlign: "left",
                          padding: 1,
                          fontWeight: 700,
                          color: "#3066be",
                        }}
                      >
                        Buyer
                      </Box>
                      <Box
                        component="th"
                        sx={{
                          textAlign: "center",
                          padding: 1,
                          fontWeight: 700,
                          color: "#3066be",
                        }}
                      >
                        Orders
                      </Box>
                      <Box
                        component="th"
                        sx={{
                          textAlign: "center",
                          padding: 1,
                          fontWeight: 700,
                          color: "#3066be",
                        }}
                      >
                        Total Spent (₹)
                      </Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {topBuyers.map((row) => (
                      <Box component="tr" key={row.name}>
                        <Box
                          component="td"
                          sx={{
                            padding: 1,
                            fontWeight: 600,
                            fontSize: { xs: 14, sm: 15 },
                          }}
                        >
                          {row.name}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            padding: 1,
                            textAlign: "center",
                            fontSize: { xs: 14, sm: 15 },
                          }}
                        >
                          {row.orders}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            padding: 1,
                            textAlign: "center",
                            fontSize: { xs: 14, sm: 15 },
                          }}
                        >
                          {row.spent}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
