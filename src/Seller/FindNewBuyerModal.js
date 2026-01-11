import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuyerCategories } from "../redux/slices/buyerCategoriesSlice";
import { createBuyerSellerConnection, fetchBuyerConnections } from "../redux/slices/buyerNetworkSlice";
import axios from "../axiosInstance"; // website url get

const FindNewBuyerModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false); // Track API error

  const { categories: buyerCategories, loading: categoriesLoading } =
    useSelector((state) => state.buyerCategories);

  useEffect(() => {
    if (open) {
      dispatch(getAllBuyerCategories());
      // Reset state when modal opens
      setEmailOrPhone("");
      setCategory("");
      setUserNotFound(false);
    }
  }, [dispatch, open]);

  // const handleSubmit = async () => {
  //   if (!emailOrPhone || !category) return;

  //   setLoading(true);
  //   setUserNotFound(false);

  //   const isEmail = emailOrPhone.includes("@");
  //   const payload = {
  //     buyerEmail: isEmail ? emailOrPhone : null,
  //     buyerPhone: !isEmail ? emailOrPhone : null,
  //     buyerCategory: category,
  //   };

  //   try {
  //     const resultAction = await dispatch(createBuyerSellerConnection(payload));

  //     if (createBuyerSellerConnection.fulfilled.match(resultAction)) {
  //       // console.log("Connection created:", resultAction.payload);
  //       onClose();
  //     } else {
  //       // Check if error is "user not found" type
  //       if (
  //         resultAction.payload ||
  //         resultAction.payload("No user found with the given email or phone")
  //       ) {
  //         setUserNotFound(true);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error submitting:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async () => {
  if (!emailOrPhone || !category) return;

  setLoading(true);
  setUserNotFound(false);

  const isEmail = emailOrPhone.includes("@");
  const payload = {
    buyerEmail: isEmail ? emailOrPhone : null,
    buyerPhone: !isEmail ? emailOrPhone : null,
    buyerCategory: category,
  };

  try {
    const resultAction = await dispatch(createBuyerSellerConnection(payload));

    if (createBuyerSellerConnection.fulfilled.match(resultAction)) {
      // Refresh buyers to avoid duplicate in pending requests
      dispatch(fetchBuyerConnections()); // ✅ refresh list
      onClose();
    } else {
      if (
        resultAction.payload ||
        resultAction.payload === "No user found with the given email or phone"
      ) {
        setUserNotFound(true);
      }
    }
  } catch (err) {
    console.error("Error submitting:", err);
  } finally {
    setLoading(false);
  }
};

  const handleWhatsAppSend = () => {
    const input = emailOrPhone.trim();
    const digitsOnly = input.replace(/\D/g, "");
   const websiteLink = `${axios?.defaults?.baseURL}/login`;
    const messageText = `Hi, please create a new account on our website.\nYou can register and login here: ${websiteLink}`;

    const encodedMessage = encodeURIComponent(messageText);
    let whatsappUrl = "";

    // Check if input is valid phone number (10-15 digits)
    if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
      // Add country code if missing (e.g., India +91)
      const countryCode = digitsOnly.length === 10 ? "91" : "";
      whatsappUrl = `https://wa.me/${countryCode}${digitsOnly}?text=${encodedMessage}`;
    } else {
      // Open generic WhatsApp with pre-filled message
      whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    }

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: { xs: "90%", sm: 420 },
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2, textAlign: "center" }}
        >
          Find New Buyer
        </Typography>

        {/* Email / Phone Field */}
        <TextField
          fullWidth
          label="Email or Phone Number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Category Dropdown */}
        <TextField
          select
          fullWidth
          label="Select Buyer Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 3 }}
        >
          {categoriesLoading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : buyerCategories && buyerCategories.length > 0 ? (
            buyerCategories
              .filter((cat) => cat.name.toLowerCase() !== "kiosk")
              .map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))
          ) : (
            <MenuItem disabled>No categories found</MenuItem>
          )}
        </TextField>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#3066be",
            borderRadius: 2,
            fontWeight: 600,
            fontSize: 15,
            py: 1.2,
            "&:hover": { bgcolor: "#2959a6" },
            mb: userNotFound ? 1.5 : 0, // spacing if WhatsApp button shows
          }}
          onClick={handleSubmit}
          disabled={loading || !emailOrPhone || !category}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Submit"
          )}
        </Button>

        {/* WhatsApp Button if user not found */}
        {userNotFound && (
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#25D366",
              color: "#25D366",
              fontWeight: 600,
              fontSize: 15,
              py: 1.2,
              "&:hover": {
                bgcolor: "#e6f9ed",
                borderColor: "#25D366",
              },
            }}
            onClick={handleWhatsAppSend}
          >
            Send via WhatsApp
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default FindNewBuyerModal;
