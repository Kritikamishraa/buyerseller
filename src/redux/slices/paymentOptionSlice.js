import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ========== CREATE PAYMENT OPTION ==========
export const createPaymentOption = createAsyncThunk(
  "paymentOptions/create",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/payment-options/",
        paymentData
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create payment option");
    }
  }
);

// ========== GET ALL PAYMENT OPTIONS ==========
export const getAllPaymentOptions = createAsyncThunk(
  "paymentOptions/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/payment-options/");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch payment options");
    }
  }
);

// ========== GET PAYMENT OPTION BY ID ==========
export const getPaymentOptionById = createAsyncThunk(
  "paymentOptions/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/payment-options/${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Payment option not found");
    }
  }
);

// ========== UPDATE PAYMENT OPTION ==========
export const updatePaymentOption = createAsyncThunk(
  "paymentOptions/update",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/payment-options/${id}`,
        updateData
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update payment option");
    }
  }
);

// ========== DELETE PAYMENT OPTION ==========
export const deletePaymentOption = createAsyncThunk(
  "paymentOptions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/v1/payment-options/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete payment option");
    }
  }
);

// ========== GET PAYMENT OPTION BY USER ==========
export const getPaymentOptionByUser = createAsyncThunk(
  "paymentOptions/getByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/payment-options/user/${userId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user payment options");
    }
  }
);

// ========== GET PAYMENT OPTION BY BUYER CATEGORY ==========
export const getPaymentOptionByBuyer = createAsyncThunk(
  "paymentOptions/getByBuyer",
  async ({ buyerCategory, seller }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/payment-options/buyer`,
        { buyerCategory, seller }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch buyer payment options");
    }
  }
);

// ========== SLICE ==========
const paymentOptionSlice = createSlice({
  name: "paymentOptions",
  initialState: {
    items: [],
    single: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createPaymentOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentOption.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.successMessage = "Payment option created successfully";
      })
      .addCase(createPaymentOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllPaymentOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPaymentOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllPaymentOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getPaymentOptionById.fulfilled, (state, action) => {
        state.single = action.payload;
      })

      // UPDATE
      .addCase(updatePaymentOption.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.successMessage = "Payment option updated successfully";
      })

      // DELETE
      .addCase(deletePaymentOption.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.successMessage = "Payment option deleted successfully";
      })

      // GET BY USER
      .addCase(getPaymentOptionByUser.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // GET BY BUYER
      .addCase(getPaymentOptionByBuyer.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // COMMON REJECTED
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearMessages } = paymentOptionSlice.actions;
export default paymentOptionSlice.reducer;
