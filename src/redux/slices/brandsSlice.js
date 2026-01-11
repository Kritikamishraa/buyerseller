import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";


// Create Brand
export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/brands/create", formData, {
        headers: { "Content-Type": "application/json" },
      });
      return data.brand;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error creating brand");
    }
  }
);

// Get All Brands
export const getAllBrands = createAsyncThunk(
  "brands/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/brands/all");
      return data.brands;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching brands");
    }
  }
);

// Delete Brand
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/brands/delete/${id}`);
      return id; // return deleted id so we can update state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting brand");
    }
  }
);

// Brands Slice
const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Brand
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); // add new brand at top
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Brands
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Brand
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandsSlice.reducer;
