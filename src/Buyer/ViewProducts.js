import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  Badge,
  IconButton,
  Container,
  Chip,
  Paper,
} from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductsByConnection } from "../redux/slices/sellerProductSlice";
import { addToCart, getCart } from "../redux/slices/cartSlice";

export default function ViewProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { connectionId, otherUserId } = location.state || {};

  const { allProducts } = useSelector((state) => state.products);
  const userId = useSelector((state) => state.user?.user?._id);
  const cart = useSelector((state) => state.cart?.cart);

  const [quantities, setQuantities] = useState({});
  const [localCartCount, setLocalCartCount] = useState(0);

  // ⭐ CATEGORY FILTER STATE
  const [filter, setFilter] = useState("All");

  // ⭐ "MORE" CATEGORY DROPDOWN STATE
  const [showMore, setShowMore] = useState(false);

  // Quantity Change
  const handleQtyChange = (id, value) => {
    if (value < 0) return;
    setQuantities({ ...quantities, [id]: value });
  };

  // ADD All to Cart
  const handleAddAll = async () => {
    const items = Object.entries(quantities)
      .filter(([id, qty]) => qty > 0)
      .map(([id, qty]) => ({
        productId: id,
        quantity: qty,
      }));

    if (items?.length === 0)
      return toast.info("Please enter quantity for at least one product.");

    try {
      await dispatch(addToCart({ userId, items })).unwrap();
      toast.success("Products added to cart!");

      const addedQty = items.reduce((sum, item) => sum + item.quantity, 0);
      setLocalCartCount((prev) => prev + addedQty);

      const sellerIds = [
        ...new Set(allProducts?.map((p) => p.user?._id).filter(Boolean)),
      ];
      await Promise.all(
        sellerIds?.map((sellerId) =>
          dispatch(getCart({ userId, seller: sellerId })).unwrap()
        )
      );

      setQuantities({});
    } catch (error) {
      toast.error("Failed to add items to cart");
    }
  };

  // Fetch products
  useEffect(() => {
    if (connectionId && otherUserId) {
      dispatch(getProductsByConnection({ connectionId, otherUserId }));
    }
  }, [dispatch, connectionId, otherUserId]);

  // Extract seller & buyer categories
  const sellerIds = useMemo(
    () => [...new Set(allProducts?.map((p) => p.user?._id).filter(Boolean))],
    [allProducts]
  );

  const buyerCategories = useMemo(
    () => [
      ...new Set(
        allProducts
          ?.flatMap((p) =>
            p.productVisibility?.map((v) => v.buyerCategory)
          )
          .filter(Boolean)
      ),
    ],
    [allProducts]
  );

  useEffect(() => {
    if (userId && sellerIds.length > 0) {
      dispatch(getCart({ userId, seller: sellerIds, buyerCategories }));
    }
  }, [dispatch, userId, sellerIds, buyerCategories]);

  // ⭐ PRODUCT CATEGORIES FOR FILTER
  const productCategories = [
    { key: "All", label: "All" },
    ...Array.from(
      new Set(allProducts?.map((p) => p.category?.name).filter(Boolean))
    ).map((cat) => ({ key: cat, label: cat })),
  ];

  // ⭐ SPLIT INTO FIRST 5 AND EXTRA CATEGORIES
  const visibleCategories = productCategories.slice(0, 5);
  const extraCategories = productCategories.slice(5);

  // ⭐ FILTERED PRODUCT LIST
  const filteredProducts = allProducts?.filter((p) => {
    if (filter === "All") return true;
    return p.category?.name === filter;
  });

  // Total Cart Count
  const totalCartCount = useMemo(() => {
    const backendCount = Array.isArray(cart) ? cart.length : 0;
    return backendCount + localCartCount;
  }, [cart, localCartCount]);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 3,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Typography
        fontWeight={700}
        fontSize={{ xs: 22, md: 28 }}
        mb={2}
        color="#22364a"
      >
        View Products
      </Typography>

      {/* ⭐ CATEGORY FILTER UI WITH DROPDOWN MORE BUTTON */}
{/* ⭐ CATEGORY FILTER UI WITH DROPDOWN MORE BUTTON */}
<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>

  {/* First 5 categories */}
  {visibleCategories.map((c) => (
    <Chip
      key={c.key}
      label={c.label}
      clickable
      color={filter === c.key ? "primary" : "default"}
      onClick={() => {
        setFilter(c.key);
        setShowMore(false);
      }}
      sx={{
        fontWeight: filter === c.key ? 700 : 500,
        backgroundColor: filter !== c.key ? "#f0f3fb" : undefined,
      }}
    />
  ))}

  {/* MORE BUTTON */}
  {extraCategories.length > 0 && (
    <Box sx={{ position: "relative" }}>
      <Chip
        label="MORE"
        clickable
        onClick={() => setShowMore(!showMore)}
        sx={{
          fontWeight: 600,
          backgroundColor: "#f0f3fb",
        }}
      />

      {/* Dropdown box exactly like screenshot */}
      {showMore && (
        <Box
          sx={{
            position: "absolute",
            top: "42px",
            right: 0,
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
            width: "180px",
            py: 1,
            zIndex: 99,
          }}
        >
          {extraCategories.map((c) => (
            <Box
              key={c.key}
              sx={{
                px: 2,
                py: 1,
                cursor: "pointer",
                fontSize: "15px",
                color: "#22364a",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              onClick={() => {
                setFilter(c.key);
                setShowMore(false);
              }}
            >
              {c.label}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )}

</Box>



      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, fontSize: "16px" }}>#</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "16px" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "16px" }}>
                Price
              </TableCell>
              <TableCell
                sx={{ fontWeight: 800, fontSize: "16px", textAlign: "center" }}
              >
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts?.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell sx={{ fontSize: "15px" }}>
                  {index + 1}
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      color: "#22364a",
                      fontWeight: 600,
                      fontSize: "15px",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#fb8900",
                      },
                    }}
                    onClick={() =>
                      navigate(
                        `/buyer-dashboard/product-details/${product._id}`,
                        { state: { product } }
                      )
                    }
                  >
                    {product.name}
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontSize: "15px", color: "#fb8900", fontWeight: 700 }}
                >
                  ₹{product.price}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <TextField
                    type="number"
                    size="small"
                    value={quantities[product._id] || 0}
                    onChange={(e) =>
                      handleQtyChange(
                        product._id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    sx={{
                      width: "70px",
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom Buttons */}
      <Box
        sx={{
          right: 0,
          display: "flex",
          gap: 2,
          mt: 3,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleAddAll}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            backgroundColor: "#fb8900",
            color: "#fff",
            "&:hover": { backgroundColor: "#fb8a00e2" },
          }}
        >
          Add to Cart
        </Button>

        <Badge
          badgeContent={totalCartCount}
          color="primary"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <IconButton
            onClick={() => {
              navigate("/buyer-dashboard/cart", {
                state: { buyerCategories, sellerIds, userId },
              });
            }}
            sx={{
              backgroundColor: "#e0f2f1",
              borderRadius: "50%",
              width: 50,
              height: 50,
              color: "#22364a",
              "&:hover": { backgroundColor: "#b2dfdb" },
            }}
          >
            <ShoppingCartIcon fontSize="medium" />
          </IconButton>
        </Badge>
      </Box>
    </Box>
  );
}
