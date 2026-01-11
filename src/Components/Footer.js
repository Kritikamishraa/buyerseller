import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
  Divider,
  Modal,
} from "@mui/material";
import {
  Facebook,
  LinkedIn,
  Twitter,
  Instagram,
  LocationOn,
  PhoneInTalk,
  Email,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../Images/BizBridge-whiteLogo-1.png";

// --- Social Media Links with Brand Colors ---
const socials = [
  { icon: <Facebook />, label: "Facebook", href: "#", hoverBg: "#1877F2" },
  { icon: <Twitter />, label: "Twitter", href: "#", hoverBg: "#1DA1F2" },
  { 
    icon: <LinkedIn />, 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/company/bizbridge-technology-private-limited", 
    hoverBg: "#0A66C2" 
  },
  { 
    icon: <Instagram />, 
    label: "Instagram", 
    href: "#", 
    hoverBg: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" 
  },
];

const footerNav = {
  Quicklinks: [
    { label: "About Us", to: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Pricing", to: "/pricing" },
  ],
  Company: [
    { label: "FAQ", to: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  "Get In Touch": [
    {
      icon: <LocationOn sx={{ mr: 1, fontSize: "1.1rem", mt: "4px" }} />,
      label:
        "Ashapurna Township, Sheoganj, Rajasthan - 307027 Bhamashah Techno Hub, Sansthanpath, Jhalana Gram, Malviya Nagar, Jaipur - 302017",
      href: "#",
    },
    {
      icon: <PhoneInTalk sx={{ mr: 1, fontSize: "1.1rem" }} />,
      label: "+91 83020 44892",
      href: "tel:+918302044892",
    },
    {
      icon: <Email sx={{ mr: 1, fontSize: "1.1rem" }} />,
      label: "contact@bizbridgetech.com",
      href: "mailto:contact@bizbridgetech.com",
    },
  ],
};

export default function BizBridgeStyleFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openPricing, setOpenPricing] = useState(false);
  const handleOpenPricing = (e) => {
    e.preventDefault();
    setOpenPricing(true);
  };
  const handleClosePricing = () => setOpenPricing(false);

  return (
    <Box sx={{ bgcolor: "#151c29", color: "#d1d5db", position: "relative" }}>
      <Box px={{ xs: 2, sm: 4, md: 6 }} py={8}>
        <Grid container spacing={5}>
          {/* Left Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3} sx={{ maxWidth: 380 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  component="img"
                  src={logo}
                  alt="BizBridge"
                  height={62}
                  sx={{  }}
                />
                {/* <Typography variant="h5" fontWeight="bold" color="#fff">
                  BizBridge
                </Typography> */}
              </Stack>
              <Typography variant="body2" color="#b0b8c3" lineHeight={1.7}>
                Empowering businesses with AI-driven solutions to bridge the gap
                between business and technology.
              </Typography>
              <Stack direction="row" spacing={1}>
                {socials.map((soc) => (
                  <IconButton
                    key={soc.label}
                    aria-label={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#b0b8c3",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: soc.hoverBg,
                        color: "#fff",
                        borderColor: "transparent",
                      },
                    }}
                  >
                    {soc.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={isMobile ? 4 : 2}>
              {Object.keys(footerNav).map((section) => (
                <Grid key={section} item xs={6} sm={4}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#fff"
                    sx={{ mb: 2 }}
                  >
                    {section}
                  </Typography>
                  <Stack spacing={1.5}>
                    {footerNav[section].map((link) =>
                      link.isPricing ? (
                        <Link
                          key={link.label}
                          href="#"
                          underline="none"
                          variant="body2"
                          color="#b0b8c3"
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            "&:hover": { color: "#fff" },
                            transition: "color 0.2s",
                            wordBreak: "break-word",
                            cursor: "pointer",
                          }}
                          onClick={handleOpenPricing}
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          key={link.label}
                          component={link.to ? RouterLink : "a"}
                          to={link.to}
                          href={link.href}
                          underline="none"
                          variant="body2"
                          color="#b0b8c3"
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            "&:hover": { color: "#fff" },
                            transition: "color 0.2s",
                            wordBreak: "break-word",
                          }}
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      )
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 6, borderColor: "#222c40" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="#8d99ae">
            © {new Date().getFullYear()} BizBridge. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              component={RouterLink}
              to="/terms-of-service"
              underline="none"
              variant="body2"
              color="#8d99ae"
              sx={{ "&:hover": { color: "#fff" } }}
            >
              Terms
            </Link>
            <Link
              component={RouterLink}
              to="/privacy-policy"
              underline="none"
              variant="body2"
              color="#8d99ae"
              sx={{ "&:hover": { color: "#fff" } }}
            >
              Privacy
            </Link>
            <Link
              component={RouterLink}
              to="/refund-policy"
              underline="none"
              variant="body2"
              color="#8d99ae"
              sx={{ "&:hover": { color: "#fff" } }}
            >
              Refund Policy
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
