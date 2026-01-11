// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   IconButton,
//   Select,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   Paper,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { useCart } from "./CartContext";

// const GST_PERCENT = 0.18;
// const CASH_DISCOUNT = 0.05;

// export default function CartPage() {
//   const { cart, setQty, removeFromCart } = useCart();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [payment, setPayment] = useState("cash");

//   let total = cart?.reduce((sum, item) => {
//     const subtotal = item.price * item.qty;
//     const gst = Math.round(subtotal * GST_PERCENT);
//     return sum + subtotal + gst;
//   }, 0);

//   let discount = payment === "cash" ? Math.floor(total * CASH_DISCOUNT) : 0;
//   let grandTotal = total - discount;

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "100vh",
//         background: "#f8fafc",
//         px: { xs: 2, sm: 4, md: 7, lg: 12 },
//         py: { xs: 2, sm: 4, md: 5 },
//         boxSizing: "border-box",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: "100%",
//           maxWidth: 1100,
//           borderRadius: 4,
//           mx: "auto",
//           my: 1,
//           p: { xs: 1.5, sm: 4, md: 6 },
//           minHeight: 350,
//           boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
//         }}
//       >
//         <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
//           Cart
//         </Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Original Price</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>
//                   Price + GST = Total
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cart?.map((item) => {
//                 const subtotal = item.price * item.qty;
//                 const gst = Math.round(subtotal * GST_PERCENT);
//                 return (
//                   <TableRow key={item.name}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell>₹{item.price}</TableCell>
//                     <TableCell>₹{item.price * item.qty}</TableCell>
//                     <TableCell>
//                       ₹{item.price * item.qty} + {Math.round(GST_PERCENT * 100)}
//                       % = <b>₹{subtotal + gst}</b>
//                       <span
//                         style={{ color: "#666", fontSize: 13, fontWeight: 400 }}
//                       >
//                         {" "}
//                         (Price + GST)
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton
//                         disabled={item.qty === 1}
//                         sx={{
//                           background: item.qty === 1 ? "#ccc" : "#eee",
//                           color: "#474747",
//                           mx: 0.5,
//                           "&:hover":
//                             item.qty === 1 ? {} : { background: "#ddd" },
//                           width: 32,
//                           height: 32,
//                         }}
//                         onClick={() =>
//                           item.qty > 1 && setQty(item.name, item.qty - 1)
//                         }
//                       >
//                         <Remove />
//                       </IconButton>
//                       <Typography
//                         component="span"
//                         sx={{
//                           mx: 1.1,
//                           display: "inline-block",
//                           minWidth: 18,
//                           textAlign: "center",
//                         }}
//                       >
//                         {item.qty}
//                       </Typography>
//                       <IconButton
//                         sx={{
//                           background: "#2961e1",
//                           color: "#fff",
//                           mx: 0.5,
//                           "&:hover": { background: "#1146aa" },
//                           width: 32,
//                           height: 32,
//                         }}
//                         onClick={() => setQty(item.name, item.qty + 1)}
//                       >
//                         <Add />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         sx={{
//                           background: "#3066be",
//                           color: "#22364a",
//                           fontWeight: 700,
//                           px: 2,
//                           fontSize: 15,
//                           textTransform: "none",
//                           "&:hover": { background: "#3066be" },
//                         }}
//                         onClick={() => removeFromCart(item.name)}
//                       >
//                         Remove
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {/* Bottom summary */}
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           alignItems={isMobile ? "flex-start" : "center"}
//           justifyContent={isMobile ? "flex-start" : "flex-end"}
//           gap={2}
//           mt={4}
//           flexWrap="wrap"
//         >
//           <Box flex={1}>
//             <Typography sx={{ color: "#2961e1", fontWeight: 700, mb: 0.7 }}>
//               Payment Type:{" "}
//               <span style={{ color: "#00923f" }}>
//                 {payment}
//                 {payment === "cash" && (
//                   <>
//                     {" "}
//                     <span style={{ color: "#059b37" }}>
//                       (Discount 5% Applied)
//                     </span>
//                   </>
//                 )}
//               </span>
//             </Typography>
//             <Select
//               value={payment}
//               sx={{
//                 minWidth: 100,
//                 background: "#fff",
//                 borderRadius: 1,
//                 mt: 0.5,
//               }}
//               onChange={(e) => setPayment(e.target.value)}
//             >
//               <MenuItem value="cash">Cash</MenuItem>
//               <MenuItem value="credit">Credit</MenuItem>
//               <MenuItem value="upi">UPI</MenuItem>
//             </Select>
//           </Box>
//           <Box
//             flex={1}
//             display={isMobile ? "block" : "flex"}
//             flexDirection="column"
//             alignItems="flex-end"
//           >
//             <Typography
//               sx={{
//                 fontWeight: 700,
//                 color: "#2961e1",
//                 fontSize: { xs: 17, sm: 22 },
//                 mb: 1,
//                 textAlign: isMobile ? "left" : "right",
//               }}
//             >
//               Total: ₹{grandTotal}
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{
//                 background: "#3066be",
//                 color: "#22364a",
//                 fontWeight: 700,
//                 px: 4,
//                 py: 1.3,
//                 fontSize: 17,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 boxShadow: "none",
//                 "&:hover": { background: "#3066be" },
//               }}
//             >
//               Send Enquiry / purchase order
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   IconButton,
//   Select,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   Paper,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { useCart } from "./CartContext";

// const GST_PERCENT = 0.18;
// const CASH_DISCOUNT = 0.05;

// export default function CartPage() {
//   const { cart, updateQuantity, removeFromCart, fetchCart, loading } = useCart();

//   console.log("Cart in CartPage:", cart);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [payment, setPayment] = useState("cash");

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (!cart?.items || cart.items.length === 0)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "70vh",
//         }}
//       >
//         <Typography variant="h6">Your cart is empty 🛒</Typography>
//       </Box>
//     );

//   let total = cart.items.reduce((sum, item) => {
//     const subtotal = item.product.price * item.quantity;
//     const gst = Math.round(subtotal * GST_PERCENT);
//     return sum + subtotal + gst;
//   }, 0);

//   let discount = payment === "cash" ? Math.floor(total * CASH_DISCOUNT) : 0;
//   let grandTotal = total - discount;

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "100vh",
//         background: "#f8fafc",
//         px: { xs: 2, sm: 4, md: 7, lg: 12 },
//         py: { xs: 2, sm: 4, md: 5 },
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: "100%",
//           maxWidth: 1100,
//           borderRadius: 4,
//           mx: "auto",
//           my: 1,
//           p: { xs: 1.5, sm: 4, md: 6 },
//           minHeight: 350,
//           boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
//         }}
//       >
//         <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
//           Cart
//         </Typography>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Total (w/ GST)</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cart.items.map((item) => {
//                 const subtotal = item.product.price * item.quantity;
//                 const gst = Math.round(subtotal * GST_PERCENT);
//                 return (
//                   <TableRow key={item._id}>
//                     <TableCell>{item.product.name}</TableCell>
//                     <TableCell>₹{item.product.price}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         disabled={item.quantity === 1}
//                         onClick={() =>
//                           updateQuantity(item.product._id, item.quantity - 1)
//                         }
//                       >
//                         <Remove />
//                       </IconButton>
//                       {item.quantity}
//                       <IconButton
//                         onClick={() =>
//                           updateQuantity(item.product._id, item.quantity + 1)
//                         }
//                       >
//                         <Add />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       ₹{subtotal + gst}
//                       <Typography variant="caption">
//                         (Price + {Math.round(GST_PERCENT * 100)}% GST)
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => removeFromCart(item.product._id)}
//                       >
//                         Remove
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Summary */}
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           mt={4}
//         >
//           <Box>
//             <Typography sx={{ color: "#2961e1", fontWeight: 700 }}>
//               Payment Type:
//             </Typography>
//             <Select
//               value={payment}
//               onChange={(e) => setPayment(e.target.value)}
//               sx={{ minWidth: 120, mt: 1 }}
//             >
//               <MenuItem value="cash">Cash</MenuItem>
//               <MenuItem value="credit">Credit</MenuItem>
//               <MenuItem value="upi">UPI</MenuItem>
//             </Select>
//           </Box>
//           <Box textAlign={isMobile ? "left" : "right"}>
//             <Typography fontWeight={700} color="#2961e1" fontSize={22}>
//               Total: ₹{grandTotal}
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 1,
//                 background: "#3066be",
//                 color: "#fff",
//                 textTransform: "none",
//               }}
//             >
//               Send Enquiry / Purchase Order
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   IconButton,
//   Select,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   Paper,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart, updateCart, removeCartItem } from "../redux/slices/cartSlice";
// import { useLocation } from "react-router-dom";

// const GST_PERCENT = 0.18;
// const CASH_DISCOUNT = 0.05;

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const location = useLocation();
//   const { sellerIds = [], buyerCategories = [] } = location.state || {};
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { cart, loading } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const [payment, setPayment] = useState("cash");

//   // Fetch cart using seller IDs passed from ViewProducts
//   useEffect(() => {
//   if (user?._id && sellerIds.length > 0) {
//     dispatch(getCart({ userId: user._id, seller: sellerIds, buyerCategories }));
//   }
// }, [dispatch, user?._id, sellerIds, buyerCategories]);

//   if (loading)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "70vh",
//         }}
//       >
//         <Typography variant="h6">Loading your cart...</Typography>
//       </Box>
//     );

//   if (!cart || cart.length === 0)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "70vh",
//         }}
//       >
//         <Typography variant="h6">Your cart is empty 🛒</Typography>
//       </Box>
//     );

//   // Calculate totals
//   let total = cart?.reduce((sum, item) => {
//     const subtotal = item.product.price * item.quantity;
//     const gst = Math.round(subtotal * GST_PERCENT);
//     return sum + subtotal + gst;
//   }, 0);

//   let discount = payment === "cash" ? Math.floor(total * CASH_DISCOUNT) : 0;
//   let grandTotal = total - discount;

//   const handleQuantityChange = (productId, newQty) => {
//     if (newQty < 1) return;
//     dispatch(updateCart({ userId: user._id, productId, quantity: newQty }));
//   };

//   const handleRemove = (productId) => {
//     dispatch(removeCartItem({ userId: user._id, productId }));
//   };

//   return (
//     <Box
//       sx={{
//         // width: "100%",
//         minHeight: "100vh",
//         background: "#f8fafc",
//         px: { xs: 2, sm: 4, md: 7, lg: 12 },
//         py: { xs: 2, sm: 4, md: 5 },
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: "100%",
//           maxWidth: 1100,
//           borderRadius: 4,
//           mx: "auto",
//           my: 1,
//           p: { xs: 1.5, sm: 4, md: 6 },
//           minHeight: 350,
//           boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
//         }}
//       >
//         <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
//           Cart
//         </Typography>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Total (w/ GST)</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* {cart.items.map((item) => { */}
//               {cart.map((item) => {
//                 const subtotal = item.product.price * item.quantity;
//                 const gst = Math.round(subtotal * GST_PERCENT);
//                 return (
//                   <TableRow key={item._id}>
//                     <TableCell>{item.product.name}</TableCell>
//                     <TableCell>₹{item.product.price}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         disabled={item.quantity === 1}
//                         onClick={() =>
//                           handleQuantityChange(
//                             item.product._id,
//                             item.quantity - 1
//                           )
//                         }
//                       >
//                         <Remove />
//                       </IconButton>
//                       {item.quantity}
//                       <IconButton
//                         onClick={() =>
//                           handleQuantityChange(
//                             item.product._id,
//                             item.quantity + 1
//                           )
//                         }
//                       >
//                         <Add />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       ₹{subtotal + gst}
//                       <Typography variant="caption">
//                         (Price + {Math.round(item.product.category.gst * 100)}%
//                         GST)
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleRemove(item.product._id)}
//                       >
//                         Remove
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Summary */}
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           mt={4}
//         >
//           <Box>
//             <Typography sx={{ color: "#2961e1", fontWeight: 700 }}>
//               Payment Type:
//             </Typography>
//             <Select
//               value={payment}
//               onChange={(e) => setPayment(e.target.value)}
//               sx={{ minWidth: 120, mt: 1 }}
//             >
//               <MenuItem value="cash">Cash</MenuItem>
//               <MenuItem value="credit">Credit</MenuItem>
//               <MenuItem value="upi">UPI</MenuItem>
//             </Select>
//           </Box>
//           <Box textAlign={isMobile ? "left" : "right"}>
//             <Typography fontWeight={700} color="#2961e1" fontSize={22}>
//               Total: ₹{grandTotal}
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 1,
//                 background: "#3066be",
//                 color: "#fff",
//                 textTransform: "none",
//               }}
//             >
//               Send Enquiry / Purchase Order
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   IconButton,
//   Select,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   Paper,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart, updateCart, removeCartItem } from "../redux/slices/cartSlice";
// import { useLocation } from "react-router-dom";

