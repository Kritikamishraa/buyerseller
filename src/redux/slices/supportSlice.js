// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   tickets: [],
//   ticketForm: {
//     subject: "",
//     details: "",
//   },
// };

// const supportSlice = createSlice({
//   name: "support",
//   initialState,
//   reducers: {
//     setTicketForm(state, action) {
//       state.ticketForm = { ...state.ticketForm, ...action.payload };
//     },
//     addTicket(state, action) {
//       state.tickets.push(action.payload);
//     },
//     resetForm(state) {
//       state.ticketForm = { subject: "", details: "" };
//     },
//   },
// });

// export const { setTicketForm, addTicket, resetForm } = supportSlice.actions;

// export default supportSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const initialState = {
  tickets: [],
  ticketForm: {
    subject: "",
    description: "",
  },
  loading: false,
  error: null,
};

// Async thunk for creating a support ticket
export const createSupportTicket = createAsyncThunk(
  "support/createSupportTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/support", ticketData);
      return response.data.data; // Return the created ticket
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create support ticket");
    }
  }
);

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    setTicketForm(state, action) {
      state.ticketForm = { ...state.ticketForm, ...action.payload };
    },
    addTicket(state, action) {
      state.tickets.push(action.payload);
    },
    resetForm(state) {
      state.ticketForm = { subject: "", description: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupportTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupportTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
        state.ticketForm = { subject: "", description: "" }; // Reset form on success
      })
      .addCase(createSupportTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTicketForm, addTicket, resetForm } = supportSlice.actions;
export default supportSlice.reducer;