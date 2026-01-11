import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

// Sample ledger data
const ledgerRows = [
  {
    date: "2023-10-25",
    description: "Order #ORD001",
    seller: "Kumar Kirana Store",
    type: "Debit",
    amount: 5250,
    balance: 5250,
  },
  {
    date: "2023-10-26",
    description: "Payment Received",
    seller: "Kumar Kirana Store",
    type: "Credit",
    amount: 5000,
    balance: 250,
  },
  {
    date: "2023-10-28",
    description: "Order #ORD002",
    seller: "Sharma Textiles",
    type: "Debit",
    amount: 12000,
    balance: 12250,
  },
  {
    date: "2023-11-01",
    description: "Order #ORD003",
    seller: "Kumar Kirana Store",
    type: "Debit",
    amount: 3500,
    balance: 15750,
  },
  {
    date: "2023-11-05",
    description: "Payment Received",
    seller: "Sharma Textiles",
    type: "Credit",
    amount: 12000,
    balance: 3750,
  },
];

export default function Ledger() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [sellerFilter, setSellerFilter] = React.useState("All Sellers");

  // Calculate total outstanding balance (last balance)
  const totalBalance =
    ledgerRows.length > 0 ? ledgerRows[ledgerRows.length - 1].balance : 0;

  // Get unique sellers for filter dropdown
  const sellers = Array.from(new Set(ledgerRows.map((row) => row.seller)));

  // Filter rows by seller
  const filteredRows =
    sellerFilter === "All Sellers"
      ? ledgerRows
      : ledgerRows.filter((row) => row.seller === sellerFilter);

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
          paddingRight: "10px",
          boxSizing: "border-box",
        }}
      >
        {/* Heading and Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: { xs: 3, md: 3 },
            gap: 2,
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={{ xs: 22, md: 28 }}
            color="#22364a"
          >
            Ledger
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: { xs: "stretch", sm: "flex-end" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Select
              value={sellerFilter}
              onChange={(e) => setSellerFilter(e.target.value)}
              size="small"
              sx={{
                minWidth: 140,
                background: "#f5f6f8",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 15,
                flexGrow: { xs: 1, sm: 0 },
              }}
            >
              <MenuItem value="All Sellers">All Sellers</MenuItem>
              {sellers.map((seller) => (
                <MenuItem key={seller} value={seller}>
                  {seller}
                </MenuItem>
              ))}
            </Select>
            <Button
              startIcon={<DownloadIcon />}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 15,
                background: "#f5f6f8",
                color: "#22364a",
                borderColor: "#ededed",
                "&:hover": {
                  background: "#2961e1",
                  color: "#fff",
                  borderColor: "#2961e1",
                },
                whiteSpace: "nowrap",
                flexGrow: { xs: 1, sm: 0 },
              }}
            >
              Download Statement
            </Button>
          </Box>
        </Box>

        {/* Table Card */}
        <Box
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 0,
            background: "#fff",
            border: "1px solid #ededed",
            p: { xs: 1, sm: 2.5, md: 3 },
            mt: { xs: 1, md: 2 },
            width: "100%",
            overflowX: "auto",
            boxSizing: "border-box",
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={20}
            color="#22364a"
            sx={{ mb: 0.5 }}
          >
            Transaction History
          </Typography>
          <Typography color="#8b99a8" fontSize={14} sx={{ mb: 2 }}>
            Your account statement with all sellers.
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Seller
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Amount (₹)
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Balance (₹)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="#888" fontWeight={500} fontSize={18}>
                        No transactions for this seller.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Typography
                          component="span"
                          fontWeight={
                            row.description.startsWith("Order") ? 700 : 600
                          }
                          color="#22364a"
                          sx={{ fontSize: 15 }}
                        >
                          {row.description}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.seller}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.type}
                          color={row.type === "Credit" ? "success" : "error"}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: 14,
                            px: 1.3,
                            background:
                              row.type === "Credit" ? "#22c55e" : "#ef4444",
                            color: "#fff",
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {row.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Outstanding Balance Card + Pay Now */}
        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            p: { xs: 2, md: 3 },
            background: "#f5f8fc",
            borderRadius: 3,
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            color="#22364a"
            fontWeight={600}
            fontSize={18}
            sx={{ flexGrow: 1 }}
          >
            Total Outstanding Balance
            <span
              style={{
                display: "inline-block",
                marginLeft: 18,
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              ₹
              {totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </Typography>
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.1,
              background: "#2961e1",
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 2,
              color: "#fff",
              boxShadow: 0,
              "&:hover": { background: "#1a3c93" },
            }}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
