// import React, { createContext, useContext, useState, useMemo } from "react";

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const found = prev.find((item) => item.name === product.name);
//       if (found) {
//         return prev.map((item) =>
//           item.name === product.name ? { ...item, qty: item.qty + 1 } : item
//         );
//       } else {
//         return [...prev, { ...product, qty: 1 }];
//       }
//     });
//   };

//   const setQty = (name, qty) => {
//     setCart((prev) =>
//       prev.map((item) => (item.name === name ? { ...item, qty } : item))
//     );
//   };

//   const removeFromCart = (name) => {
//     setCart((prev) => prev.filter((item) => item.name !== name));
//   };

//   // Calculate total items count
//   const cartCount = useMemo(
//     () => cart.reduce((acc, item) => acc + item.qty, 0),
//     [cart]
//   );

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, setQty, removeFromCart, cartCount }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }


// import React, { createContext, useContext, useState, useMemo } from "react";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [carts, setCarts] = useState({}); 
//   // structure: { [sellerId]: [items...] }

//   const addToCart = (product) => {
//     const sellerId = product.user?._id || product.userId;
//     if (!sellerId) return console.error("Seller ID missing from product");

//     setCarts((prev) => {
//       const sellerCart = prev[sellerId] || [];
//       const found = sellerCart.find((item) => item._id === product._id);

//       const updatedCart = found
//         ? sellerCart.map((i) =>
//             i._id === product._id ? { ...i, qty: i.qty + 1 } : i
//           )
//         : [...sellerCart, { ...product, qty: 1 }];

//       return { ...prev, [sellerId]: updatedCart };
//     });
//   };

//   const setQty = (sellerId, productId, qty) => {
//     setCarts((prev) => ({
//       ...prev,
//       [sellerId]: prev[sellerId].map((i) =>
//         i._id === productId ? { ...i, qty } : i
//       ),
//     }));
//   };

//   const removeFromCart = (sellerId, productId) => {
//     setCarts((prev) => ({
//       ...prev,
//       [sellerId]: prev[sellerId].filter((i) => i._id !== productId),
//     }));
//   };

//   const cartCount = useMemo(() => {
//     return Object.values(carts)
//       .flat()
//       .reduce((acc, i) => acc + i.qty, 0);
//   }, [carts]);

//   return (
//     <CartContext.Provider
//       value={{ carts, addToCart, setQty, removeFromCart, cartCount }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosInstance";
import { useSelector } from "react-redux"; // assuming user info is stored in redux

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user); 
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧾 Fetch Cart
  const fetchCart = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/cart/${user._id}`);
      if (res.data.success) setCart(res.data.cart);
      else setCart(null);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add to Cart
  const addToCart = async (productId, quantity = 1, paymentOption) => {
    try {
      const res = await axios.post("/api/v1/cart/add", {
        userId: user._id,
        productId,
        quantity,
        paymentOption,
      });
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // 🔄 Update Item Quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put("/api/v1/cart/update", {
        userId: user._id,
        productId,
        quantity,
      });
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // ❌ Remove Item
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete("/api/v1/cart/remove", {
        data: { userId: user._id, productId },
      });
      if (res.data.success) setCart(res.data.cart || null);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // 🧹 Clear Cart
  const clearCart = async () => {
    try {
      const res = await axios.delete("/api/v1/cart/clear", {
        data: { userId: user._id },
      });
      if (res.data.success) setCart(null);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?._id]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
