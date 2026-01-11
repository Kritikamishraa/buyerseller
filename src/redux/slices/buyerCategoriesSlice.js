import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const BASE_URL = "/api/v1/buyer-categories";

// Create Buyer Category
export const createBuyerCategory = createAsyncThunk(
  "buyerCategories/createBuyerCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}`, categoryData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Buyer Categories
export const getAllBuyerCategories = createAsyncThunk(
  "buyerCategories/getAllBuyerCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Buyer Category By Id
export const getBuyerCategoryById = createAsyncThunk(
  "buyerCategories/getBuyerCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Buyer Category
export const updateBuyerCategory = createAsyncThunk(
  "buyerCategories/updateBuyerCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/${id}`, categoryData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Buyer Category
export const deleteBuyerCategory = createAsyncThunk(
  "buyerCategories/deleteBuyerCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin Get All Buyer Categories
export const adminGetAllBuyerCategories = createAsyncThunk(
  "buyerCategories/adminGetAllBuyerCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/get`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const buyerCategoriesSlice = createSlice({
  name: "buyerCategories",
  initialState: {
    categories: [],
    categoryDetails: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
      state.categoryDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createBuyerCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBuyerCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.success = true;
      })
      .addCase(createBuyerCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Get All
      .addCase(getAllBuyerCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBuyerCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(getAllBuyerCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Get By Id
      .addCase(getBuyerCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryDetails = null;
      })
      .addCase(getBuyerCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDetails = action.payload;
      })
      .addCase(getBuyerCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update
      .addCase(updateBuyerCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBuyerCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.categories.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateBuyerCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete
      .addCase(deleteBuyerCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBuyerCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.filter(cat => cat._id !== action.meta.arg);
      })
      .addCase(deleteBuyerCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Admin Get All
      .addCase(adminGetAllBuyerCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllBuyerCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(adminGetAllBuyerCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearState } = buyerCategoriesSlice.actions;
export default buyerCategoriesSlice.reducer;
