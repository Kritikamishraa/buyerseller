import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DrawerAppBar from "./DrawerAppBar";
import Footer from "./Footer";

export default function ProtectedLayout({ children, redirectTo = "/login" }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <>
      <DrawerAppBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
