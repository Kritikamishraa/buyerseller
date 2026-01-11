import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grow,
  Grid,
} from "@mui/material";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";


const CurveUp = () => (
  <svg width="150" height="120" viewBox="0 0 300 120">
    <path
      d="M 0 110 Q 150 10 300 110"
      stroke="#2E9E53"
      strokeWidth="3"
      strokeDasharray="12 10"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const CurveDown = () => (
  <svg width="150" height="120" viewBox="0 0 300 120">
    <path
      d="M 0 10 Q 150 110 300 10"
      stroke="#2E9E53"
      strokeWidth="3"
      strokeDasharray="12 10"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const steps = [
  {
    number: "1",
    icon: <PersonAddOutlinedIcon sx={{ color: "#28a745", fontSize: 50 }} />,
    title: "Sign Up",
    desc: "Create your account in minutes with our simple onboarding process. No credit card required for free trial.",
  },
  {
    number: "2",
    icon: <SettingsOutlinedIcon sx={{ color: "#28a745", fontSize: 50 }} />,
    title: "Configure",
    desc: "Set up your integrations and customize workflows to match your business needs with our intuitive interface.",
  },
  {
    number: "3",
    icon: <RocketLaunchOutlinedIcon sx={{ color: "#28a745", fontSize: 50 }} />,
    title: "Launch",
    desc: "Go live with your automated processes and start seeing immediate improvements in efficiency and productivity.",
  },
];

export default function HowItWorksPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Box
      sx={{
        background: "#f9fafb",
        width: "100%",
        px: { xs: 3, sm: 6, md: 10, lg: 16 },
        py: { xs: 3, sm: 6, md: 8, lg: 10 },
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: "10px",
            color: "#101828",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" },
          }}
        >
          How It <span style={{ color: "#2E9E53" }}>Works</span>
        </Typography>

        <Typography
          sx={{
            maxWidth: 700,
            mx: "auto",
            color: "#8b8e94",
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Start your BizBridge journey in three simple steps.
        </Typography>
      </Box>

      {/* GRID LAYOUT */}
      <Grid
        container
        width={"100%"}
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          position: "relative",
          "& .MuiGrid-item": {
            paddingLeft: "0 !important",
          }
        }}
      >
        {steps.map((step, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{ position: "relative", display: "flex" }}
          >
            <Grow in timeout={(index + 1) * 500}>
              <Paper
                variant="outlined"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: "16px",
                  backgroundColor: "transparent",
                  border: "none",
                  transition: "0.3s ease",
                  // borderColor: "#dadada",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  // "&:hover": {
                  //   transform: "translateY(-10px)",
                  //   boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  // },
                }}
              >
                {/* STEP NUMBER */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: "32px", sm: "36px", md: "39px" },   
                    left: { xs: "42%", sm: "43%", md: "44%" },     
                    transform: "translateX(-50%)",
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    backgroundColor: "#bff6d1",
                    color: "#2E9E53",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: "12px",
                    zIndex: 10,
                  }}
                >
                  {step.number}
                </Box>

              {/* ICON */}
              <Box sx={{ mb: "28px" }}>{step.icon}</Box>

              {/* TITLE */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: "12px",
                  color: hoveredIndex === index ? "#28a745" : "#1a2330",
                }}
              >
                {step.title}
              </Typography>

              {/* DESCRIPTION */}
              <Typography sx={{ color: "#8b8e94", lineHeight: 1.7, textAlign: "center" }}>
                {step.desc}
              </Typography>
            </Paper>
          </Grow>

            {/* CURVED CONNECTORS (DESKTOP ONLY) */ }
            {!isMobile && index === 0 && (
          <Box
            sx={{
              position: "absolute",
              right: "-69px",
              top: "11%",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <CurveUp />
          </Box>
        )}

        {!isMobile && index === 1 && (
          <Box
            sx={{
              position: "absolute",
              right: "-91px",
              top: "23%",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <CurveDown />
          </Box>
        )}
      </Grid>
        ))}
    </Grid>
    </Box >
  );
}
