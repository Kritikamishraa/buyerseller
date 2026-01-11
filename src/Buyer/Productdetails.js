import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Modal,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?._id);
  const [openSellerModal, setOpenSellerModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    product?.image || product?.images?.[0]
  );

  const mrp = product?.mrp || 0;
  const price = product?.price || 0;

  const discountPercentage =
    mrp > 0 ? (((mrp - price) / mrp) * 100).toFixed(0) : 0;

  const handleAddToCart = async () => {
    try {
      const items = [
        {
          productId: product._id,
          quantity: 1,
        },
      ];

      await dispatch(addToCart({ userId, items })).unwrap();
      toast.success("Products added to cart!");
    } catch (error) {
      toast.error("Failed to add items to cart");
    }
  };

  if (!product) return <Typography>No product data found</Typography>;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        fontWeight={700}
        fontSize={{ xs: 22, sm: 26, md: 30 }}
        sx={{ px: { xs: 2, sm: 3 }, mb: 2 }}
        color="#22364a"
      >
        Product Details
      </Typography>

      <Box sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.3fr" },
            gap: { xs: 3, sm: 4, md: 6 },
          }}
        >
          <Box>
            {product?.images?.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mb: 2,
                  overflowX: "auto",
                  pb: 1,
                }}
              >
                {product?.images?.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: 65,
                      height: 65,
                      objectFit: "cover",
                      borderRadius: 2,
                      cursor: "pointer",
                      border:
                        selectedImage === img
                          ? "2px solid #144c4a"
                          : "1px solid #d1d5db",
                    }}
                  />
                ))}
              </Box>
            )}

            <Box
              component="img"
              src={selectedImage}
              sx={{
                width: "100%",
                height: { xs: 260, sm: 330, md: 430, lg: 500 },
                objectFit: "contain",
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                background: "#fb8900",
                borderRadius: 2,
                fontWeight: 700,
                fontSize: { xs: 16, sm: 18 },
                textTransform: "none",
                "&:hover": { background: "#fb8a00e2" },
              }}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </Box>

          <Box>
            <Typography
              fontSize={{ xs: 22, sm: 26, md: 30 }}
              fontWeight={700}
              sx={{ mb: 1 }}
            >
              {product.name}
            </Typography>

            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                border: "1px solid #d1d5db",
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  textDecoration: "line-through",
                  fontSize: { xs: 15, sm: 17 },
                  color: "#9ca3af",
                  mb: 0.5,
                }}
              >
                ₹{mrp.toLocaleString("en-IN")}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 22, sm: 28, md: 32 },
                  fontWeight: 800,
                  color: "#000000d3",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                ₹{price.toLocaleString("en-IN")}
                <span
                  style={{
                    fontSize: "18px",
                    color: "green",
                    fontWeight: 600,
                  }}
                >
                  {discountPercentage}% OFF
                </span>
              </Typography>

              {product.unit && (
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: { xs: 15, sm: 17 },
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Unit: {product.unit}
                </Typography>
              )}
            </Box>

            <Typography
              fontSize={{ xs: 20, sm: 22 }}
              fontWeight={700}
              sx={{ mb: 1 }}
            >
              Description
            </Typography>

            <Typography
              sx={{
                color: "#374151",
                lineHeight: 1.7,
                fontSize: { xs: 14, sm: 16 },
              }}
            >
              {product.description || "No full description provided."}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {product.specifications && (
              <>
                <Typography
                  fontSize={{ xs: 20, sm: 22 }}
                  fontWeight={700}
                  sx={{ mb: 1 }}
                >
                  Specifications
                </Typography>

                <Typography
                  sx={{
                    color: "#374151",
                    lineHeight: 1.8,
                    fontSize: { xs: 14, sm: 16 },
                  }}
                >
                  {(() => {
                    let specs = product.specifications;
                    if (Array.isArray(specs)) {
                      return specs.map((s, i) => <div key={i}>• {s}</div>);
                    }
                    if (typeof specs === "object") {
                      return Object.entries(specs).map(([key, val]) => (
                        <div key={key}>
                          • <strong>{key}:</strong> {val}
                        </div>
                      ));
                    }
                    return specs;
                  })()}
                </Typography>

                <Divider sx={{ my: 3 }} />
              </>
            )}

            {product.user && (
              <>
                <Typography
                  fontSize={{ xs: 20, sm: 22 }}
                  fontWeight={700}
                  sx={{ mb: 2 }}
                >
                  Seller
                </Typography>

                <Box
                  onClick={() => setOpenSellerModal(true)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    mb: 4,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f9fafb" },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: "#2563eb" }}>
                    {product.user.name}
                  </Typography>

                  <Typography fontSize={14} color="text.secondary">
                    Seller since:{" "}
                    {new Date(product.user.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Modal open={openSellerModal} onClose={() => setOpenSellerModal(false)}>
        <Box
          sx={{
            width: { xs: "80%", sm: 400 },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography
              fontSize={24}
              fontWeight={500}
              sx={{ letterSpacing: "1.2px" }}
            >
              About the Seller
            </Typography>

            <Typography
              onClick={() => setOpenSellerModal(false)}
              sx={{
                fontSize: 26,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ×
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography sx={{ letterSpacing: "1.2px" }}>
            <strong style={{ letterSpacing: "1.2px" }}>Name:</strong>{" "}
            {product.user.name}
          </Typography>
          <Typography sx={{ mt: 1, letterSpacing: "1.2px" }}>
            <strong style={{ letterSpacing: "1.2px" }}>Business Name:</strong>{" "}
            {product.user.businessName || "N/A"}
          </Typography>
          <Typography sx={{ mt: 1, letterSpacing: "1.2px" }}>
            <strong style={{ letterSpacing: "1.2px" }}>Email:</strong>{" "}
            {product.user.email}
          </Typography>
          <Typography sx={{ mt: 1, letterSpacing: "1.2px" }}>
            <strong style={{ letterSpacing: "1.2px" }}>Phone:</strong>{" "}
            {product.user.phone || "N/A"}
          </Typography>
          <Typography sx={{ mt: 1, letterSpacing: "1.2px" }}>
            <strong style={{ letterSpacing: "1.2px" }}>Address:</strong>{" "}
            {product.user.businessAddress || "N/A"}
          </Typography>
          <Typography sx={{ mt: 1, letterSpacing: "1.2px" }}>
            <strong style={{ letterSpacing: "1.2px" }}>Seller since:</strong>{" "}
            {new Date(product.user.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
