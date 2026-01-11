import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Card,
  CardContent,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PAYMENT_DATA = [
  {
    id: "PAY001",
    date: "2023-10-26",
    buyer: "Kumar Retail",
    orderId: "ORD001",
    method: "UPI",
    amount: 5000.0,
    status: "Completed",
  },
  {
    id: "PAY002",
    date: "2023-11-05",
    buyer: "Priya General Store",
    orderId: "ORD002",
    method: "Bank Transfer",
    amount: 12000.0,
    status: "Completed",
  },
  {
    id: "PAY003",
    date: "2023-11-07",
    buyer: "Super Mart",
    orderId: "ORD004",
    method: "UPI",
    amount: 25000.0,
    status: "Pending",
  },
];

const statusColor = (status) =>
  status === "Completed"
    ? "success"
    : status === "Pending"
    ? "default"
    : "default";

export default function PaymentsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  // Actions menu logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionPaymentId, setActionPaymentId] = useState(null);

  // Edit dialog logic
  const [openEdit, setOpenEdit] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  // Payments state for delete/edit
  const [payments, setPayments] = useState(PAYMENT_DATA);

  const toggleFilter = () => {
    setShowPendingOnly((prev) => !prev);
  };

  // Filter payments according to toggle
  const filteredPayments = showPendingOnly
    ? payments.filter((p) => p.status === "Pending")
    : payments;

  // Actions menu handlers
  const handleActionsMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActionPaymentId(id);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
    setActionPaymentId(null);
  };

  // Edit logic
  const handleEditOpen = (payment) => {
    setEditPayment(payment);
    setOpenEdit(true);
    handleActionsMenuClose();
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setEditPayment(null);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPayments((prev) =>
      prev.map((p) =>
        p.id === editPayment.id
          ? { ...editPayment, amount: parseFloat(editPayment.amount) }
          : p
      )
    );
    handleEditClose();
  };

  // Delete logic
  const handleDeletePayment = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
    handleActionsMenuClose();
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Header with Filter and Export buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            mb: { xs: 2, sm: 1 },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Pending Invoices
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            <Button
              variant={showPendingOnly ? "contained" : "outlined"}
              size="small"
              onClick={toggleFilter}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: showPendingOnly ? "#2966fd" : "#fff",
                color: showPendingOnly ? "#fff" : "#333",
                textTransform: "none",
                minWidth: 120,
                fontSize: 15,
                height: 36,
                boxShadow: showPendingOnly ? "0 2px 8px #e5eaff" : "none",
                "&:hover": {
                  bgcolor: showPendingOnly ? "#104ed2" : "#eef1fc",
                },
              }}
            >
              {showPendingOnly ? "Show All" : "Show Pending"}
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#d3e0ed",
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: "#fff",
                textTransform: "none",
                minWidth: 120,
                fontSize: 15,
                height: 36,
                color: "#333",
                boxShadow: "none",
              }}
            >
              Export Report
            </Button>
          </Stack>
        </Box>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            mb: 3,
            boxShadow: "0 2px 8px #e8eaed",
          }}
        >
          <Box sx={{ p: 2, pb: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#24292f" }}
            >
              Payment History
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#6c757d", fontSize: 13, mt: 0.5, mb: 1 }}
            >
              A log of all payments from your buyers.
            </Typography>
          </Box>

          {!isMobile ? (
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ background: "#f6f8fa" }}>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Payment ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Buyer
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Method
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Amount (₹)
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#2953a6" }}>
                    Actions
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.buyer}</TableCell>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell>
                      {row.amount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={statusColor(row.status)}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 13 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleActionsMenuOpen(e, row.id)}
                        size="small"
                        sx={{ p: 0.5 }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={actionPaymentId === row.id && Boolean(anchorEl)}
                        onClose={handleActionsMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          sx: {
                            minWidth: 120,
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleEditOpen(row)}
                          sx={{
                            fontSize: 15,
                            px: 2,
                            py: 1,
                            minHeight: 36,
                          }}
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeletePayment(row.id)}
                          sx={{
                            fontSize: 15,
                            px: 2,
                            py: 1,
                            minHeight: 36,
                          }}
                        >
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box px={2} py={3}>
              <Stack spacing={2}>
                {filteredPayments.map((row) => (
                  <Card
                    key={row.id}
                    variant="outlined"
                    sx={{ borderRadius: 2, boxShadow: "0 1px 6px #f2f3f5" }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        fontWeight={700}
                        sx={{ mb: 0.5, fontSize: 15 }}
                      >
                        {row.id}
                      </Typography>
                      <Stack
                        spacing={0.5}
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography sx={{ fontSize: 13, color: "#7a7a7a" }}>
                          {row.date}
                        </Typography>
                        <Chip
                          label={row.status}
                          color={statusColor(row.status)}
                          size="small"
                          sx={{ fontWeight: 600, fontSize: 12 }}
                        />
                        <IconButton
                          onClick={(e) => handleActionsMenuOpen(e, row.id)}
                          size="small"
                          sx={{ p: 0.5 }}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={actionPaymentId === row.id && Boolean(anchorEl)}
                          onClose={handleActionsMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              minWidth: 120,
                              borderRadius: 2,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleEditOpen(row)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <EditIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeletePayment(row.id)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                          </MenuItem>
                        </Menu>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Buyer:</b> {row.buyer}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Order ID:</b> {row.orderId}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Method:</b> {row.method}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Amount:</b> ₹
                        {row.amount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Edit Payment Dialog */}
        <Dialog
          open={openEdit}
          onClose={handleEditClose}
          fullWidth
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
            {editPayment && (
              <Box
                component="form"
                onSubmit={handleEditSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Payment ID"
                  name="id"
                  value={editPayment.id}
                  disabled
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Date"
                  name="date"
                  value={editPayment.date}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Buyer"
                  name="buyer"
                  value={editPayment.buyer}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Order ID"
                  name="orderId"
                  value={editPayment.orderId}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Method"
                  name="method"
                  value={editPayment.method}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Amount"
                  name="amount"
                  value={editPayment.amount}
                  onChange={handleEditChange}
                  type="number"
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Status"
                  name="status"
                  value={editPayment.status}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <DialogActions sx={{ px: 0 }}>
                  <Button onClick={handleEditClose}>Cancel</Button>
                  <Button type="submit" variant="contained">
                    Save Changes
                  </Button>
                </DialogActions>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
