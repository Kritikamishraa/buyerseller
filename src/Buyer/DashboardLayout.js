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
  LocalOffer,
  Chat,
  Settings,
  Support,
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../Images/BizBridge-Logo-1.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMode } from "../redux/slices/userSlice";

const drawerWidth = 230;
const sidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, route: "/buyer-dashboard" },

  {
    text: "Seller Requests",
    icon: <Store />,
    route: "/buyer-dashboard/seller-requests",
  },
  {
    text: "Seller Network",
    icon: <Store />,
    route: "/buyer-dashboard/seller-network",
  },
  // { text: "Catalog", icon: <Store />, route: "/buyer-dashboard/buyer-catalog" },
  {
    text: "My Orders",
    icon: <ShoppingCart />,
    route: "/buyer-dashboard/my-orders",
  },
  { text: "Ledger", icon: <Assignment />, route: "/buyer-dashboard/ledger" },
  { text: "Offers", icon: <LocalOffer />, route: "/buyer-dashboard/offers" },
  { text: "Chat", icon: <Chat />, route: "/buyer-dashboard/chat" },
  { text: "Settings", icon: <Settings />, route: "/buyer-dashboard/settings" },
  { text: "Support", icon: <Support />, route: "/buyer-dashboard/support" },
];

export default function DashboardLayout() {
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
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

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
        to="/buyer-dashboard"
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 2,
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="BizBridge Logo"
          sx={{ width: 45, height: 45, borderRadius: 1, mr: 1.5 }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#fb8900", letterSpacing: 1, fontFamily: "inherit" }}
        >
          BizBridge
        </Typography>
      </Box>

      <Divider />
      <Typography
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          color: "#2e4254",
          fontSize: 15,
          letterSpacing: 0.5,
        }}
      >
        Buyer View
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
              background: location.pathname === route ? "#f2f3f7" : "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                background: "#d87106",
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
                color: location.pathname === route ? "#fb8900" : "#2e4254",
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
            overflowY: "auto",
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
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
              size="large"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}
          {user?.name && (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                ml: 2,
                mr: 2,
                whiteSpace: "nowrap",
                alignSelf: "center",
                color: "#fb8900",
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
              ml: 1,
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

            {/* SWITCH */}
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
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#f1f1f1",

              minWidth: 28,
              minHeight: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleProfileIconClick}
          >
            <AccountCircle sx={{ fontSize: 40, color: "#63687a" }} />
          </Box>
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleOpenLogoutModal}>Logout</MenuItem>
          </Menu>
        </Box>

        <Dialog open={openLogoutModal} onClose={handleCloseLogoutModal}>
          <DialogTitle>Logout</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to logout?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutModal}>Cancel</Button>
            <Button color="primary" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </DialogActions>
        </Dialog>

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
