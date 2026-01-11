import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const BASE_URL = "/api/v1/contact";

//  Submit Contact Form (Public)
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/create`, contactData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Submit failed");
    }
  }
);

// Get All Contacts (Admin only)
export const getAllContacts = createAsyncThunk(
  "contact/getAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/all`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Fetch failed");
    }
  }
);

// Delete Contact by ID (Admin only)
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Delete failed");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: "",
    contactList: [],
  },
  reducers: {
    resetContactState: (state) => {
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Contact submitted successfully";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all contacts
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contactList = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contactList = state.contactList.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
