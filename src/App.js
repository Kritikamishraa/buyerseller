import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  reloadUser,
  hydrateUserFromStorage,
  refreshTokenUserFromStorage,
} from "./redux/slices/userSlice";
import store from "./redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common Pages
import Home from "./pages/Home";
import NotFound from "./pages/Error";
import ConnectionStatus from "./Components/ConnectionStatus";
import PricingPage from "./pages/PricingPage";
import RefundPolicy from "./pages/RefundPolicy";
import About from "./pages/About";
import DrawerAppBar from "./Components/DrawerAppBar";
import FaqSection from "./pages/FaqSection";
import Footer from "./Components/Footer";
import Contact from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./Components/ScrollToTop";
import ScrollToSectionButton from "./Components/ScrollToSectionButton";
import TrustSection from "./pages/trustsection";
import TestimonialSection from "./pages/TestimonialSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import SelectModePage from "./pages/SelectMode";
import PaymentTerms from "./Seller/PaymentTerms";

// Buyer
import DashboardLayout from "./Buyer/DashboardLayout";
import BuyerCatalog from "./Buyer/Catalog";
import ChatPage from "./Buyer/Chat";
import SettingPage from "./Buyer/Setting";
import OffersPage from "./Buyer/Offers";
import BuyerDashboard from "./Buyer/BuyerDashboard";
import MyOrders from "./Buyer/MyOrders";
import Ledger from "./Buyer/Ledger";
import SupportPage from "./Buyer/Support";
import SellerRequest from "./Buyer/SellerRequest";
import SellerNetwork from "./Buyer/SellerNetwork";
import ViewProducts from "./Buyer/ViewProducts";
import CartPage from "./Buyer/CartPage";
// import { CartProvider } from "./Buyer/CartContext";
import ProductDetails from "./Buyer/Productdetails.js";

// Seller
import SellerDashboardLayout from "./Seller/SellerDashboardLayout";
import SellerPage from "./Seller/Seller";
import Catalog from "./Seller/Catalog";
import BuyerNetwork from "./Seller/BuyerNetwork";
import Order from "./Seller/Order";
import LedgerPage from "./Seller/Ledger";
import PaymentsPage from "./Seller/Payments";
import SchemesAdsPage from "./Seller/SchemesAds";
import SellerAnalytics from "./Seller/SellerAnalytics";
import SellerChat from "./Seller/SellerChat";
import SellerSettings from "./Seller/Settings";
import SellerSupport from "./Seller/Support";
import InterestTransactionCalculator from "./Seller/InterestTransactionCalculator";
import CategoryManagement from "./Seller/CategoryManagement";

// Admin
import Layout from "./admin/global/Layout";
import AdminDashboard from "./admin/Dashboard";
import AdminProfile from "./admin/Profile";
import AdminUsers from "./admin/Users";
import AdminContact from "./admin/Contact";
import AdminSellerCategories from "./admin/SellerCategories.js";
import AdminSellerProduct from "./admin/SellerProduct.js";
import AdminBuyerCategories from "./admin/BuyerCategories.js";

import "./App.css";

const AdminDashboardHDC = Layout(AdminDashboard);
const AdminProfileHDC = Layout(AdminProfile);
const AdminUsersHDC = Layout(AdminUsers);
const AdminContactHDC = Layout(AdminContact);
const AdminSellerCategoriesHDC = Layout(AdminSellerCategories);
const AdminSellerProductHDC = Layout(AdminSellerProduct);
const AdminBuyerCategoriesHDC = Layout(AdminBuyerCategories);