// const CASH_DISCOUNT = 0.05;

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const location = useLocation();
//   const { sellerIds = [], buyerCategories = [] } = location.state || {};
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { cart, loading } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const [payment, setPayment] = useState("cash");

//   console.log("Cart in CartPage:", cart);

//   // Fetch cart
//   useEffect(() => {
//     if (user?._id && sellerIds.length > 0) {
//       dispatch(
//         getCart({ userId: user._id, seller: sellerIds, buyerCategories })
//       );
//     }
//   }, [dispatch, user?._id, sellerIds, buyerCategories]);

//   if (loading)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "70vh",
//         }}
//       >
//         <Typography variant="h6">Loading your cart...</Typography>
//       </Box>
//     );

//   // if (!cart || !cart.items || cart.items.length === 0)
//   if (!cart || cart.length === 0)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "70vh",
//         }}
//       >
//         <Typography variant="h6">Your cart is empty 🛒</Typography>
//       </Box>
//     );

//   // Calculate totals
//   // let total = cart.items.reduce((sum, item) => {
//   let total = cart?.reduce((sum, item) => {
//     const product = item?.product;

//     // ✅ 1. Price from productVisibility (fallback to product.price if missing)
//     const basePrice =
//       product?.productVisibility?.[0]?.price ||
//       product.price ||
//       product.mrp ||
//       0;

