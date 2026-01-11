import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

// ✅ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, items, quantity, paymentOption }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/cart/add", {
        userId,
        items,
        quantity,
        paymentOption,
      });
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add to cart failed");
    }
  }
);

// ✅ Get Cart (POST instead of GET)
export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ userId, seller, buyerCategories }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/v1/cart/get`, { userId, seller, buyerCategories });
      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
); 

// ✅ Update Quantity - FIXED VERSION
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity, seller }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.put("/api/v1/cart/update", {
        userId,
        productId,
        quantity,
        seller,
      });
      console.log("Updated Cart Data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// ✅ Remove Item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ userId, productId, itemId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/v1/cart/remove", { data: { userId, productId, itemId  } });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Remove failed");
    }
  }
);

// ✅ Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/v1/cart/clear", { data: { userId } });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Clear failed");
    }
  }
);

// ✅ Update Payment Option
export const updatePaymentOption = createAsyncThunk(
  "cart/updatePaymentOption",
  async ({ userId, paymentOptionId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/cart/payment", {
        userId,
        paymentOptionId,
      });
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Payment update failed");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCartState: (state) => {
      state.success = false;
      state.error = null;
    },
    // ✅ NEW: Optimistic update for immediate UI response
    updateCartItemLocally: (state, action) => {
      const { productId, quantity } = action.payload;
      
      if (!state.cart) return;
      
      // Handle both array of carts and single cart
      if (Array.isArray(state.cart)) {
        // Multiple carts case
        state.cart.forEach(cart => {
          if (cart.items && Array.isArray(cart.items)) {
            const itemToUpdate = cart.items.find(item => 
              item.product?._id === productId || 
              item.product === productId ||
              item._id === productId
            );
            if (itemToUpdate) {
              itemToUpdate.quantity = quantity;
            }
          }
        });
      } else if (state.cart.items && Array.isArray(state.cart.items)) {
        // Single cart case
        const itemToUpdate = state.cart.items.find(item => 
          item.product?._id === productId || 
          item.product === productId ||
          item._id === productId
        );
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }
      }
    },
    // ✅ NEW: Preserve cart structure during updates
    preserveCartData: (state, action) => {
      // This action can be used to manually preserve cart data if needed
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Add Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.success = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Cart - FIXED VERSION
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        
        const updatedData = action.payload.cart || action.payload.data || action.payload;
        
        if (!updatedData) {
          console.error("No cart data in update response");
          return;
        }

        // If current cart is null or empty, just set the updated data
        if (!state.cart) {
          state.cart = updatedData;
          return;
        }

        // Handle merge logic for different cart structures
        if (Array.isArray(state.cart) && Array.isArray(updatedData)) {
          // Both are arrays - merge while preserving product data
          state.cart = state.cart.map(existingCart => {
            const updatedCart = updatedData.find(updated => 
              updated._id === existingCart._id || updated.user === existingCart.user
            );
            
            if (updatedCart && updatedCart.items) {
              return {
                ...existingCart,
                ...updatedCart,
                items: updatedCart.items.map(updatedItem => {
                  // Find existing item to preserve product data
                  const existingItem = existingCart.items?.find(exItem => 
                    exItem._id === updatedItem._id || 
                    exItem.product?._id === updatedItem.product ||
                    exItem.product === updatedItem.product
                  );
                  
                  return {
                    ...updatedItem,
                    product: existingItem?.product || updatedItem.product
                  };
                })
              };
            }
            return existingCart;
          });
        } else if (state.cart.items && updatedData.items) {
          // Both are single cart objects with items
          state.cart = {
            ...state.cart,
            ...updatedData,
            items: updatedData.items.map(updatedItem => {
              const existingItem = state.cart.items.find(exItem => 
                exItem._id === updatedItem._id || 
                exItem.product?._id === updatedItem.product ||
                exItem.product === updatedItem.product
              );
              
              return {
                ...updatedItem,
                product: existingItem?.product || updatedItem.product
              };
            })
          };
        } else {
          // Fallback: use updated data as-is
          state.cart = updatedData;
        }
        
        state.success = true;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ✅ Remove Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedData = action.payload.cart || action.payload.data || action.payload;
        if (updatedData) {
          state.cart = updatedData;
        }
        state.success = true;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
        state.success = true;
      })

      // ✅ Update Payment Option
      .addCase(updatePaymentOption.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.success = true;
      });
  },
});

export const { resetCartState, updateCartItemLocally, preserveCartData } = cartSlice.actions;
export default cartSlice.reducer;