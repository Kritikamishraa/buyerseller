import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import DeleteIcon from "@mui/icons-material/Delete";
import { differenceInCalendarDays } from "date-fns";

export default function InterestTransactionCalculator() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [lastDate, setLastDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [rate, setRate] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [result, setResult] = useState({
    interest: 0,
    totalAmount: 0,
    days: 0,
  });

  // Unique ID generator for transactions
  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  const handleAddTransaction = () => {
    setTransactions((prev) => [
      ...prev,
      { id: generateId(), type: "credit", amount: "", txnDate: null },
    ]);
  };

  const handleTransactionChange = (id, field, value) => {
    setTransactions((prev) =>
      prev.map((txn) => (txn.id === id ? { ...txn, [field]: value } : txn))
    );
  };

  // Updated: After delete, also recalc
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => {
      const newTxns = prev.filter((txn) => txn.id !== id);
      // After updating transactions state, recalc using new list
      setTimeout(() => {
        calculateWithTransactions(newTxns);
      }, 0);
      return newTxns;
    });
  };

  // Extracted calculation logic into reusable function to use after delete too
  const calculateWithTransactions = (txns) => {
    if (!lastDate || !currentDate || !rate || !initialAmount) {
      setResult({ interest: 0, totalAmount: 0, days: 0 });
      return;
    }

    const filteredTxns = txns
      .filter((t) => t.amount && t.txnDate)
      .map((t) => ({
        id: t.id,
        type: t.type,
        amount: parseFloat(t.amount),
        date: typeof t.txnDate === "string" ? new Date(t.txnDate) : t.txnDate,
      }))
      .sort((a, b) => a.date - b.date);

    let principal = parseFloat(initialAmount);
    const interestRate = parseFloat(rate);
    let totalInterest = 0;
    let runningDate = lastDate;

    for (const txn of filteredTxns) {
      if (txn.date < runningDate) continue;
      const diffDays = differenceInCalendarDays(txn.date, runningDate);
      if (diffDays > 0) {
        totalInterest += (principal * interestRate * diffDays) / 36000;
        runningDate = txn.date;
      }
      principal += txn.type === "credit" ? txn.amount : -txn.amount;
    }

    const finalDiffDays = differenceInCalendarDays(currentDate, runningDate);
    if (finalDiffDays > 0) {
      totalInterest += (principal * interestRate * finalDiffDays) / 36000;
    }

    const totalDays = differenceInCalendarDays(currentDate, lastDate);

    setResult({
      days: totalDays,
      interest: totalInterest.toFixed(2),
      totalAmount: (principal + totalInterest).toFixed(2),
    });
  };

  // Calculate on Show Total button click
  const handleCalculate = () => {
    calculateWithTransactions(transactions);
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
          maxWidth: 700,
          mx: "auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          px: { xs: 1, sm: 2, md: 3 },
          background: "transparent",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          gutterBottom
          sx={{ letterSpacing: 0.5, color: "#22364a" }}
          align="center"
        >
          Interest & Transaction Calculator
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            bgcolor: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Last Date"
                  inputFormat="dd/MM/yyyy"
                  value={lastDate}
                  onChange={setLastDate}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Current Date"
                  inputFormat="dd/MM/yyyy"
                  value={currentDate}
                  onChange={setCurrentDate}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Interest Rate (%)"
                  type="number"
                  fullWidth
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Initial Amount"
                  type="number"
                  fullWidth
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1, color: "#22364a" }}>
                  Transactions
                </Typography>

                {transactions.map((t) => (
                  <Grid
                    container
                    spacing={1}
                    key={t.id}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id={`type-label-${t.id}`}>Type</InputLabel>
                        <Select
                          labelId={`type-label-${t.id}`}
                          value={t.type}
                          label="Type"
                          onChange={(e) =>
                            handleTransactionChange(
                              t.id,
                              "type",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="credit">Credit</MenuItem>
                          <MenuItem value="debit">Debit</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        value={t.amount}
                        onChange={(e) =>
                          handleTransactionChange(
                            t.id,
                            "amount",
                            e.target.value
                          )
                        }
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        label="Date"
                        inputFormat="dd/MM/yyyy"
                        value={t.txnDate}
                        onChange={(newValue) =>
                          handleTransactionChange(t.id, "txnDate", newValue)
                        }
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteTransaction(t.id)}
                        sx={{ mt: isMobile ? 0 : 1.5 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Button
                  variant="outlined"
                  onClick={handleAddTransaction}
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    mt: 1,
                    textTransform: "none",
                    fontWeight: 700,
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    color: "#3e4258",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                  }}
                >
                  Add Transaction
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    fontWeight: 700,
                    py: 1.5,
                    bgcolor: "#5070f4",
                    "&:hover": { bgcolor: "#2951e4" },
                  }}
                  onClick={handleCalculate}
                >
                  Show Total
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "#22364a" }}
                >
                  Days: {result.days} &nbsp;&nbsp; Interest: ₹ {result.interest}{" "}
                  &nbsp;&nbsp; Total Amount: ₹ {result.totalAmount}
                </Typography>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
      </Box>
    </Box>
  );
}