//     // ✅ 2. GST percentage (convert string "30" → 30)
//     const gstPercent = product?.category?.gst
//       ? Number(product.category.gst)
//       : 0;

//     // ✅ 3. Apply GST on basePrice
//     const gstAmount = (basePrice * gstPercent) / 100;

//     // ✅ 4. Total with GST × quantity
//     const totalWithGst = (basePrice + gstAmount) * item.quantity;

//     return sum + totalWithGst;
//   }, 0);

//   // ✅ 5. Apply cash discount if selected
//   let discount = payment === "cash" ? Math.floor(total * CASH_DISCOUNT) : 0;
//   let grandTotal = total - discount;

//   // 🔄 Quantity change
//   const handleQuantityChange = (productId, newQty) => {
//     if (newQty < 1) return;
//     dispatch(updateCart({ userId: user?._id, productId, quantity: newQty }));
//   };

//   // ❌ Remove item
//   const handleRemove = (productId) => {
//     dispatch(removeCartItem({ userId: user?._id, productId }));
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         px: { xs: 2, sm: 4, md: 7, lg: 12 },
//         py: { xs: 2, sm: 4, md: 5 },
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: "100%",
//           maxWidth: 1100,
//           borderRadius: 4,
//           mx: "auto",
//           my: 1,
//           p: { xs: 1.5, sm: 4, md: 6 },
//           minHeight: 350,
//           boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
//         }}
//       >
//         <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
//           Cart
//         </Typography>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Total (w/ GST)</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cart.map((item) => {
//                 const product = item.product;
//                 const basePrice =
//                   product.productVisibility?.[0]?.price ||
//                   product.price ||
//                   product.mrp ||
//                   0;
//                 const gstPercent = product.category?.gst
//                   ? Number(product.category.gst)
//                   : 0;
//                 const gstAmount = (basePrice * gstPercent) / 100;
//                 const totalWithGst = (basePrice + gstAmount) * item.quantity;

