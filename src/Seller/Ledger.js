import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Grid,
  Select,
  MenuItem,
  Button,
  InputBase,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBuyer } from "../redux/slices/ledgerSlice";

const typeColor = (type) => (type === "Payment" ? "success" : "default");

export default function LedgerPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const ledgerData = useSelector((state) => state?.ledger?.ledgerData);
  const selectedBuyer = useSelector((state) => state?.ledger?.selectedBuyer);
  const buyersList = useSelector((state) => state?.ledger?.buyersList);

  // Filter data by selected buyer
  const filteredData =
    selectedBuyer === "All Buyers"
      ? ledgerData
      : ledgerData?.filter((t) => t?.buyer === selectedBuyer);

  // Calculate summary based on filtered data
  const totalReceivables = filteredData?.reduce(
    (acc, t) => acc + (t.debit || 0) - (t.credit || 0),
    0
  );
  const totalPayables = 0;
  const netBalance = totalReceivables - totalPayables;

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
          maxWidth: 1400, // Content max width same as Catalog
          mx: "auto", // Center horizontally
          boxSizing: "border-box",
        }}
      >
        {/* Header Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            mb: 1,
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Ledger Book
          </Typography>
          {/* Button Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Select
              value={selectedBuyer}
              onChange={(e) => dispatch(setSelectedBuyer(e.target.value))}
              size="small"
              variant="outlined"
              sx={{
                minWidth: 130,
                bgcolor: "#fafbfc",
                fontWeight: 500,
                fontSize: 15,
                height: 36,
                mr: { xs: 0, sm: 1 },
              }}
              IconComponent={ArrowDropDownIcon}
              input={<InputBase />}
            >
              {buyersList?.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#2564eb",
                "&:hover": { bgcolor: "#1846b6" },
                boxShadow: "none",
                fontWeight: 600,
                borderRadius: 2,
                minWidth: 110,
                mr: { xs: 0, sm: 1 },
                textTransform: "none",
                fontSize: 15,
                height: 36,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
                width: { xs: "100%", sm: "auto" }, // Full width on mobile
              }}
              startIcon={<AddCircleOutlineIcon />}
            >
              <span style={{ whiteSpace: "nowrap" }}>New Entry</span>
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#d3e0ed",
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: "#fff",
                textTransform: "none",
                minWidth: 90,
                fontSize: 15,
                height: 36,
                color: "#333",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: { xs: "100%", sm: "auto" }, // Full width on mobile
              }}
              startIcon={<DownloadIcon />}
            >
              Export
            </Button>
          </Box>
        </Box>

        {/* Main Card */}
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
              Transactions
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#6c757d", fontSize: 13, mt: 0.5, mb: 1 }}
            >
              Your ledger of all transactions with buyers.
            </Typography>
          </Box>

          {/* Table for Desktop */}
          {!isMobile ? (
            <TableContainer>
              <Table sx={{ minWidth: 900 }}>
                <TableHead>
                  <TableRow sx={{ background: "#f6f8fa" }}>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Buyer</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Details</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Debit (₹)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Credit (₹)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.buyer}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.type}
                          color={typeColor(row.type)}
                          size="small"
                          sx={{ fontWeight: 600, fontSize: 13 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: 14 }}>
                          {row.details}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {row.debit ? row.debit.toLocaleString() + ".00" : "-"}
                      </TableCell>
                      <TableCell
                        sx={{ color: row.credit ? "#43a047" : undefined }}
                      >
                        {row.credit ? row.credit.toLocaleString() + ".00" : "-"}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        {row.balance
                          ? row.balance.toLocaleString() + ".00"
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            // Card View for Mobile
            <Box px={3} py={4}>
              <Stack spacing={2}>
                {filteredData?.map((row, i) => (
                  <Card
                    key={i}
                    variant="outlined"
                    sx={{ borderRadius: 2, boxShadow: "0 1px 6px #f2f3f5" }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Date
                          </Typography>
                          <Typography fontWeight={600}>{row.date}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Buyer
                          </Typography>
                          <Typography fontWeight={600}>{row.buyer}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Type
                          </Typography>
                          <Chip
                            label={row.type}
                            color={typeColor(row.type)}
                            size="small"
                            sx={{ fontWeight: 600, fontSize: 13 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Details
                          </Typography>
                          <Typography>{row.details}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Debit (₹)
                          </Typography>
                          <Typography>
                            {row.debit
                              ? row.debit.toLocaleString() + ".00"
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Credit (₹)
                          </Typography>
                          <Typography
                            sx={{ color: row.credit ? "#43a047" : undefined }}
                          >
                            {row.credit
                              ? row.credit.toLocaleString() + ".00"
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={{ fontSize: 14, color: "#7a7a7a" }}>
                            Balance
                          </Typography>
                          <Typography fontWeight={700}>
                            {row.balance
                              ? row.balance.toLocaleString() + ".00"
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Summary Footer */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            background: "#f6f8fa",
            p: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "#444", fontSize: 16 }}>
            Total Receivables <br />
            <span style={{ fontWeight: 900, fontSize: 22, color: "#222" }}>
              ₹
              {totalReceivables?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: 600, color: "#444", fontSize: 16 }}>
            Total Payables <br />
            <span style={{ fontWeight: 900, fontSize: 22, color: "#222" }}>
              ₹
              {totalPayables?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#368f3d",
              fontSize: 16,
              textAlign: { xs: "left", sm: "right" },
            }}
          >
            Net Balance <br />
            <span style={{ fontWeight: 900, fontSize: 22, color: "#23b054" }}>
              ₹
              {netBalance?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              (Receivable)
            </span>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
