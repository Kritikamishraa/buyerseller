import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

const API = "/api/v1/order";

// Create Order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ seller, selectPaymentType, orderData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${API}/create`, {
        seller,
        selectPaymentType,
        ...orderData,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get Buyer Orders
export const getBuyerOrders = createAsyncThunk(
  "orders/getBuyerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${API}/buyer-orders`);
      return data.orders || data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get Seller Orders
export const getSellerOrders = createAsyncThunk(
  "orders/getSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${API}/seller-orders`);

      return data.orders || data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Order Status (Seller)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, orderStatus, seller }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`${API}/${id}`, { orderStatus, seller });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Process Step
// export const updateProcessStep = createAsyncThunk(
//   "orders/updateProcessStep",
//   async ({ orderId, step }, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.patch(
//         `${API}/${orderId}/process-step`,
//         { step }
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// Delete Order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`${API}/${id}`);
      return { id, ...data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update Process Step (Buyer/Seller Action)
export const updateProcessStep = createAsyncThunk(
  "orders/updateProcessStep",
  async ({ orderId, step, actionBy }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${API}/update-process-step`, {
        orderId,
        step,
        actionBy,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
 
// Update Item Quantity in Order
export const updateItemQuantity = createAsyncThunk(
  "orders/updateItemQuantity",
  async ({ orderId, items }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${API}/update-item-quantity`, {
        orderId,
        items,
      });

      return data.order; // controller returns { success, order }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const updateItemQuantity = createAsyncThunk(
//   "orders/updateItemQuantity",
//   async ({ orderId, items }, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.post(`${API}/update-item-quantity`, {
//         orderId,
//         items,
//       });

//       return data.order;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


// Slice for Orders
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    tabs: [
      { label: "All", filter: () => true },
      { label: "Pending", filter: (o) => o.status === "Pending" },
      { label: "Processing", filter: (o) => o.status === "Processing" },
      { label: "Completed", filter: (o) => o.status === "Completed" },
      { label: "Cancelled", filter: (o) => o.status === "Cancelled" },
    ],
    activeTabIndex: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveTab(state, action) {
      state.activeTabIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Buyer Orders
      .addCase(getBuyerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBuyerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getBuyerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Seller Orders
      .addCase(getSellerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) state.orders[index] = action.payload;
      })

      // Update Process Step
      // .addCase(updateProcessStep.fulfilled, (state, action) => {
      //   const index = state.orders.findIndex(
      //     (o) => o._id === action.payload._id
      //   );
      //   if (index !== -1) state.orders[index] = action.payload;
      // })

      // Update Process Step
      .addCase(updateProcessStep.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        } else {
          // If order not in state, push it (e.g., just updated one)
          state.orders.push(updatedOrder);
        }
      })
      .addCase(updateProcessStep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload.id);
      })
      
// Update Item Quantity in Order
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((o) => o._id === updatedOrder._id);

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        } else {
          state.orders.push(updatedOrder);
        }
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setActiveTab } = ordersSlice.actions;
export default ordersSlice.reducer;
