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

import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import Navbar from "../Components/Navbar";


const features = [
  {
    icon: <SmartToyOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Unified Connectivity",
    desc: "Seamlessly connect all your business tools and platforms for a complete, unified workflow.",
    to: "#", 
  },
  {
    icon: <BarChartOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Real-Time Insights",
    desc: "Get instant visibility into your business performance with detailed reports and customizable dashboards.",
    to: "#",
  },
  {
    icon: <BoltOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Automation Engine",
    desc: "Automate repetitive tasks and workflows with our powerful automation engine. Save time and reduce human error.",
    to: "#",
  },
  {
    icon: <SecurityOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Enterprise Security",
    desc: "Bank-level security with end-to-end encryption, compliance certifications, and advanced threat protection.",
    to: "#",
  },
  {
    icon: <SupportAgentOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "24/7 Monitoring",
    desc: "Round-the-clock system monitoring ensures 99.9% uptime and immediate alerts for any potential issues.",
    to: "#",
  },
  {
    icon: <GroupsOutlinedIcon sx={{ color: "#15b76c", fontSize: 36 }} />,
    iconBg: "#e8f7f0",
    title: "Team Collaboration",
    desc: "Enhanced team collaboration tools with real-time communication, file sharing, and project management.",
    to: "#",
  },
];

const FeatureAnalyticsSection = () => {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: "#fff",
          position: 'relative',
          zIndex: 2,
          borderRadius: { md: '20px 20px 0 0' },
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{
          px: { xs: 3, sm: 6, md: 10, lg: 16 },
          py: { xs: 3, sm: 6, md: 8, lg: 10 },
          display:"flex",
          flexDirection:"column",
          gap:"50px",
        }}>
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
              Our Core{" "}
              <Box component="span" sx={{ color: "#2E9E53" }}>
                Features
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
              Discover how BizBridge transforms your business operations with
              cutting-edge technology and powerful automation.
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
                <RouterLink to={feature.to} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'block' }}>
                  <Paper
                    elevation={0}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      p:"35px 30px",
                      bgcolor: "#fff",
                      border: '1px solid #d6eede',
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transition: "background-color 0.6s ease",
                        backgroundColor:"#2E9E53",
                      }
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: feature.iconBg,
                        borderRadius: '50%',
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
                        mb:"10px",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: hoveredIndex === index ? "#fff" : "#8b8e94",
                        fontWeight: 400,
                        fontSize: { xs: "1rem", md: "1rem" },
                        lineHeight:"1.6",
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </Paper>
                </RouterLink>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FeatureAnalyticsSection;

