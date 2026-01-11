import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  Store,
  ShoppingCart,
  Assignment,
  Chat,
  Settings,
  Support,
  Book,
  AccountCircle,
  Menu as MenuIcon,
} from "@mui/icons-material";
import logo from "../Images/BizBridge-Logo-1.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMode } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";

const drawerWidth = 230;

const sidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, route: "/seller-dashboard" },
  { text: "Catalog", icon: <Book />, route: "/seller-dashboard/catalog" },
  {
    text: "Category Management",
    icon: <Book />,
    route: "/seller-dashboard/category-management",
  },
  {
    text: "Buyer Network",
    icon: <Store />,
    route: "/seller-dashboard/buyer-network",
  },
  {
    text: "Payment Terms",
    icon: <Assignment />,
    route: "/seller-dashboard/payment-terms",
  },

  { text: "Orders", icon: <ShoppingCart />, route: "/seller-dashboard/orders" },
  { text: "Ledger", icon: <Assignment />, route: "/seller-dashboard/ledger" },
  {
    text: "Payments",
    icon: <Assignment />,
    route: "/seller-dashboard/payments",
  },
  {
    text: "Schemes & Ads",
    icon: <Assignment />,
    route: "/seller-dashboard/schemes-ads",
  },
  {
    text: "Analytics",
    icon: <Assignment />,
    route: "/seller-dashboard/analytics",
  },
  { text: "Chat", icon: <Chat />, route: "/seller-dashboard/seller-chat" },
  { text: "Settings", icon: <Settings />, route: "/seller-dashboard/settings" },
  { text: "Support", icon: <Support />, route: "/seller-dashboard/support" },
  {
    text: "Calculator",
    icon: <Support />,
    route: "/seller-dashboard/interest-transaction-calculator",
  },
];

export default function SellerDashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isSeller, setIsSeller] = useState(
    location.pathname.toLowerCase().startsWith("/seller-dashboard")
  );

  useEffect(() => {
    setIsSeller(
      location.pathname.toLowerCase().startsWith("/seller-dashboard")
    );
  }, [location.pathname]);

  const handleToggle = async () => {
    if (!user?._id) return;

    const newMode = isSeller ? "buyer" : "seller";
    setIsSeller(!isSeller);
    dispatch(updateUserMode({ id: user._id, mode: newMode }));

    // Navigate accordingly
    if (newMode === "seller") {
      navigate("/seller-dashboard", { replace: true });
    } else {
      navigate("/buyer-dashboard", { replace: true });
    }
  };

  useEffect(() => {
    if (user?.mode === "seller") {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  }, [user]);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleProfileIconClick = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true);
    setProfileMenuAnchor(null);
  };

  const handleCloseLogoutModal = () => setOpenLogoutModal(false);

  const handleLogout = () => {
    localStorage.clear();
    setOpenLogoutModal(false);
    window.location.reload("/login");
  };

  const drawerContents = (
    <>
      <Box
        component={Link}
        to="/seller-dashboard"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 2,
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
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
        {/* <Box
          component="img"
          src={logo}
          alt="BizBridge Logo"
          sx={{ width: 42, height: 42, borderRadius: 1, mr: 1.5 }}
        /> */}
        {/* <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#3066be", letterSpacing: 1, fontFamily: "inherit" }}
        >
          BizBridge
        </Typography> */}
      </Box>

      

      <Divider />
      <Typography
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          color: "#4b4b4b",
          fontSize: 15,
          letterSpacing: 0.5,
        }}
      >
        Seller View
      </Typography>
      <List>
        {sidebarItems.map(({ text, icon, route }) => (
          <ListItem
            button
            key={text}
            selected={location.pathname === route}
            sx={{
              py: 1,
              mx: 1,
              my: 0.5,
              borderRadius: 2,
              color: "#2e4254",
              background: location.pathname === route ? "#dae4f2" : "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                background: "#3066be",
                color: "#fff",
              },
              fontWeight: location.pathname === route ? 700 : 600,
              maxWidth: "100%",
              overflowX: "hidden",
            }}
            onClick={() => {
              navigate(route, { replace: true });
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === route ? "#3066be" : "#4b4b4b",
                minWidth: 0,
                pr: 1,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontWeight: location.pathname === route ? 700 : 600,
                fontSize: 15,
                letterSpacing: 0.2,
                sx: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        minWidth: 0,
        overflowX: "hidden",
        background: "#f2f3f7",
        boxSizing: "border-box",
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#fff",
            borderRight: "1px solid #ededed",
            overflowX: "hidden",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {drawerContents}
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          width: "100%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            height: 60,
            background: "#fff",
            borderBottom: "1px solid #ededed",
            display: "flex",
            alignItems: "center",
            px: { xs: 2, sm: 4 },
            position: "sticky",
            top: 0,
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
              aria-label="open drawer"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}
          {user?.name && (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "#2e4254",
                ml: 2,
                mr: 2,
                whiteSpace: "nowrap",
                alignSelf: "center",
              }}
            >
              {user.name}
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#f6f9fc",
              borderRadius: 20,
              px: 0.7,
              py: 0.2,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              ml: 2,
              mr: 1,
              minWidth: 130,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: !isSeller ? 700 : 400,
                color: !isSeller ? "#2864fd" : "#63687a",
                transition: "color 0.2s",
                mr: 1,
                ml: 1,
                cursor: "pointer",
                display: { xs: "none", md: "block" },
              }}
              onClick={handleToggle}
            >
              View as Buyer
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: !isSeller ? 700 : 400,
                color: !isSeller ? "#2864fd" : "#63687a",
                transition: "color 0.2s",
                mr: 1,
                ml: 1,
                cursor: "pointer",

                display: { xs: "block", md: "none" },
              }}
              onClick={handleToggle}
            >
              Buyer
            </Typography>

            <Switch
              checked={isSeller}
              onChange={handleToggle}
              color="primary"
              sx={{
                "& .MuiSwitch-thumb": { color: "#2864fd" },
                "& .MuiSwitch-track": { backgroundColor: "#cfd7ee" },
                mx: 0,
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontWeight: isSeller ? 700 : 400,
                color: isSeller ? "#2864fd" : "#63687a",
                transition: "color 0.2s",
                ml: 1,
                cursor: "pointer",

                display: { xs: "none", md: "block" },
              }}
              onClick={handleToggle}
            >
              View as Seller
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: isSeller ? 700 : 400,
                color: isSeller ? "#2864fd" : "#63687a",
                transition: "color 0.2s",
                ml: 1,
                cursor: "pointer",

                display: { xs: "block", md: "none" },
              }}
              onClick={handleToggle}
            >
              Seller
            </Typography>
          </Box>

          <Box
            sx={{ ml: 2, cursor: "pointer" }}
            onClick={handleProfileIconClick}
          >
            <AccountCircle sx={{ fontSize: 35, color: "text.secondary" }} />
          </Box>

          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                handleOpenLogoutModal();
                handleProfileMenuClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>

          {/* Logout Modal */}
          <Dialog open={openLogoutModal} onClose={handleCloseLogoutModal}>
            <DialogTitle>Logout</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to logout?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLogoutModal}>Cancel</Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 4 },
            width: "100%",
            mx: "auto",
            minHeight: "calc(100vh - 60px)",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