//                 return (
//                   <TableRow key={item._id}>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>₹{basePrice.toLocaleString()}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         disabled={item.quantity === 1}
//                         onClick={() =>
//                           handleQuantityChange(product._id, item.quantity - 1)
//                         }
//                       >
//                         <Remove />
//                       </IconButton>
//                       {item.quantity}
//                       <IconButton
//                         onClick={() =>
//                           handleQuantityChange(product._id, item.quantity + 1)
//                         }
//                       >
//                         <Add />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       ₹{totalWithGst.toLocaleString()}
//                       <Typography variant="caption">
//                         (Incl. {gstPercent}% GST)
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleRemove(product._id)}
//                       >
//                         Remove
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* 🧾 Summary Section */}
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           mt={4}
//         >
//           <Box>
//             <Typography sx={{ color: "#2961e1", fontWeight: 700 }}>
//               Payment Type:
//             </Typography>
//             <Select
//               value={payment}
//               onChange={(e) => setPayment(e.target.value)}
//               sx={{ minWidth: 120, mt: 1 }}
//             >
//               <MenuItem value="cash">Cash</MenuItem>
//               <MenuItem value="credit">Credit</MenuItem>
//             </Select>
//           </Box>

//           {/* <Box textAlign={isMobile ? "left" : "right"}>
//             <Typography fontWeight={700} color="#2961e1" fontSize={22}>
//               Total: ₹{grandTotal.toLocaleString()}
//             </Typography>
//             {discount > 0 && (
//               <Typography variant="caption" color="green">
//                 (Includes ₹{discount.toLocaleString()} cash discount)
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 1,
//                 background: "#3066be",
//                 color: "#fff",
//                 textTransform: "none",
//               }}
//             >
//               Send Enquiry / Purchase Order
//             </Button>
//           </Box> */}
//           <Box textAlign={isMobile ? "left" : "right"}>
//             <Typography fontWeight={700} color="#2961e1" fontSize={22}>
//               Total: ₹{grandTotal.toLocaleString()}
//             </Typography>
//             {discount > 0 && (
//               <Typography
//                 variant="caption"
//                 color="green"
//                 display="block"
//                 mb={0.5} // small spacing below the discount line
//               >
//                 (Includes ₹{discount.toLocaleString()} cash discount)
//               </Typography>
//             )}