// Layout for Navbar + Footer pages
function MainLayout({ children }) {
  return (
    <>
      <DrawerAppBar />
      {children}
      <Footer />
    </>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Redirect Authenticated Users to Correct Dashboard
function RedirectAuthenticatedUser() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return <Navigate to="/login" replace />;

  const user = JSON.parse(storedUser);

  if (user.role === 1) return <Navigate to="/admin-dashboard" replace />;
  if (user.role === 0) {
    if (user.mode === "seller")
      return <Navigate to="/seller-dashboard" replace />;
    if (user.mode === "buyer")
      return <Navigate to="/buyer-dashboard" replace />;
    return <Navigate to="/select-mode" replace />;
  }

  return <Navigate to="/login" replace />;
}

function AppContent() {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    loading: authLoading,
    token,
  } = useSelector((state) => state.user);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUser = localStorage.getItem("user");

      try {
        if (storedToken && storedUser) {
          dispatch(
            hydrateUserFromStorage({
              token: storedToken,
              user: JSON.parse(storedUser),
            })
          );
          await store.dispatch(reloadUser());
        } else if (storedRefreshToken && storedUser) {
          dispatch(
            refreshTokenUserFromStorage({
              refreshToken: storedRefreshToken,
              user: JSON.parse(storedUser),
            })
          );
          await store.dispatch(reloadUser());
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        localStorage.clear();
      }

      setInitialLoading(false);
    }

    initAuth();
  }, [dispatch]);

  if (initialLoading || authLoading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload("/login");
    // navigate("/login");
  };

  return (
    <>
      <ScrollToTop />
      <ConnectionStatus />
      <ScrollToSectionButton showAfter={200} tooltip="Go to top" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/testimonials"
          element={
            <MainLayout>
              <TestimonialSection />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <TrustSection />
            </MainLayout>
          }
        />
        <Route path="/faq" element={<FaqSection />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <RedirectAuthenticatedUser /> : <Login />}
        />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Select Mode */}
        <Route
          path="/select-mode"
          element={
            <ProtectedRoute allowedRoles={[0]}>
              <SelectModePage />
            </ProtectedRoute>
          }
        />

        {/* Buyer Dashboard */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[0]}>
              {/* <CartProvider> */}
              <Outlet />
              {/* </CartProvider> */}
            </ProtectedRoute>
          }
        >
          <Route path="/buyer-dashboard" element={<DashboardLayout />}>
            <Route index element={<BuyerDashboard />} />
            <Route path="seller-requests" element={<SellerRequest />} />
            <Route path="seller-network" element={<SellerNetwork />} />
            <Route path="buyer-catalog" element={<BuyerCatalog />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="ledger" element={<Ledger />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
          </Route>
        </Route>

        {/* Seller Dashboard */}
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={[0]}>
              <SellerDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerPage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="buyer-network" element={<BuyerNetwork />} />
          <Route path="payment-terms" element={<PaymentTerms />} />
          <Route path="orders" element={<Order />} />
          <Route path="ledger" element={<LedgerPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="schemes-ads" element={<SchemesAdsPage />} />
          <Route path="analytics" element={<SellerAnalytics />} />
          <Route path="seller-chat" element={<SellerChat />} />
          <Route path="settings" element={<SellerSettings />} />
          <Route path="support" element={<SellerSupport />} />
          <Route
            path="interest-transaction-calculator"
            element={<InterestTransactionCalculator />}
          />
        </Route>

        {/* Admin Dashboard (Role 1 only) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              {/* <div>
                Admin Dashboard
                <br />
                <a href="/login" onClick={handleLogout}>
                  Logout
                </a>
              </div> */}
              <AdminDashboardHDC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              {" "}
              <AdminProfileHDC />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={  <ProtectedRoute allowedRoles={[1]}> <AdminUsersHDC /> </ProtectedRoute>} />
        <Route path="/admin/contact" element={<AdminContactHDC />} />
        <Route
          path="/admin/seller-categories"
          element={<ProtectedRoute allowedRoles={[1]}> <AdminSellerCategoriesHDC /> </ProtectedRoute>}
        />
        <Route
          path="/admin/seller-product"
          element={ <ProtectedRoute allowedRoles={[1]}> <AdminSellerProductHDC /> </ProtectedRoute>}
        />
        <Route
          path="/admin/buyer-categories"
          element={ <ProtectedRoute allowedRoles={[1]}> <AdminBuyerCategoriesHDC /> </ProtectedRoute>}
        />

        {/* Catch All */}
        <Route path="*" element={<NotFound /> } />
      </Routes>

      {/* Toast container should be here */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default function App() {
  return (
    <ProSidebarProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ProSidebarProvider>
  );
}
