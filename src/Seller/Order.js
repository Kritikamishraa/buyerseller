import React, { useEffect, useState } from "react";
import {
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
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerOrders,
  updateItemQuantity,
  updateOrderStatus,
  updateProcessStep,
} from "../redux/slices/ordersSlice";
import { toast } from "react-toastify";
import { getSellerInvoice } from "../redux/slices/invoiceSlice";

const statusTabs = ["All", "Pending", "Processing", "Completed", "Cancelled"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Missing Components - Add these before the main component
const QRCodeSection = ({ qrCodeUrl, orderTotal }) => (
  <Box sx={{ textAlign: "center", p: 2 }}>
    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
      Payment QR Code
    </Typography>
    <img
      src={qrCodeUrl}
      alt="Payment QR"
      style={{
        width: "100%",
        maxWidth: "200px",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        padding: 8,
      }}
    />
    <Typography variant="body2" color="#64748b" sx={{ mt: 1 }}>
      Amount: ₹{orderTotal?.toLocaleString() || "0"}
    </Typography>
  </Box>
);

const CreditTermsSection = ({ creditDetails }) => (
  <Box
    sx={{
      p: 2,
      background: "#f8fafc",
      borderRadius: 2,
      border: "1px solid #e2e8f0",
    }}
  >
    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
      Credit Terms
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Credit Period:</Typography>
        <Typography variant="body2" fontWeight={600}>
          {creditDetails?.creditPeriodDays || "N/A"} days
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Interest Rate:</Typography>
        <Typography variant="body2" fontWeight={600}>
          {creditDetails?.interestRatePerYear || "N/A"}%
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Interest Starts After:</Typography>
        <Typography variant="body2" fontWeight={600}>
          {creditDetails?.interestStartAfterDays || "N/A"} days
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default function Orders() {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showProgressFor, setShowProgressFor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    orderId: null,
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  useEffect(() => {
    dispatch(getSellerOrders());
  }, [dispatch]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const fullVisibleSteps = orders
    ?.map((order) => order?.processFlow)
    ?.flat()
    ?.map((step) => step?.step);

  const sellerActionSteps = fullVisibleSteps?.filter((step) =>
    [
      "Enquiry Received",
      "Proforma Invoice",
      "Payment QR Generated",
      "Payment Received",
      "Invoice Uploaded",
      "Dispatch",
      "Delivered",
    ].includes(step)
  );

  const getVisibleSteps = (processFlow) => {
    if (!Array.isArray(processFlow)) return [];
    return processFlow.filter((s) => fullVisibleSteps?.includes(s.step));
  };

  // Update step API call
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

      if (res?.message) {
        toast.success(res.message);
      } else {
        toast.success("Step updated successfully!");
      }

      dispatch(getSellerOrders());

      if (step.step === "Enquiry Received") {
        try {
          const invoiceRes = await dispatch(
            getSellerInvoice({
              order: selectedOrder?._id,
              seller: user?._id,
            })
          ).unwrap();

          if (invoiceRes?.data?.invoice) {
            setSelectedOrder((prev) => ({
              ...prev,
              invoiceData: invoiceRes.data.invoice,
            }));
          }
        } catch (invoiceErr) {
          console.log("No invoice found yet");
        }
      }

      setSelectedOrder((prev) => ({ ...prev, ...res.data }));
      setShowProgressFor(selectedOrder?._id);
    } catch (err) {
      toast.error(
        err?.message || err?.response?.data?.message || "Failed to update step"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Update quantity API call
  const handleQuantityUpdate = async () => {
    try {
      const formattedItems = selectedOrder?.items?.map((item) => ({
        itemId: item?._id,
        quantity: item?.quantity,
      }));

      await dispatch(
        updateItemQuantity({
          orderId: selectedOrder?._id,
          items: formattedItems,
        })
      ).unwrap();

      toast.success("Quantity updated successfully");
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // Cancelled order API call
  const handleCancelledOrder = async (id) => {
    try {
      await dispatch(
        updateOrderStatus({
          id,
          seller: user?._id,
          orderStatus: "Cancelled",
        })
      ).unwrap();
      toast.info("Order cancelled successfully");
      dispatch(getSellerOrders());
      setOpenModal(false);
    } catch (err) {
      toast.error("Failed to cancel order");
    } finally {
      setConfirmDelete({ open: false, orderId: null });
    }
  };

  // Fetch Invoice API call
  const handleGetInvoice = async (orderId) => {
    try {
      const res = await dispatch(
        getSellerInvoice({
          order: orderId,
          seller: user?._id,
        })
      ).unwrap();

      if (res?.data?.invoice) {
        setSelectedOrder((prev) => ({
          ...prev,
          invoiceData: res.data.invoice,
        }));
      } else {
        toast.error("Invoice not found for this order");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to fetch invoice");
    }
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

  // Proforma Invoice

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

// Invoice
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
              {/* <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownloadMainInvoice(invoiceData)}
                color="primary"
              >
                Download
              </Button> */}
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

  const renderStepPage = () => {
    const steps = getVisibleSteps(selectedOrder?.processFlow);

    // Find the first incomplete step to determine which steps to show
    const firstIncompleteIndex = steps.findIndex((step) => !step.completed);
    const stepsToShow =
      firstIncompleteIndex === -1
        ? steps
        : steps.slice(0, firstIncompleteIndex + 1);

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
        {/* Header */}
        <AppBar
          sx={{
            position: "relative",
            background: "linear-gradient(135deg, #2961e1 0%, #1e40af 100%)",
            boxShadow: "0 4px 12px rgba(41, 97, 225, 0.3)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: { xs: "56px", sm: "64px" },
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenModal(false)}
              sx={{
                background: "rgba(255,255,255,0.1)",
                "&:hover": { background: "rgba(255,255,255,0.2)" },
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
              }}
            >
              <CloseIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

            <Typography
              sx={{
                ml: { xs: 1, sm: 2 },
                flex: 1,
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                  md: "18px",
                  lg: "20px",
                },
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
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                height: { xs: 24, sm: 28, md: 32 },
              }}
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 3, lg: 4 },
            maxWidth: 1400,
            mx: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Progress Header */}
          <Box
            sx={{
              background: "white",
              borderRadius: { xs: 2, sm: 3 },
              p: { xs: 2, sm: 3, md: 4 },
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
                fontSize: {
                  xs: "16px",
                  sm: "18px",
                  md: "20px",
                  lg: "24px",
                },
              }}
            >
              Order Progress Tracker
            </Typography>
            <Typography
              variant="body2"
              color="#64748b"
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                },
              }}
            >
              Complete each step sequentially to move forward with your order
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  color="#475569"
                  fontWeight={600}
                  sx={{
                    fontSize: {
                      xs: "11px",
                      sm: "12px",
                      md: "14px",
                    },
                  }}
                >
                  Overall Progress
                </Typography>
                <Typography
                  variant="body2"
                  color="#2961e1"
                  fontWeight={600}
                  sx={{
                    fontSize: {
                      xs: "11px",
                      sm: "12px",
                      md: "14px",
                    },
                  }}
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
                  height: { xs: 6, sm: 8, md: 10 },
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
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {stepsToShow.map((step, index) => {
              const isActive = step.completed;
              const isCurrentStep =
                index === stepsToShow.length - 1 && !isActive;
              const isSellerAction = sellerActionSteps?.includes(step.step);
              const isQRStep = step.step === "Payment QR Generated";
              const isProformaAcceptedStep = step.step === "Proforma Accepted";
              const isInvoiceUploadedStep = step.step === "Invoice Uploaded";
              const isEnquiryStep = step.step === "Enquiry Received";
              const isPaymentReceivedStep = step.step === "Payment Received";

              const hasCreditDetails = step.creditDetails;
              const hasQRCode = step.qrCodeUrl;
              const creditDetails = step.creditDetails;
              const qrCodeUrl = step.qrCodeUrl;

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    gap: 0,
                    minHeight: { xs: "auto", lg: 280 },
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
                      boxShadow: isCurrentStep
                        ? "0 12px 30px rgba(41, 97, 225, 0.2)"
                        : "0 6px 20px rgba(0,0,0,0.08)",
                      transform: { xs: "none", lg: "translateY(-2px)" },
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
                        px: { xs: 1, sm: 1.5, md: 2 },
                        py: { xs: 0.25, sm: 0.4, md: 0.5 },
                        borderRadius: 2,
                        fontSize: {
                          xs: "9px",
                          sm: "10px",
                          md: "12px",
                        },
                        fontWeight: 600,
                        zIndex: 2,
                        textAlign: "center",
                      }}
                    >
                      CURRENT STEP
                    </Box>
                  )}

                  {/* LEFT SIDE - Step Information */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: { xs: "100%", lg: 300 },
                      width: "100%",
                      background: isCurrentStep
                        ? "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)"
                        : "#f8fafc",
                      p: { xs: 2, sm: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      borderRight: { xs: "none", lg: "1px solid #e2e8f0" },
                      borderBottom: { xs: "1px solid #e2e8f0", lg: "none" },
                    }}
                  >
                    {/* Step Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: { xs: 2, sm: 3 },
                        gap: { xs: 1, sm: 1.5, md: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 36, sm: 40, md: 44 },
                          height: { xs: 36, sm: 40, md: 44 },
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
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            md: "16px",
                          },
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
                            fontSize: {
                              xs: "14px",
                              sm: "15px",
                              md: "16px",
                              lg: "18px",
                            },
                            wordBreak: "break-word",
                            lineHeight: 1.2,
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
                            fontSize: {
                              xs: "11px",
                              sm: "12px",
                              md: "13px",
                            },
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
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 8, sm: 10 },
                              height: { xs: 8, sm: 10 },
                              borderRadius: "50%",
                              background: "#22c55e",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#16a34a"
                            fontWeight={600}
                            sx={{
                              fontSize: {
                                xs: "12px",
                                sm: "13px",
                                md: "14px",
                              },
                            }}
                          >
                            Completed
                          </Typography>
                          {step.completedAt && (
                            <Typography
                              variant="body2"
                              color="#64748b"
                              sx={{
                                fontSize: {
                                  xs: "10px",
                                  sm: "11px",
                                  md: "12px",
                                },
                              }}
                            >
                              on{" "}
                              {new Date(step.completedAt).toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                      ) : isCurrentStep ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 8, sm: 10 },
                              height: { xs: 8, sm: 10 },
                              borderRadius: "50%",
                              background: "#f59e0b",
                              animation: "pulse 1.5s infinite",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#d97706"
                            fontWeight={600}
                            sx={{
                              fontSize: {
                                xs: "12px",
                                sm: "13px",
                                md: "14px",
                              },
                            }}
                          >
                            Action Required
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 8, sm: 10 },
                              height: { xs: 8, sm: 10 },
                              borderRadius: "50%",
                              background: "#94a3b8",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#64748b"
                            fontWeight={600}
                            sx={{
                              fontSize: {
                                xs: "12px",
                                sm: "13px",
                                md: "14px",
                              },
                            }}
                          >
                            Waiting
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Action Button */}
                    <Box sx={{ mt: "auto", pt: { xs: 2, sm: 3 } }}>
                      {!isActive && isSellerAction && (
                        <Box>
                          {/* Payment Received Step with Checkbox */}
                          {isPaymentReceivedStep && !paymentConfirmed ? (
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
                                  fontSize: {
                                    xs: "12px",
                                    sm: "13px",
                                    md: "14px",
                                  },
                                  py: { xs: 1, sm: 1.25, md: 1.5 },
                                  borderRadius: 2,
                                }}
                              >
                                Confirm Payment to Continue
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
                                py: { xs: 1, sm: 1.25, md: 1.5 },
                                fontSize: {
                                  xs: "12px",
                                  sm: "13px",
                                  md: "14px",
                                },
                                borderRadius: 2,
                                boxShadow: "0 4px 12px rgba(41, 97, 225, 0.3)",
                                "&:hover": {
                                  boxShadow:
                                    "0 6px 16px rgba(41, 97, 225, 0.4)",
                                  transform: {
                                    xs: "none",
                                    lg: "translateY(-1px)",
                                  },
                                },
                                "&:disabled": {
                                  background: "#cbd5e1",
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

                      {!isActive && !isSellerAction && (
                        <Box
                          sx={{
                            p: { xs: 1.5, sm: 2 },
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
                            sx={{
                              fontSize: {
                                xs: "11px",
                                sm: "12px",
                                md: "13px",
                              },
                            }}
                          >
                            ⏳ Waiting for buyer action
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* RIGHT SIDE - Step Content */}
                  <Box
                    sx={{
                      flex: 2,
                      minWidth: { xs: "100%", lg: 400 },
                      width: "100%",
                      p: { xs: 2, sm: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 2, sm: 3 },
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
                              <b>Buyer Name:</b> {selectedOrder?.buyer?.name}
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

                          {/* BUTTONS */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              mt: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={handleQuantityUpdate}
                            >
                              Update Quantity
                            </Button>

                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                setConfirmDelete({
                                  open: true,
                                  orderId: selectedOrder?._id,
                                })
                              }
                            >
                              Cancel Enquiry
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {/* Proforma Invoice Step */}
                    {isProformaAcceptedStep && (
                      <Box
                        sx={{
                          transform: { xs: "scale(0.98)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        <ProformaInvoiceSection
                          invoiceData={selectedOrder?.invoiceData}
                        />
                      </Box>
                    )}

                    {/* Invoice Uploaded Step */}
                    {isInvoiceUploadedStep && (
                      <Box
                        sx={{
                          transform: { xs: "scale(0.98)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        <InvoiceSection
                          invoiceData={selectedOrder?.invoiceData}
                        />
                      </Box>
                    )}

                    {/* QR Code Step */}
                    {isQRStep && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 2, sm: 3 },
                          transform: { xs: "scale(0.98)", sm: "scale(1)" },
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
                                  p: { xs: 1.5, sm: 2, md: 2.5 },
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
                                        fontSize: {
                                          xs: "12px",
                                          sm: "13px",
                                          md: "14px",
                                        },
                                        lineHeight: 1.4,
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

                    {/* Payment Received Step */}
                    {isPaymentReceivedStep && (
                      <Box
                        sx={{
                          transform: { xs: "scale(0.98)", sm: "scale(1)" },
                          transformOrigin: "top left",
                        }}
                      >
                        <Card
                          sx={{
                            border: "2px solid #22c55e",
                            background: "#f0fdf4",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <CreditScoreIcon
                                sx={{ color: "#22c55e", mr: 1 }}
                              />
                              <Typography
                                variant="h6"
                                fontWeight={700}
                                color="#22c55e"
                              >
                                Payment Confirmation
                              </Typography>
                            </Box>

                            {/* Payment Details */}
                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                  xs: "1fr",
                                  sm: "1fr 1fr",
                                },
                                gap: 2,
                                mb: 3,
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Order Amount
                                </Typography>
                                <Typography variant="h6" fontWeight={600}>
                                  ₹
                                  {selectedOrder?.total?.toLocaleString() ||
                                    "0"}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Payment Method
                                </Typography>
                                <Chip
                                  label={
                                    selectedOrder?.paymentOption
                                      ?.paymentType === "Both"
                                      ? selectedOrder?.selectPaymentType
                                          ?.charAt(0)
                                          .toUpperCase() +
                                        selectedOrder?.selectPaymentType?.slice(
                                          1
                                        )
                                      : selectedOrder?.paymentOption
                                          ?.paymentType || "N/A"
                                  }
                                  color="primary"
                                  variant="filled"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                            </Box>

                            {/* Terms and Conditions Checkbox */}
                            {!isActive && (
                              <Box
                                sx={{
                                  p: 2,
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 2,
                                  background: "white",
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={paymentConfirmed}
                                      onChange={(e) =>
                                        setPaymentConfirmed(e.target.checked)
                                      }
                                      color="primary"
                                    />
                                  }
                                  label={
                                    <Typography variant="body2">
                                      I confirm that I have received the payment
                                      of ₹
                                      {selectedOrder?.total?.toLocaleString() ||
                                        "0"}{" "}
                                      from the buyer. This action cannot be
                                      undone.
                                    </Typography>
                                  }
                                />
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Box>
                    )}

                    {/* Default content for other steps */}
                    {!isEnquiryStep &&
                      !isProformaAcceptedStep &&
                      !isInvoiceUploadedStep &&
                      !isQRStep &&
                      !isPaymentReceivedStep && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: { xs: 120, sm: 140, md: 160, lg: "100%" },
                            textAlign: "center",
                            p: { xs: 2, sm: 3, md: 4 },
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
                                  sm: "15px",
                                  md: "16px",
                                  lg: "18px",
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
                              sx={{
                                fontSize: {
                                  xs: "12px",
                                  sm: "13px",
                                  md: "14px",
                                },
                              }}
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
                  p: { xs: 2, sm: 3, md: 4 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  color="#0369a1"
                  sx={{
                    mb: 1,
                    fontSize: {
                      xs: "14px",
                      sm: "15px",
                      md: "16px",
                      lg: "18px",
                    },
                  }}
                >
                  🎉 Great! Step {stepsToShow.length} Completed
                </Typography>
                <Typography
                  variant="body2"
                  color="#0c4a6e"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                    },
                  }}
                >
                  {stepsToShow[stepsToShow.length - 1].step ===
                  "Payment Received"
                    ? "Payment confirmed! Proceed with the next steps."
                    : "The next step will be processed soon. You'll be notified when it's ready for your action."}
                </Typography>
              </Box>
            )}

          {/* No Steps Message */}
          {stepsToShow.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: { xs: 6, sm: 8, md: 10 },
                background: "white",
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography
                variant="h6"
                color="#475569"
                sx={{
                  mb: 1,
                  fontSize: {
                    xs: "16px",
                    sm: "17px",
                    md: "18px",
                    lg: "20px",
                  },
                }}
              >
                No steps available
              </Typography>
              <Typography
                variant="body2"
                color="#64748b"
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                  },
                }}
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
        `}</style>
      </Dialog>
    );
  };

  // MAIN UI
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
                    "Buyer",
                    "Items",
                    "Amount (₹)",
                    "Status",
                    "Progress",
                    "Progress Actions",
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
                    <TableCell colSpan={9} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders?.length > 0 ? (
                  filteredOrders?.map((order, index) => {
                    const items = order?.items || [];
                    const statusColor = getStatusColor(order.orderStatus);
                    return (
                      <React.Fragment key={order?._id}>
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{order?._id}</TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>
                            {order?.buyer?.name || "Unknown"}
                          </TableCell>
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
                              sx={{ backgroundColor: "#2961e1" }}
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
                                setSelectedOrder({
                                  ...order,
                                  baseTotal: order.total,
                                });

                                try {
                                  const res = await dispatch(
                                    getSellerInvoice({
                                      order: order._id,
                                      seller: user?._id,
                                    })
                                  ).unwrap();

                                  if (res?.data?.invoice) {
                                    setSelectedOrder((prev) => ({
                                      ...prev,
                                      invoiceData: res.data.invoice,
                                    }));
                                  }
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
                            <TableCell colSpan={9} sx={{ p: 0 }}>
                              {renderProgress(order)}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Full Page Step Overlay */}
      {openModal && renderStepPage()}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, orderId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this enquiry?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete({ open: false, orderId: null })}
          >
            No
          </Button>
          <Button
            color="error"
            onClick={() => handleCancelledOrder(confirmDelete.orderId)}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
