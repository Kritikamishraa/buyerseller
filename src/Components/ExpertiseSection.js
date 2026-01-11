import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildIcon from "@mui/icons-material/Build";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CodeIcon from "@mui/icons-material/Code";

import Navbar from "../Components/Navbar";

const features = [
  {
    icon: <SmartToyOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "AI & Machine Learning",
    // desc: "Seamlessly connect all your business tools and platforms for a complete, unified workflow.",
    // to: "#", // Add your link path here
  },
  {
    icon: <CloudQueueIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "SaaS Platform Development",
    // --- DESCRIPTION UPDATED ---
    // desc: "Get instant visibility into your business performance with detailed reports and customizable dashboards.",
    // to: "#",
  },
  {
    icon: <BuildIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Business Automation",
    // desc: "Automate repetitive tasks and workflows with our powerful automation engine. Save time and reduce human error.",
    // to: "#",
  },
  {
    icon: <AnalyticsIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Data Analytics & Insights",
    // desc: "Bank-level security with end-to-end encryption, compliance certifications, and advanced threat protection.",
    // to: "#",
  },
  // {
  //     icon: <SupportAgentOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
  //     iconBg: "#e8f7f0",
  //     title: "Seamless Integrations",
  //     // desc: "Round-the-clock system monitoring ensures 99.9% uptime and immediate alerts for any potential issues.",
  //     // to: "#",
  // },
  {
    icon: <SettingsSuggestIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Cloud Solutions & DevOps",
    // desc: "Enhanced team collaboration tools with real-time communication, file sharing, and project management.",
    // to: "#",
  },
  // {
  //     icon: <GroupsOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
  //     iconBg: "#e8f7f0",
  //     title: "IT Consulting",
  //     // desc: "Enhanced team collaboration tools with real-time communication, file sharing, and project management.",
  //     // to: "#",
  // },
  {
    icon: <CodeIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Web & App Development",
    // desc: "Enhanced team collaboration tools with real-time communication, file sharing, and project management.",
    // to: "#",
  },
];

const ExpertiseSection = () => {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        position: "relative",
        zIndex: 2,
        borderRadius: { md: "20px 20px 0 0" },
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, sm: 6, md: 10, lg: 16 }, // left-right spacing
          py: { xs: 3, sm: 6, md: 8, lg: 10 },
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
              color: "#101828",
              lineHeight: 1.3,
              mb: "10px",
            }}
          >
            Our{" "}
            <Box component="span" sx={{ color: "#2E9E53" }}>
              Expertise
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "#8b8e94",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 650,
              mx: "auto",
            }}
          >
            The domains we excel in built for modern businesses.
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <RouterLink
                to={feature.to}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  height: "100%",
                  display: "block",
                }}
              >
                <Paper
                  elevation={0}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    p: "35px 30px",
                    bgcolor: "#fff",
                    border: "1px solid #d6eede",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transition: "background-color 0.6s ease",
                      backgroundColor: "#2E9E53",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: feature.iconBg,
                      borderRadius: "50%",
                      width: 64,
                      height: 64,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: "14px",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.2rem", md: "1.3rem" },
                      color: hoveredIndex === index ? "#fff" : "#1d1d1d",
                      mb: "10px",
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Paper>
              </RouterLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ExpertiseSection;
