import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance"; 

const BASE_URL = "/api/v1/seller-categories";

// CREATE
export const createSellerCategory = createAsyncThunk(
  "sellerCategory/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// GET ALL
export const getAllSellerCategories = createAsyncThunk(
  "sellerCategory/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// GET BY ID
export const getSellerCategoryById = createAsyncThunk(
  "sellerCategory/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE
export const updateSellerCategory = createAsyncThunk(
  "sellerCategory/update",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, categoryData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// DELETE
export const deleteSellerCategory = createAsyncThunk(
  "sellerCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ADMIN GET
export const adminGetAllSellerCategories = createAsyncThunk(
  "sellerCategory/adminGetAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const sellerCategorySlice = createSlice({
  name: "sellerCategory",
  initialState: {
    categories: [],
    adminCategories: [],
    selectedCategory: null,
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
      .addCase(createSellerCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSellerCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
        state.successMessage = "Category created successfully!";
      })
      .addCase(createSellerCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getAllSellerCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSellerCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllSellerCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getSellerCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
      })

      .addCase(updateSellerCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
        state.successMessage = "Category updated successfully!";
      })

      .addCase(deleteSellerCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
        state.successMessage = "Category deleted successfully!";
      })

      .addCase(adminGetAllSellerCategories.fulfilled, (state, action) => {
        state.adminCategories = action.payload;
      });
  },
});

export const { clearMessages } = sellerCategorySlice.actions;
export default sellerCategorySlice.reducer;
