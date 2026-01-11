import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setTabValue,
  setSearchValue,
  fetchBuyerConnections,
  updateConnectionStatus,
  clearError,
} from "../redux/slices/buyerNetworkSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { toast } from "react-toastify";

export default function SellerRequest() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { buyers, tabValue, searchValue, loading, error } = useSelector(
    (state) => state.buyerNetwork
  );

  useEffect(() => {
    dispatch(fetchBuyerConnections());
  }, [dispatch]);

  const handleStatusUpdate = (connectionId, status) => {
    const result = dispatch(updateConnectionStatus({ connectionId, status }));
    if (result && typeof result.then === "function") {
      result
        .then(() => {
          dispatch(fetchBuyerConnections());
        })
        .catch((err) => {
          toast.error(err?.message || "Failed to update connection status");
        });
    } else {
      dispatch(fetchBuyerConnections());
    }
  };

  useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearError());
  }
}, [error, dispatch]);

  // Filter buyers by tab (Accepted, Pending, Rejected)
  const filteredBuyers =
    tabValue === 0
      ? buyers?.filter(
          (b) =>
            b.status === "Accepted" &&
            b.name?.toLowerCase().includes(searchValue?.toLowerCase())
        )
      : tabValue === 1
      ? buyers?.filter(
          (b) =>
            b.status === "Pending" &&
            b.name?.toLowerCase().includes(searchValue?.toLowerCase())
        )
      : buyers?.filter(
          (b) =>
            b.status === "Rejected" &&
            b.name?.toLowerCase().includes(searchValue?.toLowerCase())
        );
  
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
          px: { xs: 1, sm: 3, md: 4 },
          boxSizing: "border-box",
        }}
      >
        {/* Title and Tabs */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ color: "#222" }}>
              Seller Connection Request
            </Typography>

            <Box
              sx={{
                width: { xs: "100%", sm: 240 },
                ml: { xs: 0, sm: 1 },
                mt: { xs: 1, sm: 0 },
              }}
            >
              <input
                type="text"
                placeholder="Search buyers..."
                value={searchValue}
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                style={{
                  width: "100%",
                  fontSize: 15,
                  borderRadius: 6,
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  outline: "none",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              mb: 2,
              "&::-webkit-scrollbar": { height: 5 },
              "&::-webkit-scrollbar-thumb": {
                background: "#d0d0d0",
                borderRadius: 10,
              },
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_e, v) => dispatch(setTabValue(v))}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              ScrollButtonComponent={(props) => (
                <Button {...props} sx={{ minWidth: 50 }}>
                  {props.direction === "left" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </Button>
              )}
              sx={{
                minHeight: 32,
                "& .MuiTab-root": { minHeight: 32, fontWeight: 600 },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Connected&nbsp;
                    <Box
                      component="span"
                      sx={{
                        bgcolor: "#3066be",
                        color: "#fff",
                        borderRadius: 2,
                        px: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      {buyers.filter((b) => b.status === "Accepted").length}
                    </Box>
                  </Box>
                }
                sx={{ fontSize: 15, px: 2 }}
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Pending Requests&nbsp;
                    <Box
                      component="span"
                      sx={{
                        bgcolor: "#e5e5e5",
                        color: "#222",
                        borderRadius: 2,
                        px: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      {buyers.filter((b) => b.status === "Pending").length}
                    </Box>
                  </Box>
                }
                sx={{ fontSize: 15, px: 2 }}
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Rejected Requests&nbsp;
                    <Box
                      component="span"
                      sx={{
                        bgcolor: "#e5e5e5",
                        color: "#222",
                        borderRadius: 2,
                        px: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      {buyers.filter((b) => b.status === "Rejected").length}
                    </Box>
                  </Box>
                }
                sx={{ fontSize: 15, px: 2 }}
              />
            </Tabs>
          </Box>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Buyers Grid */}
        {!loading && (
          <Grid
            container
            spacing={isMobile ? 3 : 4}
            justifyContent="center"
            sx={{ px: { xs: 1, sm: 0 } }}
          >
            {filteredBuyers.length === 0 ? (
              <Box sx={{ width: "100%", textAlign: "center", py: 6 }}>
                <Typography variant="body1" color="text.secondary">
                  {tabValue === 0
                    ? "No connected buyers found."
                    : tabValue === 1
                    ? "No pending requests."
                    : "No rejected requests."}
                </Typography>
              </Box>
            ) : (
              filteredBuyers.map((buyer) => (
                <Grid key={buyer._id} item xs={12} sm={6} md={4}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      minWidth: 220,
                      maxWidth: 360,
                      background: "#fff",
                      transition: "box-shadow 0.18s",
                      boxShadow:
                        "0px 2px 8px rgba(48, 102, 190, 0.10), 0px 0.5px 1.5px #e5e8ef",
                      ":hover": {
                        boxShadow:
                          "0px 6px 24px rgba(48, 102, 190, 0.12), 0px 1.5px 3px #dde3ef",
                      },
                      mx: "auto",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pb: 2,
                        pt: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 55,
                          height: 55,
                          borderRadius: "50%",
                          bgcolor: "#ebebeb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#667",
                          mb: 2,
                        }}
                      >
                        {buyer.initials}
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          color: "#232",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        {buyer.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#777",
                          mb: 2,
                          mt: 0.5,
                          textAlign: "center",
                        }}
                      >
                        {buyer.city}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ color: "#f97316", fontSize: 15, mb: 2 }}
                      >
                        {buyer.status}
                      </Typography>

                      {/* Pending Actions */}
                      {tabValue === 1 && buyer.status === "Pending" && (
                        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              bgcolor: "#f97316",
                              borderRadius: 2,
                              fontWeight: 600,
                              fontSize: 15,
                              boxShadow: "none",
                              py: 1,
                              "&:hover": { bgcolor: "#f5812eff" },
                            }}
                            onClick={() =>
                              handleStatusUpdate(buyer._id, "Accepted")
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderColor: "#f97316",
                              color: "#dc2626",
                              borderRadius: 2,
                              fontWeight: 600,
                              fontSize: 15,
                              py: 1,
                              "&:hover": {
                                borderColor: "#f5812eff",
                                bgcolor: "#fef2f2",
                              },
                            }}
                            onClick={() =>
                              handleStatusUpdate(buyer._id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </Box>
                      )}

                      {/* Rejected Actions (fixed) */}
                      {tabValue === 2 && buyer.status === "Rejected" && (
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: "#f97316",
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: 15,
                            boxShadow: "none",
                            py: 1,
                            "&:hover": { bgcolor: "#f5812eff" },
                          }}
                          onClick={() =>
                            handleStatusUpdate(buyer._id, "Pending")
                          }
                        >
                          Restore Request
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