//             <Button
//               variant="contained"
//               sx={{
//                 mt: 1.5,
//                 background: "#3066be",
//                 color: "#fff",
//                 textTransform: "none",
//               }}
//             >
//               Send Enquiry / Purchase Order
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   IconButton,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   useTheme,
//   useMediaQuery,
//   Paper,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart, updateCart, removeCartItem } from "../redux/slices/cartSlice";
// import { getPaymentOptionByBuyer } from "../redux/slices/paymentOptionSlice"; // ✅ new import
// import { useLocation } from "react-router-dom";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const location = useLocation();
//   const { sellerIds = [], buyerCategories = [] } = location.state || {};
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { cart, loading } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const { items: paymentOptions } = useSelector(
//     (state) => state.paymentOptions
//   );

//   const [payment, setPayment] = useState(""); // "cash" | "credit" | ""
//   const [discountPercent, setDiscountPercent] = useState(0);

//   // 🔹 Fetch cart
//   useEffect(() => {
//     if (user?._id && sellerIds.length > 0) {
//       dispatch(
//         getCart({ userId: user._id, seller: sellerIds, buyerCategories })
//       );
//     }
//   }, [dispatch, user?._id, sellerIds, buyerCategories]);

//   // 🔹 Fetch payment options by buyer + seller
//   useEffect(() => {
//     if (buyerCategories?.[0] && sellerIds?.[0]) {
//       dispatch(
//         getPaymentOptionByBuyer({
//           buyerCategory: buyerCategories[0],
//           seller: sellerIds[0],
//         })
//       );
//     }
//   }, [dispatch, buyerCategories, sellerIds]);

//   // 🔹 When API response arrives, set default payment type & discount
//   useEffect(() => {
//     if (paymentOptions && paymentOptions.length > 0) {
//       const option = paymentOptions[0]; // assuming one per buyer+seller
//       if (option.paymentType === "Cash") {
//         setPayment("cash");
//         setDiscountPercent(option.cashPayment?.discountPercent || 0);
//       } else if (option.paymentType === "Credit") {
//         setPayment("credit");
//         setDiscountPercent(0);
//       } else {
//         // Both available or invalid type
//         setPayment("");
//         setDiscountPercent(0);
//       }
//     }
//   }, [paymentOptions]);

//   if (loading)
//     return (
//       <Box display="flex" alignItems="center" justifyContent="center" minHeight="70vh">
//         <Typography variant="h6">Loading your cart...</Typography>
//       </Box>
//     );

//       //  const cartItems = cart?.cart || [];
//       // Safe extraction
// const cartItems =
//   Array.isArray(cart)
//     ? cart
//     : Array.isArray(cart?.cart)
//     ? cart.cart
//     : Array.isArray(cart?.data)
//     ? cart.data
//     : [];

//     console.log("Cart Items in CartPage 1:", cartItems);

//     const cartItemsNew = Array.isArray(cart?.items) ? cart.items : [];
//     console.log("Cart Items in CartPage 2:", cartItemsNew);

//   if (!Array.isArray(cartItems) || cartItems.length === 0)
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "70vh",
//       }}
//     >
//       <Typography variant="h6">Your cart is empty 🛒</Typography>
//     </Box>
//   );

// let total = cartItems.reduce((sum, item) => {
//   const basePrice =
//     item?.product?.productVisibility?.[0]?.price ||
//     item?.product?.price ||
//     item?.product?.mrp ||
//     item?.mrp ||
//     0;

//   const gstAmount = item?.gstAmount || 0;
//   const totalWithGst = (basePrice + gstAmount) * item.quantity;
//   return sum + totalWithGst;
// }, 0);

//   // 🔹 Apply dynamic discount
//   const discount = payment === "cash" ? Math.floor((total * discountPercent) / 100) : 0;
//   const grandTotal = total - discount;

//   const handleQuantityChange = (productId, newQty, seller) => {
//     if (newQty < 1) return;
//     dispatch(updateCart({ userId: user?._id, productId, quantity: newQty, seller }));
//   };

//   const handleRemove = (productId) => {
//     dispatch(removeCartItem({ userId: user?._id, productId }));
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         px: { xs: 2, sm: 4, md: 7, lg: 12 },
//         py: { xs: 2, sm: 4, md: 5 },
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: "100%",
//           maxWidth: 1100,
//           borderRadius: 4,
//           mx: "auto",
//           my: 1,
//           p: { xs: 1.5, sm: 4, md: 6 },
//           minHeight: 350,
//           boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
//         }}
//       >
//         <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
//           Cart
//         </Typography>

//         {/* 🧾 Payment Type Selection */}
//         <Box mb={3}>
//           <Typography sx={{ color: "#2961e1", fontWeight: 700 }}>
//             Payment Type:
//           </Typography>
//           <RadioGroup
//             row
//             value={payment}
//             onChange={(e) => setPayment(e.target.value)}
//           >
//             <FormControlLabel value="cash" control={<Radio />} label="Cash" />
//             <FormControlLabel value="credit" control={<Radio />} label="Credit" />
//           </RadioGroup>
//         </Box>

//         {/* 🧾 Cart Table */}
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Total (w/ GST)</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cart.map((item) => {
//                 const product = item.product;
//                 const basePrice =
//                   product.productVisibility?.[0]?.price ||
//                   product.price ||
//                   product.mrp ||
//                   0;
//                 const gstPercent = product.category?.gst
//                   ? Number(product.category.gst)
//                   : 0;
//                 const gstAmount = (basePrice * gstPercent) / 100;
//                 const totalWithGst = (basePrice + gstAmount) * item.quantity;

//                 return (
//                   <TableRow key={item._id}>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>₹{basePrice.toLocaleString()}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         disabled={item.quantity === 1}
//                         onClick={() =>
//                           handleQuantityChange(product._id, item.quantity - 1, product.user._id )
//                         }
//                       >
//                         <Remove />
//                       </IconButton>
//                       {item.quantity}
//                       <IconButton
//                         onClick={() =>
//                           handleQuantityChange(product._id, item.quantity + 1, product.user._id )
//                         }
//                       >
//                         <Add />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       ₹{totalWithGst.toLocaleString()}
//                       <Typography variant="caption">
//                         (Incl. {gstPercent}% GST)
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleRemove(product._id)}
//                       >
//                         Remove
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* 💰 Summary */}
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           mt={4}
//         >
//           <Box textAlign={isMobile ? "left" : "right"}>
//             <Typography fontWeight={700} color="#2961e1" fontSize={22}>
//               Total: ₹{grandTotal.toLocaleString()}
//             </Typography>
//             {discount > 0 && (
//               <Typography variant="caption" color="green" display="block" mb={0.5}>
//                 (Includes ₹{discount.toLocaleString()} cash discount @ {discountPercent}%)
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 1.5,
//                 background: "#3066be",
//                 color: "#fff",
//                 textTransform: "none",
//               }}
//             >
//               Send Enquiry / Purchase Order
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  useMediaQuery,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCart,
  removeCartItem,
  updateCartItemLocally,
} from "../redux/slices/cartSlice";
import { getPaymentOptionByBuyer } from "../redux/slices/paymentOptionSlice";
import { useLocation } from "react-router-dom";
import { createOrder } from "../redux/slices/ordersSlice";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function CartPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const { userId, sellerIds = [], buyerCategories = [] } = location.state || {};
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { cart, loading, error } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);
  const { items: paymentOptions } = useSelector(
    (state) => state.paymentOptions
  );


  const [payment, setPayment] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [updatingItems, setUpdatingItems] = useState(new Set()); // Track updating items

  // 🔹 Fetch cart
  useEffect(() => {
    if (user?._id && sellerIds.length > 0) {
      dispatch(
        getCart({ userId: user._id, seller: sellerIds, buyerCategories })
      );
    }
  }, [dispatch, user?._id, sellerIds, buyerCategories]);

  // 🔹 Fetch payment options
  useEffect(() => {
    if (buyerCategories?.[0] && sellerIds?.[0]) {
      dispatch(
        getPaymentOptionByBuyer({
          buyerCategory: buyerCategories[0],
          seller: sellerIds[0],
        })
      );
    }
  }, [dispatch, buyerCategories, sellerIds]);

  // 🔹 Set payment type
  useEffect(() => {
    if (paymentOptions[0]?.paymentType === "Cash") {
      setPayment("cash");
      setDiscountPercent(paymentOptions[0]?.cashPayment?.discountPercent || 0);
    } else if (paymentOptions[0]?.paymentType === "Credit") {
      setPayment("credit");
      setDiscountPercent(0);
    } else if (paymentOptions[0]?.paymentType === "Both") {
      // Default to cash if both are allowed
      setPayment("cash");
      setDiscountPercent(paymentOptions[0]?.cashPayment?.discountPercent || 0);
    }
  }, [paymentOptions]);

  // Safe cart items extraction with better product data handling
  const cartItems = React.useMemo(() => {
    if (!cart) return [];

    let items = [];

    if (Array.isArray(cart)) {
      // If cart is array of items
      items = cart;
    } else if (Array.isArray(cart.cart)) {
      // If cart has cart array
      items = cart.cart;
    } else if (Array.isArray(cart.data)) {
      // If cart has data array
      items = cart.data;
    } else if (cart.items && Array.isArray(cart.items)) {
      // If cart has items array
      items = cart.items;
    } else if (Array.isArray(cart)) {
      // If it's already an array of carts with items
      items = cart.flatMap((cart) => cart.items || []);
    }

    return items;
  }, [cart]);

  // Get complete product data from item
  const getProductData = (item) => {
    // If item has full product object
    if (item.product && typeof item.product === "object" && item.product.name) {
      return item.product;
    }

    // If product is just an ID, try to find it in all cart items
    if (typeof item.product === "string" || item.productId) {
      const productId = item.product || item.productId;
      const itemWithProduct = cartItems.find(
        (cartItem) =>
          (cartItem.product?._id === productId ||
            cartItem.product === productId) &&
          cartItem.product &&
          typeof cartItem.product === "object" &&
          cartItem.product.name
      );

      return (
        itemWithProduct?.product || { name: "Product", price: item.mrp || 0 }
      );
    }

    return { name: "Product", price: item.mrp || item.finalPrice || 0 };
  };

  // Calculate product price with fallbacks
  const getProductPrice = (item) => {
    const product = getProductData(item);

    const price =
      product?.productVisibility?.[0]?.price ||
      product?.price ||
      product?.mrp ||
      item?.mrp ||
      item?.finalPrice ||
      item?.discountPrice ||
      0;

    return Number(price);
  };

  // Calculate GST with fallbacks
  const getGstPercent = (item) => {
    const product = getProductData(item);

    const gst = product?.category?.gst || product?.gst || item?.gstPercent || 0;

    return Number(gst);
  };

  // Get product name with fallbacks
  const getProductName = (item) => {
    const product = getProductData(item);
    return product?.name || item?.productName || "Product";
  };

  // Get product ID for operations
  const getProductId = (item) => {
    return item.product?._id || item.product || item.productId;
  };

  // Get seller ID for operations
  const getSellerId = (item) => {
    return item.product?.user?._id || item.seller || sellerIds[0];
  };

  const handleQuantityChange = async (item, newQty) => {
    if (newQty < 1) return;

    const productId = getProductId(item);
    const seller = getSellerId(item);

    if (!productId) {
      setSnackbar({
        open: true,
        message: "Product ID not found",
        severity: "error",
      });
      return;
    }

    // Optimistic update - update UI immediately
    setUpdatingItems((prev) => new Set(prev).add(productId));
    dispatch(updateCartItemLocally({ productId, quantity: newQty }));

    try {
      const result = await dispatch(
        updateCart({ userId: user?._id, productId, quantity: newQty, seller })
      ).unwrap();

      if (result.success) {
        setSnackbar({
          open: true,
          message: "Cart updated successfully!",
          severity: "success",
        });

        // Refresh cart to get complete updated data
        setTimeout(() => {
          dispatch(
            getCart({ userId: user._id, seller: sellerIds, buyerCategories })
          );
        }, 500);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update cart",
        severity: "error",
      });

      // Revert optimistic update on error
      dispatch(
        getCart({ userId: user._id, seller: sellerIds, buyerCategories })
      );
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // CartPage component mein handleRemove function update karein
  const handleRemove = async (item) => {
    try {
      const itemId = item._id;
      const productId = getProductId(item);

      const result = await dispatch(
        removeCartItem({
          userId: user?._id,
          itemId: itemId,
          productId: productId,
        })
      ).unwrap();

      if (result.success) {
        setSnackbar({
          open: true,
          message: "Item removed from cart!",
          severity: "success",
        });

        // Refresh cart data
        dispatch(
          getCart({ userId: user._id, seller: sellerIds, buyerCategories })
        );
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to remove item",
        severity: "error",
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Loading state
  if (loading && cartItems.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
      >
        <Typography variant="h6">Loading your cart...</Typography>
      </Box>
    );
  }

  // Empty state
  if (!loading && cartItems.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h6">Your cart is empty 🛒</Typography>
      </Box>
    );
  }

  // Calculate totals with proper price extraction
  const total = cartItems.reduce((sum, item) => {
    const basePrice = getProductPrice(item);
    const gstPercent = getGstPercent(item);
    const gstAmount = (basePrice * gstPercent) / 100;
    const priceWithGst = basePrice + gstAmount;
    const itemTotal = priceWithGst * item.quantity;

    return sum + itemTotal;
  }, 0);

  const discount =
    payment === "cash" ? Math.floor((total * discountPercent) / 100) : 0;
  const grandTotal = total - discount;

  const handleSendEnquiry = async () => {
    try {
      // await dispatch(createOrder()).unwrap();
      const seller = sellerIds?.[0]; 
      await dispatch(createOrder({ seller, selectPaymentType: payment === "cash" ? "Cash" : "Credit" })).unwrap();
      // Optional: refresh cart
      dispatch(
        getCart({ userId: user._id, seller: sellerIds, buyerCategories })
      );
      setSnackbar({
        open: true,
        message: "Enquiry / Purchase Order sent!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to send enquiry / purchase order",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: 4,
          mx: "auto",
          my: 1,
          p: { xs: 1.5, sm: 4, md: 6 },
          minHeight: 350,
          boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
        }}
      >
        <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
          Cart {loading && "(Updating...)"}
        </Typography>

        {/*  Payment Type Selection */}
        {/* <Box mb={3}>
          <Typography sx={{ color: "#2961e1", fontWeight: 700 }}>
            Payment Type:
          </Typography>
          <RadioGroup
            row
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit"
            />
          </RadioGroup>
        </Box> */}

        {/* Payment Type Selection */}
        <Box mb={3}>
          <Typography sx={{ color: "#2961e1", fontWeight: 700, mb: 1 }}>
            Payment Type:
          </Typography>

          <ToggleButtonGroup
            value={payment}
            exclusive
            onChange={(e, newValue) => {
              // Allow toggle change only if Both
              if (newValue && paymentOptions?.[0]?.paymentType === "Both") {
                setPayment(newValue);
                if (newValue === "cash") {
                  setDiscountPercent(
                    paymentOptions[0]?.cashPayment?.discountPercent || 0
                  );
                } else {
                  setDiscountPercent(0);
                }
              }
            }}
            disabled={paymentOptions?.[0]?.paymentType !== "Both"}
          >
            <ToggleButton value="cash">Cash</ToggleButton>
            <ToggleButton value="credit">Credit</ToggleButton>
          </ToggleButtonGroup>

          {paymentOptions?.[0]?.paymentType !== "Both" && (
            <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
              (Fixed by seller: {paymentOptions?.[0]?.paymentType})
            </Typography>
          )}
        </Box>

        {/* Cart Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total (w/ GST)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => {
                const basePrice = getProductPrice(item);
                const gstPercent = getGstPercent(item);
                const gstAmount = (basePrice * gstPercent) / 100;
                const priceWithGst = basePrice + gstAmount;
                const totalWithGst = priceWithGst * item.quantity;
                const productName = getProductName(item);
                const productId = getProductId(item);
                const isUpdating = updatingItems.has(productId);

                return (
                  <TableRow
                    key={item._id || productId}
                    sx={{ opacity: isUpdating ? 0.6 : 1 }}
                  >
                    <TableCell>
                      <Typography fontWeight={600}>{productName}</Typography>
                      {getProductData(item)?.category?.name && (
                        <Typography variant="caption" color="textSecondary">
                          Category: {getProductData(item).category.name}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>
                        ₹{basePrice.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        (GST: {gstPercent}%)
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          size="small"
                          disabled={item.quantity <= 1 || isUpdating}
                          onClick={() =>
                            handleQuantityChange(item, item.quantity - 1)
                          }
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography
                          fontWeight={600}
                          minWidth="30px"
                          textAlign="center"
                        >
                          {isUpdating ? "..." : item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          disabled={isUpdating}
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>
                        ₹{totalWithGst.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        display="block"
                      >
                        (₹{priceWithGst.toLocaleString()} × {item.quantity})
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRemove(item)}
                        disabled={loading || isUpdating}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 💰 Summary */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          mt={4}
          p={3}
          sx={{ backgroundColor: "#f8f9fa", borderRadius: 2 }}
        >
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Order Summary
            </Typography>
            <Typography>Subtotal: ₹{total.toLocaleString()}</Typography>
            {discount > 0 && (
              <Typography color="green">
                Discount: -₹{discount.toLocaleString()}
              </Typography>
            )}
            <Typography variant="h6" fontWeight={700} color="#2961e1" mt={1}>
              Grand Total: ₹{cart.total || grandTotal.toLocaleString()}
            </Typography>
          </Box>

          <Box mt={isMobile ? 2 : 0}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "#3066be",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                "&:hover": {
                  background: "#2955a3",
                },
              }}
              onClick={handleSendEnquiry}
            >
              Send Enquiry / Purchase Order
            </Button>
          </Box>
        </Box>

      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
