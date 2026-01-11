import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import logo from "../Images/logo.jpg"; // <-- Update this path as needed

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Service", path: "/services" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Scroll handler for smooth scrolling to sections
  const handleScroll = (event, path) => {
    event.preventDefault();
    const id = path.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (mobileOpen) setMobileOpen(false);
  };

  const handleNavClick = (event, path) => {
    event.preventDefault();
    navigate(path);
    if (mobileOpen) setMobileOpen(false);
  };

  // Logo section with image before text
  const LogoSection = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={logo} // <-- Update this path as needed
        // alt="BizBridge Logo"
        sx={{
          height: 55,
          width: 55,
          minWidth: 55,
          minHeight: 55,
          borderRadius: "8px",
          bgcolor: "#222c22",
          objectFit: "contain",
          mr: 1.3,
        }}
      />
      <Typography
        variant="h6"
        component={Link}
        href="/"
        underline="none"
        sx={{
          color: "#2054a3",
          fontFamily: '"Pacifico", cursive',
          fontWeight: 700,
          fontSize: { xs: "1.3rem", sm: "1.55rem" },
          textDecoration: "none",
          lineHeight: 1,
        }}
      >
        BizBridge
      </Typography>
    </Box>
  );

  // Desktop nav menu with smooth scroll
  const NavMenuDesktop = (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        gap: { md: 1.5, lg: 3 },
      }}
    >
      {navItems.map((item) => (
        <Button
          key={item.label}
          sx={{
            color: "#222",
            fontWeight: 400,
            mx: { md: 0.5, lg: 1 },
            fontSize: { md: "1.07rem", lg: "1.13rem" },
            background: "transparent",
            textTransform: "none",
            borderRadius: "6px",
            px: { md: 1.5, lg: 2.2 },
            minWidth: 0,
            "&:hover": { bgcolor: "#f5f6fa" },
          }}
          component={RouterLink}
          to={item.path}
          underline="none"
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  // Drawer for mobile with smooth scroll
  const drawer = (
    <Box
      sx={{
        bgcolor: "#fff",
        height: "100%",
        px: { xs: 0, sm: 1 },
        minWidth: 220,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
        }}
      >
        {LogoSection}
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#111" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "left",
                pl: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
              component={RouterLink}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: "#222",
                  fontWeight: 400,
                  fontSize: { xs: "1.01rem", sm: "1.07rem" },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ pl: 4, py: 1.5 }}
            component={Link}
            href="/login"
            onClick={handleDrawerToggle}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "13px",
                color: "#2054a3",
                borderColor: "#bfc8d3",
                fontWeight: 600,
                textTransform: "none",
                fontSize: { xs: "1.02rem", sm: "1.09rem" },
                py: 1.1,
              }}
            >
              Login
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#fff" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#111",
          borderBottom: "1px solid #e6e7eb",
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 2, sm: 3, md: 6, lg: 11 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ minWidth: 0, flexShrink: 0 }}>{LogoSection}</Box>
          {NavMenuDesktop}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                display: { xs: "none", md: "inline-flex" },
                borderRadius: "13px",
                color: "#2054a3",
                borderColor: "#bfc8d3",
                fontWeight: 600,
                px: { md: 3, lg: 4 },
                minWidth: { md: 86, lg: 120 },
                textTransform: "none",
                fontSize: { md: "1.09rem", lg: "1.14rem" },
                py: 1.09,
              }}
              component={Link}
              href="/login"
              underline="none"
            >
              Login
            </Button>

            {/* Hamburger menu for mobile */}
            <IconButton
              color="inherit"
              aria-label="open navigation"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", md: "none" }, ml: 0.5 }}
              size="large"
            >
              <MenuIcon sx={{ fontSize: "2.1rem" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer for fixed AppBar */}
      <Box sx={{ minHeight: { xs: 56, sm: 64 } }} />

      {/* Responsive Drawer for Mobile/Tablet */}
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "84vw",
            maxWidth: 330,
            minWidth: 210,
            bgcolor: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
