import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuyerConnections } from "../redux/slices/buyerNetworkSlice";
import { getCart } from "../redux/slices/cartSlice";

export default function SellerNetwork() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buyers, loading, error } = useSelector((state) => state.buyerNetwork);
  const { cart } = useSelector((state) => state.cart);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCounts, setCartCounts] = useState({});
  const { user } = useSelector((state) => state.user);
  const userId = user._id;

  // Fetch connected sellers when page loads
  useEffect(() => {
    dispatch(fetchBuyerConnections());
  }, [dispatch]);

  // Fetch cart for all sellers once user logs in
  useEffect(() => {
    if (!buyers?.length || !userId) return;

    const fetchCartsSequentially = async () => {
      for (const seller of buyers.filter((b) => b.status === "Accepted")) {
        const sellerId = seller?.connectionData?.otherUser?._id;
        const buyerCategoryId = seller?.connectionData?.buyerCategory?._id;

        if (!sellerId || !buyerCategoryId) continue;

        try {
          const res = await dispatch(
            getCart({
              userId,
              seller: sellerId,
              buyerCategories: [buyerCategoryId],
            })
          ).unwrap();

          const count = Array.isArray(res)
            ? res.length
            : res?.items?.length || 0;

          setCartCounts((prev) => ({
            ...prev,
            [sellerId]: count,
          }));

          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (err) {
          setCartCounts((prev) => ({
            ...prev,
            [sellerId]: 0,
          }));
        }
      }
    };

    fetchCartsSequentially();
  }, [buyers, userId, dispatch]);

  // Filters
  const filteredConnectedSellers = buyers
    .filter((b) => b.status === "Accepted")
    .filter(
      (b) =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredRecommendedSellers = buyers
    .filter((b) => b.status === "Pending")
    .filter(
      (b) =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.city?.toLowerCase().includes(searchTerm.toLowerCase())
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
        sx={{ width: "100%", maxWidth: 1400, mx: "auto", paddingRight: "10px" }}
      >
        {/* Page Title */}
        <Typography
          fontWeight={700}
          fontSize={{ xs: 22, md: 28 }}
          color="#22364a"
          sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}
        >
          Seller Network
        </Typography>
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <TextField
            placeholder="Search sellers..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: 260 },
              background: "#fff",
              borderRadius: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#8b99a8" }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <Button
                    onClick={() => setSearchTerm("")}
                    sx={{ minWidth: 0, color: "#8b99a8", fontSize: 14 }}
                  >
                    ✕
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              background: "#f97316",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
              fontSize: 16,
              boxShadow: 0,
              width: { xs: "100%", sm: "auto" },
              "&:hover": { background: "#f5812eff" },
            }}
          >
            Find New Sellers
          </Button>
        </Box>

        {/* Loader or Error */}
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={10}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <>
            {/* Connected Sellers */}
            <Typography
              fontWeight={700}
              fontSize={{ xs: 16, md: 19 }}
              color="#22364a"
              sx={{ mb: 2, textAlign: isMobile ? "center" : "left" }}
            >
              My Connected Sellers
            </Typography>

            {filteredConnectedSellers?.length > 0 ? (
              <Grid container spacing={isMobile ? 2 : 4} sx={{ mb: 4 }}>
                {filteredConnectedSellers?.map((seller) => (
                  <Grid item xs={12} sm={6} md={4} key={seller._id}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: "#fff",
                        boxShadow: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1.5,
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "#ededed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 17,
                            color: "#22364a",
                            userSelect: "none",
                          }}
                        >
                          {seller.initials}
                        </Box>
                        <Box>
                          <Typography
                            fontWeight={700}
                            fontSize={16}
                            color="#22364a"
                          >
                            {seller.name}
                          </Typography>
                          <Typography fontSize={14} color="#8b99a8">
                            {seller.city}
                          </Typography>
                        </Box>
                      </Box>

                      {/* View Products + Cart beside it */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            background: "#f97316",
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            fontSize: 15,
                            boxShadow: 0,
                            "&:hover": { background: "#f5812eff" },
                          }}
                          onClick={() =>
                            navigate("/buyer-dashboard/view-products", {
                              state: {
                                connectionId: seller.connectionData?._id,
                                otherUserId:
                                  seller.connectionData?.otherUser?._id,
                              },
                            })
                          }
                        >
                          View Products
                        </Button>

                        {/* Cart Icon with Count */}
                        <Badge
                          badgeContent={
                            cartCounts[
                              seller?.connectionData?.otherUser?._id
                            ] !== undefined
                              ? cartCounts[
                                  seller?.connectionData?.otherUser?._id
                                ]
                              : "?"
                          }
                          color="primary"
                          sx={{ cursor: "pointer" }}
                        >
                          <IconButton
                            onClick={() => {
                              navigate("/buyer-dashboard/cart", {
                                state: {
                                  userId,
                                  sellerIds: [
                                    seller?.connectionData?.otherUser?._id,
                                  ],
                                  buyerCategories: [
                                    seller?.connectionData?.buyerCategory?._id,
                                  ],
                                },
                              });
                            }}
                          >
                            <ShoppingCart sx={{ color: "#22364a" }} />
                          </IconButton>
                        </Badge>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography textAlign="center" color="#8b99a8" py={3}>
                No connected sellers found.
              </Typography>
            )}

            {/* Recommended Sellers */}
            {/* <Typography
              fontWeight={700}
              fontSize={{ xs: 16, md: 19 }}
              color="#22364a"
              sx={{
                mb: 2,
                mt: { xs: 10, sm: 6, md: 10 },
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Recommended Sellers
            </Typography> */}

            {/* {filteredRecommendedSellers.length > 0 ? (
              <Grid container spacing={isMobile ? 2 : 4} sx={{ mb: 5 }}>
                {filteredRecommendedSellers.map((seller) => (
                  <Grid item xs={12} sm={6} md={4} key={seller._id}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: "#fff",
                        boxShadow: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1.5,
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "#ededed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 17,
                            color: "#22364a",
                            userSelect: "none",
                          }}
                        >
                          {seller.initials}
                        </Box>
                        <Box>
                          <Typography
                            fontWeight={700}
                            fontSize={16}
                            color="#22364a"
                          >
                            {seller.name}
                          </Typography>
                          <Typography fontSize={14} color="#8b99a8">
                            {seller.city}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          background: "#e9edf7",
                          color: "#22364a",
                          fontWeight: 700,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 3,
                          fontSize: 15,
                          boxShadow: 0,
                          width: { xs: "100%", sm: "auto" },
                          "&:hover": { background: "#d1dbe8" },
                        }}
                      >
                        Send Connection Request
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography textAlign="center" color="#8b99a8" py={3}>
                No recommended sellers found.
              </Typography>
            )} */}
          </>
        )}
      </Box>
    </Box>
  );
}