import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  useMediaQuery,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllBuyerCategories } from "../redux/slices/buyerCategoriesSlice";
import { toast } from "react-toastify";
import {
  createPaymentOption,
  deletePaymentOption,
  getPaymentOptionByUser,
  updatePaymentOption,
} from "../redux/slices/paymentOptionSlice";

export default function PaymentTerms() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.user);

  const { categories: buyerCategories } = useSelector(
    (state) => state.buyerCategories
  );

  const { items: paymentOptions, loading: optionsLoading } = useSelector(
    (state) => state.paymentOptions
  );

  const [categoryData, setCategoryData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionPaymentId, setActionPaymentId] = useState(null);

  // edit modal
  const [openEdit, setOpenEdit] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  // default data
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const defaultData = {
    paymentType: "both",
    cashDiscount: 5,
    creditPeriod: 30,
    interestRate: 2,
  };

  useEffect(() => {
    dispatch(getAllBuyerCategories());
  }, []);

  useEffect(() => {
    if (tabIndex === 0 && user?._id) {
      dispatch(getPaymentOptionByUser(user._id));
    }
  }, [tabIndex, user]);

  useEffect(() => {
    if (selectedCategory && !categoryData[selectedCategory]) {
      setCategoryData((prev) => ({
        ...prev,
        [selectedCategory]: { ...defaultData },
      }));
    }
  }, [selectedCategory]);

  const current = selectedCategory
    ? categoryData[selectedCategory] || defaultData
    : defaultData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!selectedCategory) return;

    setCategoryData((prev) => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [name]: value,
      },
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        buyerCategory: selectedCategory,
        user: user._id,
        paymentType:
          current.paymentType === "cash"
            ? "Cash"
            : current.paymentType === "credit"
            ? "Credit"
            : "Both",
      };

      if (current.paymentType === "cash" || current.paymentType === "both") {
        payload.cashPayment = {
          discountPercent: Number(current.cashDiscount),
        };
      }

      if (current.paymentType === "credit" || current.paymentType === "both") {
        payload.creditPayment = {
          creditPeriodDays: Number(current.creditPeriod),
          interestRatePerYear: Number(current.interestRate),
        };
      }

      await dispatch(createPaymentOption(payload)).unwrap();
      toast.success("Payment Terms Saved Successfully!");
    } catch (err) {
      toast.error("Failed to save payment terms");
    }
  };

  /* MENU */
  const handleActionsMenuOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setActionPaymentId(id);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
    setActionPaymentId(null);
  };

  /* EDIT OPEN */
  const handleEditOpen = (payment) => {
    const normalized = {
      ...payment,
      paymentType: payment.paymentType.toLowerCase(),

      // 🔥 BACKUP VALUES (CRUCIAL)
      _backupCash: payment.cashPayment?.discountPercent ?? null,
      _backupCreditPeriod: payment.creditPayment?.creditPeriodDays ?? null,
      _backupInterest: payment.creditPayment?.interestRatePerYear ?? null,
    };

    setEditPayment(normalized);
    setOpenEdit(true);
    handleActionsMenuClose();
  };

  /* UPDATE */
  const handleUpdatePayment = async () => {
    try {
      // FIX: convert lowercase → Proper Case
      const type =
        editPayment.paymentType === "cash"
          ? "Cash"
          : editPayment.paymentType === "credit"
          ? "Credit"
          : "Both";

      let cashPayment = null;
      let creditPayment = null;

      if (type === "Cash" || type === "Both") {
        cashPayment = {
          discountPercent: Number(
            editPayment.cashPayment?.discountPercent ?? editPayment._backupCash
          ),
        };
      }

      if (type === "Credit" || type === "Both") {
        creditPayment = {
          creditPeriodDays: Number(
            editPayment.creditPayment?.creditPeriodDays ??
              editPayment._backupCreditPeriod
          ),
          interestRatePerYear: Number(
            editPayment.creditPayment?.interestRatePerYear ??
              editPayment._backupInterest
          ),
        };
      }

      const updateData = {
        paymentType: type,
        cashPayment,
        creditPayment,
      };

      await dispatch(
        updatePaymentOption({ id: editPayment._id, updateData })
      ).unwrap();

      toast.success("Payment Terms Updated Successfully!");
      setOpenEdit(false);
      dispatch(getPaymentOptionByUser(user?._id));
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const handleAskDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await dispatch(deletePaymentOption(deleteId)).unwrap();
    toast.success("Payment Terms Deleted Successfully!");
    dispatch(getPaymentOptionByUser(user?._id));
    setConfirmOpen(false);
    handleActionsMenuClose();
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Manage Payment Terms
      </Typography>

      {/* TABS */}
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        {["Payment Term List", "Add Payment Term"].map((t, i) => (
          <Typography
            key={i}
            onClick={() => setTabIndex(i)}
            sx={{
              cursor: "pointer",
              fontWeight: tabIndex === i ? 700 : 500,
              color: tabIndex === i ? "#1976d2" : "#444",
            }}
          >
            {t}
          </Typography>
        ))}
      </Box>

      {/* TAB 0 */}
      {tabIndex === 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Term List
          </Typography>

          {optionsLoading ? (
            <Typography>Loading...</Typography>
          ) : paymentOptions?.length === 0 ? (
            <Typography>No Payment Terms Found</Typography>
          ) : (
            <Paper sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>#</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Type</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Cash Discount</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Credit Days</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Interest Rate</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paymentOptions.map((opt, idx) => (
                    <TableRow key={opt._id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{opt.buyerCategory?.name}</TableCell>
                      <TableCell>{opt.paymentType}</TableCell>
                      <TableCell>
                        {opt.cashPayment?.discountPercent ?? "-"}
                      </TableCell>
                      <TableCell>
                        {opt.creditPayment?.creditPeriodDays ?? "-"}
                      </TableCell>
                      <TableCell>
                        {opt.creditPayment?.interestRatePerYear ?? "-"}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          onClick={(e) => handleActionsMenuOpen(e, opt?._id)}
                        >
                          <MoreHorizIcon />
                        </IconButton>

                        <Menu
                          anchorEl={anchorEl}
                          open={
                            Boolean(anchorEl) && actionPaymentId === opt?._id
                          }
                          onClose={handleActionsMenuClose}
                        >
                          <MenuItem onClick={() => handleEditOpen(opt)}>
                            <ListItemIcon>
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>

                          <MenuItem onClick={() => handleAskDelete(opt?._id)}>
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
            </Paper>
          )}
        </>
      )}

      {/* TAB 1 */}
      {tabIndex === 1 && (
        <>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add Payment Terms
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              bgcolor: "#fff",
              borderRadius: 2,
            }}
          >
            <Typography>Buyer Category</Typography>
            <Select
              fullWidth
              sx={{ mb: 3 }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Select Category</MenuItem>
              {buyerCategories?.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>

            <Typography>Payment Type</Typography>
            <RadioGroup
              row
              sx={{ mb: 3 }}
              value={current.paymentType}
              onChange={handleChange}
              name="paymentType"
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Credit"
              />
              <FormControlLabel value="both" control={<Radio />} label="Both" />
            </RadioGroup>

            {(current.paymentType === "cash" ||
              current.paymentType === "both") && (
              <Box sx={{ mb: 3 }}>
                <Typography>Cash Discount (%)</Typography>
                <TextField
                  type="number"
                  fullWidth
                  name="cashDiscount"
                  value={current.cashDiscount}
                  onChange={handleChange}
                />
              </Box>
            )}

            {(current.paymentType === "credit" ||
              current.paymentType === "both") && (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography>Credit Period (Days)</Typography>
                  <TextField
                    name="creditPeriod"
                    fullWidth
                    type="number"
                    value={current.creditPeriod}
                    onChange={handleChange}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography>Interest Rate (%)</Typography>
                  <TextField
                    name="interestRate"
                    fullWidth
                    type="number"
                    value={current.interestRate}
                    onChange={handleChange}
                  />
                </Box>
              </>
            )}

            <Button type="submit" fullWidth variant="contained">
              Save Payment Terms
            </Button>
          </Box>
        </>
      )}

      {/* EDIT MODAL */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Payment Term
          </Typography>

          {editPayment && (
            <>
              <Typography>Payment Type</Typography>
              <RadioGroup
                row
                sx={{ mb: 3 }}
                value={editPayment.paymentType}
                onChange={(e) => {
                  const newType = e.target.value;

                  setEditPayment((prev) => ({
                    ...prev,
                    paymentType: newType,

                    cashPayment:
                      newType === "cash" || newType === "both"
                        ? {
                            discountPercent:
                              prev.cashPayment?.discountPercent ??
                              prev._backupCash ??
                              0,
                          }
                        : {
                            // value lost na ho, backup me store kar do
                            discountPercent:
                              prev.cashPayment?.discountPercent ??
                              prev._backupCash,
                          },

                    creditPayment:
                      newType === "credit" || newType === "both"
                        ? {
                            creditPeriodDays:
                              prev.creditPayment?.creditPeriodDays ??
                              prev._backupCreditPeriod ??
                              0,
                            interestRatePerYear:
                              prev.creditPayment?.interestRatePerYear ??
                              prev._backupInterest ??
                              0,
                          }
                        : {
                            // backup preserve
                            creditPeriodDays:
                              prev.creditPayment?.creditPeriodDays ??
                              prev._backupCreditPeriod,
                            interestRatePerYear:
                              prev.creditPayment?.interestRatePerYear ??
                              prev._backupInterest,
                          },
                  }));
                }}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Credit"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both"
                />
              </RadioGroup>

              {(editPayment.paymentType === "cash" ||
                editPayment.paymentType === "both") && (
                <Box sx={{ mb: 3 }}>
                  <Typography>Cash Discount (%)</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={editPayment.cashPayment?.discountPercent || 0}
                    onChange={(e) =>
                      setEditPayment((p) => ({
                        ...p,
                        cashPayment: {
                          discountPercent: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </Box>
              )}

              {(editPayment.paymentType === "credit" ||
                editPayment.paymentType === "both") && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Typography>Credit Period (Days)</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={editPayment.creditPayment?.creditPeriodDays}
                      onChange={(e) =>
                        setEditPayment((p) => ({
                          ...p,
                          creditPayment: {
                            ...p.creditPayment,
                            creditPeriodDays: Number(e.target.value),
                          },
                        }))
                      }
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography>Interest Rate (%)</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={editPayment.creditPayment?.interestRatePerYear}
                      onChange={(e) =>
                        setEditPayment((p) => ({
                          ...p,
                          creditPayment: {
                            ...p.creditPayment,
                            interestRatePerYear: Number(e.target.value),
                          },
                        }))
                      }
                    />
                  </Box>
                </>
              )}
            </>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdatePayment}>
              Update
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Payment Terms?</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this payment term? This action
            cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelDelete}>No</Button>
          <Button color="error" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
