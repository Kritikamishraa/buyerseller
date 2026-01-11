import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const API_BASE_URL = "/api/v1/buyer-seller-connections";

// Create Buyer-Seller Connection
export const createBuyerSellerConnection = createAsyncThunk(
  "buyerNetwork/createBuyerSellerConnection",
  async ({ buyerEmail, buyerPhone, buyerCategory }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/connection`,
        { buyerEmail, buyerPhone, buyerCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create buyer-seller connection"
      );
    }
  }
);

// Fetch Buyer Connections
export const fetchBuyerConnections = createAsyncThunk(
  "buyerNetwork/fetchBuyerConnections",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/connection`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const connections = response.data.data;

      // 🧩 Transform and flatten backend response
      const formattedConnections = connections.map((conn) => ({
        _id: conn._id,
        initials: getInitials(conn.otherUser?.name || conn.buyerEmail || "BU"),
        name: conn.otherUser?.name || conn.buyerEmail || "Unknown User",
        email: conn.otherUser?.email || conn.buyerEmail || "-",
        phone: conn.otherUser?.phone || conn.buyerPhone || "-",
        city: conn.otherUser?.businessAddress || "Jaipur",
        status: conn.status,
        buyerCategory: conn.buyerCategory?.name || "N/A",
        connectionData: conn, // keep full data for modal/details
      }));

      return formattedConnections;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch connections"
      );
    }
  }
);

// Update Connection Status (Accept / Reject / Restore)
export const updateConnectionStatus = createAsyncThunk(
  "buyerNetwork/updateConnectionStatus",
  async ({ connectionId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/connection/${connectionId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update connection status"
      );
    }
  }
);

const initialState = {
  buyers: [],
  tabValue: 0, // 0 = Connected, 1 = Pending Requests
  searchValue: "",
  loading: false,
  error: null,
};

const buyerNetworkSlice = createSlice({
  name: "buyerNetwork",
  initialState,
  reducers: {
    setTabValue(state, action) {
      state.tabValue = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    addNewConnection(state, action) {
      const newConnection = action.payload;
      state.buyers.unshift({
        _id: newConnection._id,
        initials: getInitials(newConnection?.buyerEmail || "BU"),
        name:
          newConnection?.otherUser?.name ||
          newConnection?.buyerEmail ||
          "Unknown User",
        email: newConnection?.otherUser?.email || newConnection?.buyerEmail,
        phone: newConnection?.otherUser?.phone || newConnection?.buyerPhone,
        city: newConnection?.otherUser?.businessAddress || "Bangalore",
        status: newConnection.status || "Pending",
        connectionData: newConnection,
      });
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Buyer Connections
      .addCase(fetchBuyerConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerConnections.fulfilled, (state, action) => {
        state.loading = false;
        state.buyers = action.payload;
      })
      .addCase(fetchBuyerConnections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Buyer-Seller Connection
      .addCase(createBuyerSellerConnection.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBuyerSellerConnection.fulfilled, (state, action) => {
        state.loading = false;
        const newConn = action.payload;
        state.buyers.unshift({
          _id: newConn._id,
          initials: getInitials(newConn?.otherUser?.name || "BU"),
          name: newConn?.otherUser?.name || newConn?.buyerEmail || "Unknown",
          email: newConn?.otherUser?.email || newConn?.buyerEmail || "-",
          phone: newConn?.otherUser?.phone || newConn?.buyerPhone || "-",
          city: newConn?.otherUser?.businessAddress || "Bangalore",
          status: newConn.status || "Pending",
          connectionData: newConn,
        });
      })
      .addCase(createBuyerSellerConnection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Connection Status
      .addCase(updateConnectionStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.buyers.findIndex((b) => b._id === updated._id);
        if (index !== -1) {
          state.buyers[index].status = updated.status;
        }
      });
  },
});

// Helper function to get initials
const getInitials = (name) => {
  if (!name) return "BU";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const { setTabValue, setSearchValue, addNewConnection, clearError } =
  buyerNetworkSlice.actions;
export default buyerNetworkSlice.reducer;
