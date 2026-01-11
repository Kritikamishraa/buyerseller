import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../Images/BizBridge-Logo-1.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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


  const handleNavClick = (event, path) => {
    event.preventDefault();
    navigate(path);
    if (mobileOpen) setMobileOpen(false);
  };

  const LogoSection = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={logo}
        sx={{
          height: 55,
          objectFit: "contain",
        }}
      />
    </Box>
  );

  const NavMenuDesktop = (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        marginLeft: "80px",
        gap: { md: 1.5, lg: 3 },
      }}
    >
      {navItems.map((item) => (
        <Button
          key={item.label}
          sx={{
            color: "#222",
            fontWeight: 500,
            fontSize: { md: "1rem", lg: "1rem" },
            textTransform: "none",
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

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/login"
            onClick={handleDrawerToggle}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "#fff",
                color: "#222",
                fontWeight: 500,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                borderRadius: "100px",
                textTransform: "none",
              }}
            >
              Try for free
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
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#111",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 2, sm: 3, md: 6, lg: 11 },
            py: { xs: "12px", sm: "12px", md: "12px", lg: "12px" },
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
                border: "none",
                fontWeight: 500,
                fontSize: "1rem",
                px: 3,
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                color: "#222",
              }}
              component={Link}
              href="/login"
              underline="none"
            >
              Login
            </Button>

            <Button
              variant="contained"
              component={Link}
              href="/login"
              sx={{
                display: { xs: "none", md: "inline-flex" },
                background: "#fff",
                color: "#0B4064",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "8px",
                border: "2px solid #0B4064 ",
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Try for Free
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
