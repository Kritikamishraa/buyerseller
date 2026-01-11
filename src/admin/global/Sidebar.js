import React from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { logout } from "../../redux/slices/userSlice";
import logo from "../../assets/images/logo.jpeg"; // Adjust the path as necessary

const SidebarAdm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { confirm } = Modal;
  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to Log out?",
      icon: <ExclamationCircleOutlined />,
      content: "Your current session will be terminated.",
      onOk() {
        dispatch(logout());
        localStorage.clear();
        message.success("Logout Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      },
    });
  };

  return (
    <>
      <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#000",
                  },
                  [`&.${menuClasses.disabled}`]: {
                    color: "green",
                  },
                  "&:hover": {
                    backgroundColor: "#fafafa",
                    color: "#1976d2",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: "#1976d2",
                  },
                },
              }}
            >
              <MenuItem
                component={<Link to="/dashboard" />}
                style={{
                  marginTop: "40px",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={logo}
                  alt="BizBridge Logo"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <b style={{marginBottom: "40px"}}> BizBridge</b>
              </MenuItem>

              <hr />
              <MenuItem
                component={<Link to="/dashboard" />}
                icon={<DashboardIcon />}
              >
                {" "}
                Dashboard{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/users" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Users{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/seller-categories" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Seller Categories{" "}
              </MenuItem>

              <MenuItem
                component={<Link to="/admin/seller-product" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Seller Products{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/buyer-categories" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Buyer Categories{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/contact" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Contact{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/profile" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Manage Accounts{" "}
              </MenuItem>
            </Menu>
          </Box>

          {/* Log Out  */}
          <Box sx={{ pb: 2 }}>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#000",
                  },

                  "&:hover": {
                    backgroundColor: "#fafafa",
                    color: "#1976d2",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: "#1976d2",
                  },
                },
              }}
            >
              <hr />
              <MenuItem onClick={handleLogout} icon={<LoginIcon />}>
                {" "}
                Log out{" "}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default SidebarAdm;
