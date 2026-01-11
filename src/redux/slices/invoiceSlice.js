// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const BASE_URL = "/api/v1/invoices";


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const BASE_URL = "/api/v1/invoices";

// -------------------------------------------
// 1) Create Invoice
// -------------------------------------------
export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}`, { orderId });
      return data; // { success, message, data }
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

// -------------------------------------------
// 2) Get Single Invoice by ID
// -------------------------------------------
export const getInvoice = createAsyncThunk(
  "invoice/getInvoice",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${invoiceId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

// -------------------------------------------
// 3) Get Full Bank Statement
// -------------------------------------------
export const getInvoiceStatement = createAsyncThunk(
  "invoice/getInvoiceStatement",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${invoiceId}/statement`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

// -------------------------------------------
// 4) Record Payment
// -------------------------------------------
export const recordPayment = createAsyncThunk(
  "invoice/recordPayment",
  async ({ invoiceId, amount, paidAt, note }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/${invoiceId}/pay`,
        { amount, paidAt, note }
      );
      return data; // backend message: "Payment recorded"
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

// -------------------------------------------
// 5) Get Seller/Buyer Based Invoice
// -------------------------------------------
export const getSellerInvoice = createAsyncThunk(
  "invoice/getSellerInvoice",
  async ({ order, seller, buyer }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/get/invoice`,
        { order, seller, buyer }
      );
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

// -------------------------------------------
// 6) Run Cron Manually
// -------------------------------------------
export const runInterestCron = createAsyncThunk(
  "invoice/runInterestCron",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/cron/run`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

// --------------------------------------------------------------------
// Slice
// --------------------------------------------------------------------
const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoice: null,
    statement: [],
    sellerInvoice: null,
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    clearInvoiceState(state) {
      state.invoice = null;
      state.statement = [];
      state.sellerInvoice = null;
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ---------- Create Invoice ----------
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ---------- Get Invoice ----------
      .addCase(getInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload.data;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ---------- Statement ----------
      .addCase(getInvoiceStatement.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInvoiceStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.statement = action.payload.data;
      })
      .addCase(getInvoiceStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ---------- Record Payment ----------
      .addCase(recordPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(recordPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(recordPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ---------- Seller Invoice ----------
      .addCase(getSellerInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSellerInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerInvoice = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getSellerInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ---------- Run Cron ----------
      .addCase(runInterestCron.pending, (state) => {
        state.loading = true;
      })
      .addCase(runInterestCron.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(runInterestCron.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearInvoiceState } = invoiceSlice.actions;

export default invoiceSlice.reducer;
