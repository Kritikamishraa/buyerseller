import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBuyerOrders, updateProcessStep } from "../redux/slices/ordersSlice";
import { getSellerInvoice } from "../redux/slices/invoiceSlice";

const statusTabs = ["All", "Pending", "Processing", "Completed", "Cancelled"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManageOrders() {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showProgressFor, setShowProgressFor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  useEffect(() => {
    dispatch(getBuyerOrders());
  }, [dispatch]);

  // 🧩 Helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Toggle process flow visibility
  const toggleProgress = (id) => {
    setShowProgressFor(showProgressFor === id ? null : id);
  };

  const filteredOrders =
    selectedTab === 0
      ? orders
      : orders.filter(
          (order) =>
            order.orderStatus &&
            order.orderStatus.toLowerCase() ===
              statusTabs[selectedTab].toLowerCase()
        );

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return { bg: "#ff9800", color: "#fff" };
    if (s === "processing") return { bg: "#2961e1", color: "#fff" };
    if (s === "completed" || s === "delivered")
      return { bg: "#22c55e", color: "#fff" };
    if (s === "cancelled") return { bg: "#ef4444", color: "#fff" };
    return { bg: "#9ca3af", color: "#fff" };
  };

  const buyerVisibleSteps = orders
    .map((order) => order?.processFlow)
    ?.flat()
    .map((step) => step?.step)
    .filter((value, index, self) => self?.indexOf(value) === index);

  const getVisibleSteps = (processFlow) => {
    if (!Array.isArray(processFlow)) return [];
    return processFlow.filter((s) => buyerVisibleSteps.includes(s.step));
  };

  // Get Invoice for Buyer
  const handleGetInvoice = async (orderId) => {
    try {
      const res = await dispatch(
        getSellerInvoice({
          order: orderId,
          buyer: user?._id,
        })
      ).unwrap();

      if (res?.data?.invoice) {
        // toast.success("Invoice fetched successfully");
        setSelectedOrder((prev) => ({
          ...prev,
          invoiceData: res.data.invoice,
        }));
        return res.data.invoice;
      } else {
        toast.error("Invoice not found for this order");
        return null;
      }
    } catch (err) {
      toast.error(err?.message || "Failed to fetch invoice");
      return null;
    }
  };

  const handleDownloadInvoice = (invoiceData) => {
    if (!invoiceData) {
      toast.error("No invoice data available to download");
      return;
    }

    // Convert multiple items to table rows
    const itemRows =
      invoiceData.order?.items
        ?.map(
          (item) => `
      <tr>
        <td>${item.name || "N/A"}</td>
        <td>${item.quantity || 0}</td>
        <td>₹${Number(item.discountPrice || 0).toFixed(2)}</td>
        <td>₹${Number(item.finalPrice || 0).toFixed(2)}</td>
      </tr>
    `
        )
        .join("") || "";

    const invoiceContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Proforma Invoice - ${invoiceData.order?._id || "N/A"}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .section { margin-bottom: 20px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .label { font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>PROFORMA INVOICE</h1>
        <p>Invoice ID: ${invoiceData._id || "N/A"}</p>
        <p>Date: ${new Date(invoiceData.createdAt).toLocaleDateString()}</p>
      </div>

      <div class="section">
        <div class="row">
          <div>
            <h3>Seller Information</h3>
            <p><span class="label">Name:</span> ${
              invoiceData.seller?.name || "N/A"
            }</p>
            <p><span class="label">Email:</span> ${
              invoiceData.seller?.email || "N/A"
            }</p>
            <p><span class="label">Phone:</span> ${
              invoiceData.seller?.phone || "N/A"
            }</p>
            <p><span class="label">Business:</span> ${
              invoiceData.seller?.businessName || "N/A"
            }</p>
            <p><span class="label">GST:</span> ${
              invoiceData.seller?.gstNumber || "N/A"
            }</p>
          </div>
          <div>
            <h3>Buyer Information</h3>
            <p><span class="label">Name:</span> ${
              invoiceData.buyer?.name || "N/A"
            }</p>
            <p><span class="label">Email:</span> ${
              invoiceData.buyer?.email || "N/A"
            }</p>
            <p><span class="label">Phone:</span> ${
              invoiceData.buyer?.phone || "N/A"
            }</p>
            <p><span class="label">Business:</span> ${
              invoiceData.buyer?.businessName || "N/A"
            }</p>
            <p><span class="label">GST:</span> ${
              invoiceData.buyer?.gstNumber || "N/A"
            }</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Order Details</h3>
        
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price / Unit</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <p class="total">Subtotal: ₹${Number(
          invoiceData.order.subTotal || 0
        ).toFixed(2)}</p>
        <p class="total">Discount From Payment: ₹${Number(
          invoiceData.order.discountFromPayment || 0
        ).toFixed(2)}</p>
        <p class="total">Grand Total: ₹${Number(
          invoiceData.order.total || 0
        ).toFixed(2)}</p>
      </div>

      <div class="section">
        <h3>Payment & Credit Details</h3>
        <p><span class="label">Payment Mode:</span> ${
          invoiceData.order.selectPaymentType || "N/A"
        }</p>
        <p><span class="label">Credit Period:</span> ${
          invoiceData.creditPeriodDays || 0
        } days</p>
        <p><span class="label">Interest Rate:</span> ${
          invoiceData.interestRatePerYear || 0
        }%</p>
        <p><span class="label">Due Date:</span> ${new Date(
          invoiceData.dueDate
        ).toLocaleDateString()}</p>
        <p><span class="label">Interest Start Date:</span> ${new Date(
          invoiceData.interestAccrualStartDate
        ).toLocaleDateString()}</p>
      </div>

      <div class="section">
        <p><span class="label">Status:</span> ${
          invoiceData.status || "Pending"
        }</p>
      </div>
    </body>
    </html>
  `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadMainInvoice = (invoiceData) => {
    if (!invoiceData) {
      toast.error("No invoice data available to download");
      return;
    }

    // Convert multiple items to table rows
    const itemRows =
      invoiceData.order?.items
        ?.map(
          (item) => `
      <tr>
        <td>${item.name || "N/A"}</td>
        <td>${item.quantity || 0}</td>
        <td>₹${Number(item.discountPrice || 0).toFixed(2)}</td>
        <td>₹${Number(item.finalPrice || 0).toFixed(2)}</td>
      </tr>
    `
        )
        .join("") || "";

    const invoiceContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice - ${invoiceData.order?._id || "N/A"}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .section { margin-bottom: 20px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .label { font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>INVOICE</h1>
        <p>Invoice ID: ${invoiceData._id || "N/A"}</p>
        <p>Invoice No: ${String(invoiceData.invoiceNumber).padStart(2, "0")}</p>
        <p>Date: ${new Date(invoiceData.createdAt).toLocaleDateString()}</p>
      </div>

      <div class="section">
        <div class="row">
          <div>
            <h3>Seller Information</h3>
            <p><span class="label">Name:</span> ${
              invoiceData.seller?.name || "N/A"
            }</p>
            <p><span class="label">Email:</span> ${
              invoiceData.seller?.email || "N/A"
            }</p>
            <p><span class="label">Phone:</span> ${
              invoiceData.seller?.phone || "N/A"
            }</p>
            <p><span class="label">Business:</span> ${
              invoiceData.seller?.businessName || "N/A"
            }</p>
            <p><span class="label">GST:</span> ${
              invoiceData.seller?.gstNumber || "N/A"
            }</p>
          </div>
          <div>
            <h3>Buyer Information</h3>
            <p><span class="label">Name:</span> ${
              invoiceData.buyer?.name || "N/A"
            }</p>
            <p><span class="label">Email:</span> ${
              invoiceData.buyer?.email || "N/A"
            }</p>
            <p><span class="label">Phone:</span> ${
              invoiceData.buyer?.phone || "N/A"
            }</p>
            <p><span class="label">Business:</span> ${
              invoiceData.buyer?.businessName || "N/A"
            }</p>
            <p><span class="label">GST:</span> ${
              invoiceData.buyer?.gstNumber || "N/A"
            }</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Order Details</h3>
        
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price / Unit</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <p class="total">Subtotal: ₹${Number(
          invoiceData.order.subTotal || 0
        ).toFixed(2)}</p>
        <p class="total">Discount From Payment: ₹${Number(
          invoiceData.order.discountFromPayment || 0
        ).toFixed(2)}</p>
        <p class="total">Grand Total: ₹${Number(
          invoiceData.order.total || 0
        ).toFixed(2)}</p>
      </div>

      <div class="section">
        <h3>Payment & Credit Details</h3>
        <p><span class="label">Payment Mode:</span> ${
          invoiceData.order.selectPaymentType || "N/A"
        }</p>
        <p><span class="label">Credit Period:</span> ${
          invoiceData.creditPeriodDays || 0
        } days</p>
        <p><span class="label">Interest Rate:</span> ${
          invoiceData.interestRatePerYear || 0
        }%</p>
        <p><span class="label">Due Date:</span> ${new Date(
          invoiceData.dueDate
        ).toLocaleDateString()}</p>
        <p><span class="label">Interest Start Date:</span> ${new Date(
          invoiceData.interestAccrualStartDate
        ).toLocaleDateString()}</p>
      </div>

      <div class="section">
        <p><span class="label">Status:</span> ${
          invoiceData.status || "Pending"
        }</p>
      </div>
    </body>
    </html>
  `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleUpdateStep = async (step) => {
    try {
      setUpdating(true);

      const res = await dispatch(
        updateProcessStep({
          orderId: selectedOrder?._id,
          step: step.step,
          actionBy: user?.mode,
        })
      ).unwrap();

      toast.success(res?.message || "Step updated successfully!");

      dispatch(getBuyerOrders());

      setSelectedOrder(res.data);

      setShowProgressFor(selectedOrder?._id);

      setOpenModal(false);
    } catch (err) {
      toast.error(
        err?.message || err?.response?.data?.message || "Failed to update step"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Proforma Invoice Component for Buyer
  const ProformaInvoiceSection = ({ invoiceData }) => {
    if (!invoiceData) {
      return (
        <Box textAlign="center" sx={{ py: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No invoice data available
          </Typography>
          <Button
            variant="outlined"
            onClick={() => handleGetInvoice(selectedOrder?._id)}
          >
            Fetch Invoice
          </Button>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          mt: 2,
          p: 3,
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadInvoice(invoiceData)}
            color="primary"
          >
            Download
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ lineHeight: "2", letterSpacing: "1.5px" }}
            fontWeight={700}
          >
            Proforma Invoice
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ lineHeight: "2", letterSpacing: "1px" }}>
              Proforma Invoice ID:{" "}
            </Typography>{" "}
            <Typography> {invoiceData?.order?._id}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ lineHeight: "2", letterSpacing: "1px" }}>
              Proforma Invoice Created:{" "}
            </Typography>{" "}
            <Typography>
              {invoiceData?.createdAt
                ? new Date(invoiceData.createdAt).toLocaleString()
                : "N/A"}
            </Typography>
          </Box>
        </Box>

        <hr />

        {/* Seller & Buyer Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography fontWeight={600}>Seller:</Typography>
            <Typography>Name: {invoiceData?.seller?.name || "N/A"}</Typography>
            <Typography>
              Email: {invoiceData?.seller?.email || "N/A"}
            </Typography>
            <Typography>
              Phone: {invoiceData?.seller?.phone || "N/A"}
            </Typography>
            <Typography>
              Business: {invoiceData?.seller?.businessName || "N/A"}
            </Typography>
            <Typography>
              GST: {invoiceData?.seller?.gstNumber || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight={600}>Buyer:</Typography>
            <Typography>Name: {invoiceData?.buyer?.name || "N/A"}</Typography>
            <Typography>Email: {invoiceData?.buyer?.email || "N/A"}</Typography>
            <Typography>Phone: {invoiceData?.buyer?.phone || "N/A"}</Typography>
            <Typography>
              Business: {invoiceData?.buyer?.businessName || "N/A"}
            </Typography>
            <Typography>
              GST: {invoiceData?.buyer?.gstNumber || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Order Details */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: "#f8fafc", borderRadius: 1 }}>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Order Details:
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Product</b>
                  </TableCell>
                  <TableCell>
                    <b>Qty</b>
                  </TableCell>

                  <TableCell>
                    <b>Price / Unit</b>
                  </TableCell>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceData?.order?.items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      ₹{Number(item.discountPrice).toFixed(2)}
                    </TableCell>
                    <TableCell>₹{Number(item.finalPrice).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography sx={{ fontWeight: "900px" }}>Subtotal Amount:</Typography>
          <Typography>
            ₹{Number(invoiceData?.order?.subTotal || "0").toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography sx={{ fontWeight: "900px" }}>
            Discount From Payment:
          </Typography>
          <Typography>
            ₹{Number(invoiceData?.order?.discountFromPayment || "0").toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>
            <b>Grand Total: </b>
          </Typography>
          <Typography>
            <b> ₹{Number(invoiceData?.order.total || "0").toFixed(2)}</b>
          </Typography>
        </Box>

        {/* Payment Details */}
        <Box sx={{ mt: 2, mb: 2, borderTop: "1px solid #ccc", pt: 2 }}>
          <Typography fontSize={17} fontWeight={700} sx={{ mb: 1 }}>
            Payment & Credit Details
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Credit Period:</Typography>
            <Typography>{invoiceData?.creditPeriodDays || "0"} days</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Interest Rate:</Typography>
            <Typography>{invoiceData?.interestRatePerYear || "0"}%</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Due Date:</Typography>
            <Typography>
              {invoiceData?.dueDate
                ? new Date(invoiceData.dueDate).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Interest Start Date:</Typography>
            <Typography>
              {invoiceData?.interestAccrualStartDate
                ? new Date(
                    invoiceData.interestAccrualStartDate
                  ).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Status */}
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            pt: 2,
            borderTop: "1px solid #ccc",
          }}
        >
          <Chip
            label={invoiceData.status || "Pending"}
            color={invoiceData.status === "Pending" ? "warning" : "success"}
            size="medium"
          />
        </Box>
      </Box>
    );
  };

  const InvoiceSection = ({ invoiceData }) => {
    if (!invoiceData) {
      return (
        <Box textAlign="center" sx={{ py: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No invoice data available
          </Typography>
          <Button
            variant="outlined"
            onClick={() => handleGetInvoice(selectedOrder?._id)}
          >
            Fetch Invoice
          </Button>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          mt: 2,
          p: 3,
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography fontWeight={600}>
              Invoice No: {String(invoiceData.invoiceNumber).padStart(2, "0")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadMainInvoice(invoiceData)}
            color="primary"
          >
            Download
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ lineHeight: "2", letterSpacing: "1.5px" }}
            fontWeight={700}
          >
            Invoice
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ lineHeight: "2", letterSpacing: "1px" }}>
              Invoice ID:{" "}
            </Typography>{" "}
            <Typography> {invoiceData?.order?._id}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ lineHeight: "2", letterSpacing: "1px" }}>
              Invoice Created:{" "}
            </Typography>{" "}
            <Typography>
              {invoiceData?.createdAt
                ? new Date(invoiceData.createdAt).toLocaleString()
                : "N/A"}
            </Typography>
          </Box>
        </Box>

        <hr />

        {/* Seller & Buyer Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography fontWeight={600}>Seller:</Typography>
            <Typography>Name: {invoiceData?.seller?.name || "N/A"}</Typography>
            <Typography>
              Email: {invoiceData?.seller?.email || "N/A"}
            </Typography>
            <Typography>
              Phone: {invoiceData?.seller?.phone || "N/A"}
            </Typography>
            <Typography>
              Business: {invoiceData?.seller?.businessName || "N/A"}
            </Typography>
            <Typography>
              GST: {invoiceData?.seller?.gstNumber || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight={600}>Buyer:</Typography>
            <Typography>Name: {invoiceData?.buyer?.name || "N/A"}</Typography>
            <Typography>Email: {invoiceData?.buyer?.email || "N/A"}</Typography>
            <Typography>Phone: {invoiceData?.buyer?.phone || "N/A"}</Typography>
            <Typography>
              Business: {invoiceData?.buyer?.businessName || "N/A"}
            </Typography>
            <Typography>
              GST: {invoiceData?.buyer?.gstNumber || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Order Details */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: "#f8fafc", borderRadius: 1 }}>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Order Details:
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Product</b>
                  </TableCell>
                  <TableCell>
                    <b>Qty</b>
                  </TableCell>

                  <TableCell>
                    <b>Price / Unit</b>
                  </TableCell>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceData?.order?.items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      ₹{Number(item.discountPrice).toFixed(2)}
                    </TableCell>
                    <TableCell>₹{Number(item.finalPrice).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography sx={{ fontWeight: "900px" }}>Subtotal Amount:</Typography>
          <Typography>
            ₹{Number(invoiceData?.order?.subTotal || "0").toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography sx={{ fontWeight: "900px" }}>
            Discount From Payment:
          </Typography>
          <Typography>
            ₹{Number(invoiceData?.order?.discountFromPayment || "0").toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>
            <b>Grand Total: </b>
          </Typography>
          <Typography>
            <b> ₹{Number(invoiceData?.order.total || "0").toFixed(2)}</b>
          </Typography>
        </Box>

        {/* Payment Details */}
        <Box sx={{ mt: 2, mb: 2, borderTop: "1px solid #ccc", pt: 2 }}>
          <Typography fontSize={17} fontWeight={700} sx={{ mb: 1 }}>
            Payment & Credit Details
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Credit Period:</Typography>
            <Typography>{invoiceData?.creditPeriodDays || "0"} days</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Interest Rate:</Typography>
            <Typography>{invoiceData?.interestRatePerYear || "0"}%</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Due Date:</Typography>
            <Typography>
              {invoiceData?.dueDate
                ? new Date(invoiceData.dueDate).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Interest Start Date:</Typography>
            <Typography>
              {invoiceData?.interestAccrualStartDate
                ? new Date(
                    invoiceData.interestAccrualStartDate
                  ).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Status */}
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            pt: 2,
            borderTop: "1px solid #ccc",
          }}
        >
          <Chip
            label={invoiceData.status || "Pending"}
            color={invoiceData.status === "Pending" ? "warning" : "success"}
            size="medium"
          />
        </Box>
      </Box>
    );
  };

  // Credit Terms Component
  const CreditTermsSection = ({ creditDetails }) => {
    if (!creditDetails) return null;

    return (
      <Card sx={{ mt: 2, border: "2px solid #2961e1", background: "#f8fafc" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CreditScoreIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={700} color="#2961e1">
              Credit Payment Terms
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Credit Period
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {creditDetails.creditPeriodDays} days
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Interest Rate
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {creditDetails.interestRatePerYear}% per year
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Interest Start After
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {creditDetails.interestStartAfterDays} days
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Amount Due
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {Number(creditDetails.totalAmount).toFixed(2)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Payment Type
              </Typography>
              <Chip
                label="Credit"
                color="primary"
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{ mt: 2, color: "#666", fontStyle: "italic" }}
          >
            Payment is due within {creditDetails.creditPeriodDays} days.
            Interest will start accruing after{" "}
            {creditDetails.interestStartAfterDays} days from due date.
          </Typography>
        </CardContent>
      </Card>
    );
  };

  // QR Code Component
  const QRCodeSection = ({ qrCodeUrl, orderTotal }) => {
    if (!qrCodeUrl) return null;

    return (
      <Card sx={{ mt: 2, border: "2px solid #22c55e", background: "#f0fdf4" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <QrCode2Icon sx={{ color: "#22c55e", mr: 1 }} />
            <Typography variant="h6" fontWeight={700} color="#22c55e">
              Cash Payment QR Code
            </Typography>
          </Box>

          <Box textAlign="center">
            <img
              src={qrCodeUrl}
              alt="Payment QR Code"
              width={200}
              height={200}
              style={{
                border: "2px solid #22c55e",
                borderRadius: 12,
                padding: 12,
                background: "white",
              }}
            />
            <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
              ₹{orderTotal?.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="#555" sx={{ mt: 1 }}>
              Scan this QR code to make payment
            </Typography>
            <Chip
              label="Cash Payment"
              color="success"
              variant="filled"
              sx={{ mt: 1, fontWeight: 600 }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render progress flow
  const renderProgress = (order) => {
    const steps = order?.processFlow || [];
    if (steps.length === 0)
      return (
        <Typography
          color="#888"
          textAlign="center"
          sx={{ py: 2, fontSize: 14 }}
        >
          No progress data available
        </Typography>
      );

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 0.5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {steps.map((step, i) => {
            const isActive = step.completed;
            return (
              <Box
                key={step._id || i}
                sx={{
                  flex: 1,
                  py: 1.2,
                  textAlign: "center",
                  fontSize: { xs: "11px", sm: "13px" },
                  fontWeight: 600,
                  backgroundColor: isActive ? "#22c55e" : "#f3f4f6",
                  color: isActive ? "#fff" : "#333",
                  borderRight:
                    i !== steps.length - 1 ? "1px solid #fff" : "none",
                  transition: "background-color 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {step.step}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Render full screen step view
  const renderStepPage = () => {
    const steps = getVisibleSteps(selectedOrder?.processFlow);

    // Find the first incomplete step to determine which steps to show
    const firstIncompleteIndex = steps.findIndex((step) => !step.completed);
    const stepsToShow =
      firstIncompleteIndex === -1
        ? steps
        : steps.slice(0, firstIncompleteIndex + 1);

    // Responsive breakpoints
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    return (
      <Dialog
        fullScreen
        open={openModal}
        onClose={() => setOpenModal(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            overflow: "auto",
          },
        }}
      >
        <AppBar
          sx={{
            position: "relative",
            background: "linear-gradient(135deg, #2961e1 0%, #1e40af 100%)",
            boxShadow: "0 4px 12px rgba(41, 97, 225, 0.3)",
          }}
        >
          <Toolbar sx={{ minHeight: { xs: "56px", sm: "64px" } }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenModal(false)}
              sx={{
                background: "rgba(255,255,255,0.1)",
                "&:hover": { background: "rgba(255,255,255,0.2)" },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
              }}
            >
              <CloseIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

            <Typography
              sx={{
                ml: 2,
                flex: 1,
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                fontWeight: 600,
              }}
              variant="h6"
              component="div"
              noWrap
            >
              Order Process - {selectedOrder?._id}
            </Typography>

            <Chip
              label={`${steps.filter((s) => s.completed).length}/${
                steps.length
              } Completed`}
              sx={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "12px", sm: "14px" },
                height: { xs: 28, sm: 32 },
              }}
            />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 3, lg: 4 },
            maxWidth: 1400,
            mx: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {/* Progress Header - Responsive */}
          <Box
            sx={{
              background: "white",
              borderRadius: { xs: 2, sm: 3 },
              p: { xs: 2, sm: 3 },
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              color="#1e293b"
              sx={{
                mb: 1,
                fontSize: { xs: "18px", sm: "20px", md: "24px" },
              }}
            >
              Order Progress Tracker
            </Typography>
            <Typography
              variant="body2"
              color="#64748b"
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              Complete each step sequentially to move forward with your order
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  variant="body2"
                  color="#475569"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                >
                  Overall Progress
                </Typography>
                <Typography
                  variant="body2"
                  color="#2961e1"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                >
                  {Math.round(
                    (steps.filter((s) => s.completed).length / steps.length) *
                      100
                  )}
                  %
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 6, sm: 8 },
                  backgroundColor: "#e2e8f0",
                  borderRadius: 4,
                }}
              >
                <Box
                  sx={{
                    width: `${
                      (steps.filter((s) => s.completed).length / steps.length) *
                      100
                    }%`,
                    height: "100%",
                    backgroundColor: "#22c55e",
                    borderRadius: 4,
                    transition: "width 0.3s ease",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Steps Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            {stepsToShow.map((step, index) => {
              const isActive = step.completed;
              const isEnquiryStep = step.step === "Enquiry Received";
              const isCurrentStep =
                index === stepsToShow.length - 1 && !isActive;
              const isBuyerAction =
                step.step === "Proforma Accepted" || !!step.creditDetails;
              const isQRStep = step.step === "Payment QR Generated";
              const isProformaAcceptedStep = step.step === "Proforma Accepted";
              const isInvoiceUploadedStep = step.step === "Invoice Uploaded";

              const hasCreditDetails = step.creditDetails;
              const hasQRCode = step.qrCodeUrl;
              const creditDetails = step.creditDetails;
              const qrCodeUrl = step.qrCodeUrl;

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 0,
                    minHeight: { xs: "auto", md: 280 },
                    borderRadius: { xs: 2, sm: 3 },
                    overflow: "hidden",
                    boxShadow: isCurrentStep
                      ? "0 8px 25px rgba(41, 97, 225, 0.15)"
                      : "0 4px 12px rgba(0,0,0,0.05)",
                    border: isCurrentStep
                      ? "2px solid #2961e1"
                      : "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    background: "white",
                    position: "relative",
                    "&:hover": {
                      boxShadow: {
                        xs: "0 4px 12px rgba(0,0,0,0.05)",
                        md: "0 6px 20px rgba(0,0,0,0.08)",
                      },
                      transform: { xs: "none", md: "translateY(-2px)" },
                    },
                  }}
                >
                  
                  {/* Current Step Indicator */}
                  {isCurrentStep && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: { xs: 8, sm: 12, md: 16 },
                        right: { xs: 8, sm: 12, md: 16 },
                        background: "#2961e1",
                        color: "white",
                        px: { xs: 1, sm: 2 },
                        py: { xs: 0.25, sm: 0.5 },
                        borderRadius: 2,
                        fontSize: { xs: "10px", sm: "12px" },
                        fontWeight: 600,
                        zIndex: 2,
                      }}
                    >
                      CURRENT STEP
                    </Box>
                  )}

                  {/* LEFT SIDE - Step Information */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: { xs: "100%", md: 280 },
                      width: "100%",
                      background: isCurrentStep
                        ? "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)"
                        : "#f8fafc",
                      p: { xs: 2, sm: 3 },
                      display: "flex",
                      flexDirection: "column",
                      borderRight: { xs: "none", md: "1px solid #e2e8f0" },
                      borderBottom: { xs: "1px solid #e2e8f0", md: "none" },
                    }}
                  >
                    
                    {/* Step Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: { xs: 2, sm: 3 },
                        gap: { xs: 1, sm: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          borderRadius: "50%",
                          background: isActive
                            ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                            : isCurrentStep
                            ? "linear-gradient(135deg, #2961e1 0%, #1d4ed8 100%)"
                            : "#94a3b8",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "14px", sm: "16px" },
                          flexShrink: 0,
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        {isActive ? "✓" : index + 1}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color={
                            isActive
                              ? "#16a34a"
                              : isCurrentStep
                              ? "#1e40af"
                              : "#475569"
                          }
                          sx={{
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                            wordBreak: "break-word",
                          }}
                        >
                          {step.step}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={
                            isActive
                              ? "#65a30d"
                              : isCurrentStep
                              ? "#4f46e5"
                              : "#64748b"
                          }
                          sx={{
                            mt: 0.5,
                            fontSize: { xs: "11px", sm: "12px", md: "14px" },
                          }}
                        >
                          Step {index + 1} of {steps.length}
                        </Typography>
                      </Box>
                    </Box>


                    {/* Status Indicator */}
                    <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                      {isActive ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: { xs: 6, sm: 8 },
                              height: { xs: 6, sm: 8 },
                              borderRadius: "50%",
                              background: "#22c55e",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#16a34a"
                            fontWeight={600}
                            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                          >
                            Completed
                          </Typography>
                          {step.completedAt && (
                            <Typography
                              variant="body2"
                              color="#64748b"
                              sx={{
                                ml: 1,
                                fontSize: { xs: "10px", sm: "12px" },
                              }}
                            >
                              on{" "}
                              {new Date(step.completedAt).toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                      ) : isCurrentStep ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: { xs: 6, sm: 8 },
                              height: { xs: 6, sm: 8 },
                              borderRadius: "50%",
                              background: "#f59e0b",
                              animation: "pulse 1.5s infinite",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#d97706"
                            fontWeight={600}
                            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                          >
                            Action Required
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: { xs: 6, sm: 8 },
                              height: { xs: 6, sm: 8 },
                              borderRadius: "50%",
                              background: "#94a3b8",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#64748b"
                            fontWeight={600}
                            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                          >
                            Waiting
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    

                    {/* Action Button */}
                    <Box sx={{ mt: "auto", pt: { xs: 1, sm: 2 } }}>
                      {!isActive && isBuyerAction && (
                        <Box>
                          {hasCreditDetails && !acceptedTerms ? (
                            <Box>
                              <Button
                                variant="contained"
                                disabled
                                sx={{
                                  mb: 1,
                                  background: "#cbd5e1",
                                  color: "#64748b",
                                  fontWeight: 600,
                                  width: "100%",
                                  fontSize: { xs: "12px", sm: "14px" },
                                  py: { xs: 0.75, sm: 1.5 },
                                }}
                              >
                                Accept Terms to Continue
                              </Button>
                            </Box>
                          ) : (
                            <Button
                              variant="contained"
                              disabled={updating}
                              onClick={() => handleUpdateStep(step)}
                              sx={{
                                background:
                                  "linear-gradient(135deg, #2961e1 0%, #1d4ed8 100%)",
                                fontWeight: 600,
                                width: "100%",
                                py: { xs: 0.75, sm: 1.5 },
                                fontSize: { xs: "12px", sm: "14px" },
                                boxShadow: "0 4px 12px rgba(41, 97, 225, 0.3)",
                                "&:hover": {
                                  boxShadow:
                                    "0 6px 16px rgba(41, 97, 225, 0.4)",
                                  transform: {
                                    xs: "none",
                                    md: "translateY(-1px)",
                                  },
                                },
                              }}
                            >
                              {updating
                                ? "Processing..."
                                : `Complete ${step.step}`}
                            </Button>
                          )}
                        </Box>
                      )}

                      {!isActive && !isBuyerAction && (
                        <Box
                          sx={{
                            p: { xs: 1, sm: 2 },
                            background: "#fffbeb",
                            border: "1px solid #fcd34d",
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="#d97706"
                            fontWeight={600}
                            sx={{ fontSize: { xs: "11px", sm: "12px" } }}
                          >
                            ⏳ Waiting for seller action
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* RIGHT SIDE - Step Content */}
                  <Box
                    sx={{
                      flex: 2,
                      minWidth: { xs: "100%", md: 400 },
                      width: "100%",
                      p: { xs: 2, sm: 3 },
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 1.5, sm: 2 },
                    }}
                  >
                    {/* Enquiry Received Step */}
                    {isEnquiryStep && (
                      <Box
                        sx={{
                          transform: { xs: "scale(0.98)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        <Box
                          sx={{
                            mt: 2,
                            p: 3,
                            borderRadius: 2,
                            border: "1px solid #e5e7eb",
                            background: "#fff",
                          }}
                        >
                          <Typography
                            fontSize={17}
                            fontWeight={700}
                            sx={{ mb: 2, color: "#1e293b" }}
                          >
                            Enquiry Details
                          </Typography>

                          {/* TOP INFO TABLE */}
                          <Box
                            sx={{
                              border: "1px solid #cbd5e1",
                              borderRadius: 1,
                              overflow: "hidden",
                              mb: 3,
                              p: 2,
                            }}
                          >
                            <Typography
                              sx={{ lineHeight: "2", letterSpacing: "1px" }}
                            >
                              <b>Seller Name:</b> {selectedOrder?.items[0]?.seller?.name}
                            </Typography>

                            <Typography
                              sx={{ lineHeight: "2", letterSpacing: "1px" }}
                            >
                              <b>Payment Type:</b>{" "}
                              {selectedOrder?.paymentOption?.paymentType ===
                              "Both"
                                ? selectedOrder?.selectPaymentType
                                    ?.charAt(0)
                                    .toUpperCase() +
                                  selectedOrder?.selectPaymentType?.slice(1)
                                : selectedOrder?.paymentOption?.paymentType}
                            </Typography>

                            {/* <Typography><b>Date:</b> {selectedOrder?.createdAt}</Typography> */}
                            <Typography
                              sx={{ lineHeight: "2", letterSpacing: "1px" }}
                            >
                              <b>Date:</b>{" "}
                              {selectedOrder?.createdAt
                                ? `${new Date(
                                    selectedOrder.createdAt
                                  ).toLocaleDateString("en-GB")} ${new Date(
                                    selectedOrder.createdAt
                                  ).toLocaleTimeString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}`
                                : ""}
                            </Typography>

                            <Typography
                              sx={{ lineHeight: "2", letterSpacing: "1px" }}
                            >
                              <b>Total:</b> ₹ {selectedOrder?.total || 0}
                            </Typography>
                          </Box>

                          {/* PRODUCT TABLE - MUI */}
                          <TableContainer
                            component={Paper}
                            sx={{
                              borderRadius: 1,
                              border: "1px solid #cbd5e1",
                            }}
                          >
                            <Table>
                              <TableHead>
                                <TableRow sx={{ background: "#f1f5f9" }}>
                                  <TableCell sx={{ fontWeight: 700 }}>
                                    Product
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>
                                    Category
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>
                                    Price
                                  </TableCell>
                                  <TableCell
                                    sx={{ fontWeight: 700 }}
                                    align="center"
                                  >
                                    Qty
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {selectedOrder?.items?.map((item, index) => (
                                  <TableRow key={item._id || index}>
                                    <TableCell>{item?.name}</TableCell>
                                    <TableCell>{item?.category.name}</TableCell>

                                    <TableCell>₹ {item?.finalPrice}</TableCell>

                                    <TableCell align="center">
                                      <TextField
                                        size="small"
                                        type="number"
                                        value={item?.quantity || ""}
                                        onChange={(e) => {
                                          const qty = Number(e.target.value);

                                          const updatedItems =
                                            selectedOrder.items.map((i, idx) =>
                                              idx === index
                                                ? { ...i, quantity: qty }
                                                : i
                                            );

                                          const newTotal = updatedItems.reduce(
                                            (sum, it) =>
                                              sum +
                                              Number(it.quantity || 0) *
                                                Number(it.discountPrice || 0),
                                            0
                                          );

                                          setSelectedOrder((prev) => ({
                                            ...prev,
                                            items: updatedItems,
                                            total: newTotal,
                                          }));
                                        }}
                                        sx={{ width: 80 }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Box>
                    )}
                    {/* Step-specific content */}
                    {isProformaAcceptedStep && (
                      <Box
                        sx={{
                          transform: { xs: "scale(0.95)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        <ProformaInvoiceSection
                          invoiceData={selectedOrder?.invoiceData}
                        />
                      </Box>
                    )}

                    {isInvoiceUploadedStep && (
                      <Box
                        sx={{
                          transform: { xs: "scale(0.95)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        <InvoiceSection
                          invoiceData={selectedOrder?.invoiceData}
                        />
                      </Box>
                    )}

                    {isQRStep && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 1.5, sm: 2 },
                          transform: { xs: "scale(0.95)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        {hasQRCode && (
                          <QRCodeSection
                            qrCodeUrl={qrCodeUrl}
                            orderTotal={selectedOrder?.total}
                          />
                        )}
                        {hasCreditDetails && (
                          <>
                            <CreditTermsSection creditDetails={creditDetails} />
                            {!isActive && (
                              <Box
                                sx={{
                                  p: { xs: 1.5, sm: 2 },
                                  background: "#f0f9ff",
                                  border: "1px solid #7dd3fc",
                                  borderRadius: 2,
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={acceptedTerms}
                                      onChange={(e) =>
                                        setAcceptedTerms(e.target.checked)
                                      }
                                      color="primary"
                                      size={isMobile ? "small" : "medium"}
                                    />
                                  }
                                  label={
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: { xs: "12px", sm: "14px" },
                                      }}
                                    >
                                      I accept the credit payment terms. Payment
                                      is due within{" "}
                                      <strong>
                                        {creditDetails?.creditPeriodDays ||
                                          "N/A"}{" "}
                                        days
                                      </strong>
                                      . Interest will start accruing after{" "}
                                      <strong>
                                        {creditDetails?.interestStartAfterDays ||
                                          "N/A"}{" "}
                                        days
                                      </strong>{" "}
                                      from due date.
                                    </Typography>
                                  }
                                />
                              </Box>
                            )}
                          </>
                        )}
                      </Box>
                    )}

                    {/* Default content for other steps */}
                    {!isEnquiryStep&&
                    !isProformaAcceptedStep &&
                      !isInvoiceUploadedStep &&
                      !isQRStep && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: { xs: 120, md: "100%" },
                            textAlign: "center",
                            p: { xs: 2, sm: 3 },
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              color="#475569"
                              sx={{
                                mb: 1,
                                fontSize: {
                                  xs: "14px",
                                  sm: "16px",
                                  md: "18px",
                                },
                              }}
                            >
                              {isActive
                                ? "Step Completed Successfully"
                                : "Step Pending"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="#64748b"
                              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                            >
                              {isActive
                                ? "This step has been completed. Move to the next step to continue."
                                : "Complete the current step to proceed with the order process."}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Next Steps Guidance */}
          {stepsToShow.length > 0 &&
            stepsToShow[stepsToShow.length - 1].completed &&
            stepsToShow.length < steps.length && (
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  border: "1px solid #7dd3fc",
                  borderRadius: { xs: 2, sm: 3 },
                  p: { xs: 2, sm: 3 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  color="#0369a1"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  }}
                >
                  🎉 Great! Step {stepsToShow.length} Completed
                </Typography>
                <Typography
                  variant="body2"
                  color="#0c4a6e"
                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                >
                  The seller will now process the next step. You'll be notified
                  when it's ready for your action.
                </Typography>
              </Box>
            )}

          {/* No Steps Message */}
          {stepsToShow.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: { xs: 6, sm: 8 },
                background: "white",
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h6"
                color="#475569"
                sx={{
                  mb: 1,
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                }}
              >
                No steps available
              </Typography>
              <Typography
                variant="body2"
                color="#64748b"
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                There are no process steps defined for this order yet.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Add CSS for pulse animation */}
        <style jsx>{`
          @keyframes pulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            .mobile-optimized {
              -webkit-overflow-scrolling: touch;
            }
          }
        `}</style>
      </Dialog>
    );
  };

  // MAIN RETURN UI
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{ width: "100%", maxWidth: 1350, mx: "auto", px: { xs: 2, sm: 3 } }}
      >
        <Typography fontWeight={700} fontSize={26} sx={{ mb: 3 }}>
          Manage Orders
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={(e, val) => setSelectedTab(val)}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            borderBottom: "1px solid #e0e0e0",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              color: "#475569",
            },
            "& .Mui-selected": {
              color: "#2961e1 !important",
              borderBottom: "3px solid #2961e1",
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {statusTabs.map((st, i) => (
            <Tab
              key={st}
              label={`${st} (${
                i === 0
                  ? orders.length
                  : orders.filter(
                      (o) => o.orderStatus?.toLowerCase() === st.toLowerCase()
                    ).length
              })`}
            />
          ))}
        </Tabs>

        <Paper
          sx={{
            borderRadius: 3,
            background: "#fff",
            border: "1px solid #e5e7eb",
            p: { xs: 1, sm: 2.5 },
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 950 }}>
              <TableHead>
                <TableRow>
                  {[
                    "#",
                    "Order ID",
                    "Date",
                    "Items",
                    "Amount (₹)",
                    "Status",
                    "Progress",
                    "Action",
                  ].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => {
                    const items = order?.items || [];
                    const statusColor = getStatusColor(order?.orderStatus);
                    return (
                      <React.Fragment key={order?._id}>
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{order?._id}</TableCell>
                          <TableCell>{formatDate(order?.createdAt)}</TableCell>
                          <TableCell>{items?.length}</TableCell>
                          <TableCell>
                            ₹{Number(order?.total || 0).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order?.orderStatus || "Pending"}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                backgroundColor: statusColor.bg,
                                color: statusColor.color,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: "#2961e1",
                              }}
                              onClick={() => toggleProgress(order?._id)}
                            >
                              {showProgressFor === order?._id
                                ? "Hide Progress"
                                : "Show Progress"}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={async () => {
                                setSelectedOrder(order);
                                // Auto-fetch invoice when modal opens
                                try {
                                  await handleGetInvoice(order?._id);
                                } catch (e) {
                                  console.log("Invoice fetch error:", e);
                                }
                                setOpenModal(true);
                              }}
                            >
                              View / Update
                            </Button>
                          </TableCell>
                        </TableRow>
                        {showProgressFor === order?._id && (
                          <TableRow>
                            <TableCell colSpan={8} sx={{ p: 0 }}>
                              {renderProgress(order)}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* 🟢 Full Page Step Overlay */}
      {openModal && renderStepPage()}
    </Box>
  );
}
