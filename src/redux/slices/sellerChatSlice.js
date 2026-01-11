// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "../../axiosInstance";

// // const initialState = {
// //   chatList: [],
// //   selectedChatId: null,
// //   mobileView: "both",
// //   loading: false,
// //   error: null,
// // };

// // export const fetchChatList = createAsyncThunk(
// //   "sellerChat/fetchChatList",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.get("/api/v1/chat/list", config);
// //       console.log("fetchChatList raw response:", response.data);

// //       // Deduplicate chats by id and keep the latest based on time
// //       const chatsMap = new Map();
// //       response.data.data.forEach((chat) => {
// //         const chatId = chat._id?.toString();
// //         if (!chatId) {
// //           console.warn("Skipping chat with undefined ID:", chat);
// //           return;
// //         }
// //         const existingChat = chatsMap.get(chatId);
// //         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
// //         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

// //         if (!existingChat || chatTime > existingTime) {
// //           chatsMap.set(chatId, {
// //             id: chatId,
// //             name: chat.name || "Unknown User",
// //             email: chat.email || "",
// //             phone: chat.phone || "",
// //             lastMessage: chat.lastMessage || "",
// //             time: chat.time || new Date().toISOString(),
// //           });
// //         }
// //       });

// //       const chats = Array.from(chatsMap.values()).sort(
// //         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
// //       );
// //       console.log("fetchChatList mapped chats:", chats);
// //       return chats;
// //     } catch (error) {
// //       console.error("fetchChatList error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
// //     }
// //   }
// // );

// // export const fetchChatHistory = createAsyncThunk(
// //   "sellerChat/fetchChatHistory",
// //   async (userId, { rejectWithValue, getState }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
// //       console.log("fetchChatHistory response:", response.data);

// //       const { sellerChat } = getState();
// //       const currentUserId = sellerChat.selectedChatId; // Assuming current user ID is available elsewhere

// //       const messages = response.data.data.map((msg) => ({
// //         _id: msg._id?.toString(),
// //         text: msg.message || "Message unavailable",
// //         fromMe: msg.sender._id.toString() === currentUserId,
// //         createdAt: msg.createdAt || new Date().toISOString(),
// //         isRead: msg.isRead || false,
// //       }));

// //       console.log("fetchChatHistory mapped messages:", messages);
// //       return { userId, messages };
// //     } catch (error) {
// //       console.error("fetchChatHistory error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
// //     }
// //   }
// // );

// // export const sendMessage = createAsyncThunk(
// //   "sellerChat/sendMessage",
// //   async ({ receiverId, message }, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       console.log("Sending message to API:", { receiverId, message });
// //       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
// //       console.log("sendMessage response:", response.data);
// //       return response.data.data;
// //     } catch (error) {
// //       console.error("sendMessage error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to send message");
// //     }
// //   }
// // );

// // export const markMessagesAsRead = createAsyncThunk(
// //   "sellerChat/markMessagesAsRead",
// //   async (userId, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
// //       console.log("markMessagesAsRead response:", response.data);
// //       return userId;
// //     } catch (error) {
// //       console.error("markMessagesAsRead error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
// //     }
// //   }
// // );

// // const sellerChatSlice = createSlice({
// //   name: "sellerChat",
// //   initialState,
// //   reducers: {
// //     setSelectedChatId(state, action) {
// //       console.log("setSelectedChatId: Setting chat ID:", action.payload);
// //       state.selectedChatId = action.payload;
// //     },
// //     setMobileView(state, action) {
// //       state.mobileView = action.payload;
// //     },
// //     addMessage(state, action) {
// //       const message = action.payload;
// //       const chatId = message.sender._id.toString() === state.selectedChatId
// //         ? message.sender._id.toString()
// //         : message.receiver._id.toString();
// //       const chat = state.chatList.find((c) => c.id === chatId);

// //       if (chat) {
// //         chat.messages = chat.messages || [];
// //         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
// //         if (!existingMessage) {
// //           chat.messages.push({
// //             _id: message._id?.toString(),
// //             text: message.message || "Message unavailable",
// //             fromMe: message.sender._id.toString() !== state.selectedChatId,
// //             createdAt: message.createdAt || new Date().toISOString(),
// //             isRead: message.isRead || false,
// //           });
// //           chat.lastMessage = message.message;
// //           chat.time = message.createdAt || new Date().toISOString();
// //         }
// //       } else {
// //         console.warn("addMessage: Chat not found for ID:", chatId);
// //       }
// //     },
// //     markChatAsRead(state, action) {
// //       const chat = state.chatList.find((c) => c.id === action.payload);
// //       if (chat) {
// //         chat.messages = chat.messages.map((msg) => ({
// //           ...msg,
// //           isRead: true,
// //         }));
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchChatList.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchChatList.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.chatList = action.payload.map((chat) => ({
// //           ...chat,
// //           initials: chat.name
// //             ? chat.name
// //                 .split(" ")
// //                 .map((n) => n[0])
// //                 .join("")
// //                 .slice(0, 2)
// //                 .toUpperCase()
// //             : "UN",
// //           messages: chat.messages || [],
// //         }));
// //       })
// //       .addCase(fetchChatList.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(fetchChatHistory.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchChatHistory.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const chat = state.chatList.find((c) => c.id === action.payload.userId);
// //         if (chat) {
// //           chat.messages = action.payload.messages;
// //           // Update lastMessage and time based on latest message
// //           if (action.payload.messages.length > 0) {
// //             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
// //             chat.lastMessage = latestMessage.text;
// //             chat.time = latestMessage.createdAt;
// //           }
// //         } else {
// //           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
// //         }
// //       })
// //       .addCase(fetchChatHistory.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(sendMessage.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(sendMessage.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const message = action.payload;
// //         const chat = state.chatList.find(
// //           (c) => c.id === message.receiver._id.toString()
// //         );
// //         if (chat) {
// //           chat.messages = chat.messages || [];
// //           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
// //           if (!existingMessage) {
// //             chat.messages.push({
// //               _id: message._id?.toString(),
// //               text: message.message || "Message unavailable",
// //               fromMe: true,
// //               createdAt: message.createdAt || new Date().toISOString(),
// //               isRead: message.isRead || false,
// //             });
// //             chat.lastMessage = message.message;
// //             chat.time = message.createdAt;
// //           }
// //         } else {
// //           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
// //         }
// //       })
// //       .addCase(sendMessage.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
// //         const chat = state.chatList.find((c) => c.id === action.payload);
// //         if (chat) {
// //           chat.messages = chat.messages.map((msg) => ({
// //             ...msg,
// //             isRead: true,
// //           }));
// //         }
// //       });
// //   },
// // });

// // export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
// //   sellerChatSlice.actions;
// // export default sellerChatSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "../../axiosInstance";

// // const initialState = {
// //   chatList: [],
// //   selectedChatId: null,
// //   mobileView: "both",
// //   loading: false,
// //   error: null,
// // };

// // export const fetchChatList = createAsyncThunk(
// //   "sellerChat/fetchChatList",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.get("/api/v1/chat/list", config);
// //       console.log("fetchChatList raw response:", response.data);

// //       // Deduplicate chats by id and keep the latest based on time
// //       const chatsMap = new Map();
// //       response.data.data.forEach((chat) => {
// //         const chatId = chat._id?.toString();
// //         if (!chatId) {
// //           console.warn("Skipping chat with undefined ID:", chat);
// //           return;
// //         }
// //         const existingChat = chatsMap.get(chatId);
// //         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
// //         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

// //         if (!existingChat || chatTime > existingTime) {
// //           chatsMap.set(chatId, {
// //             id: chatId,
// //             name: chat.name || "Unknown User",
// //             email: chat.email || "",
// //             phone: chat.phone || "",
// //             lastMessage: chat.lastMessage || "",
// //             time: chat.time || new Date().toISOString(),
// //             unreadCount: chat.unreadCount || 0, // Initialize unread count
// //           });
// //         }
// //       });

// //       const chats = Array.from(chatsMap.values()).sort(
// //         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
// //       );
// //       console.log("fetchChatList mapped chats:", chats);
// //       return chats;
// //     } catch (error) {
// //       console.error("fetchChatList error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
// //     }
// //   }
// // );

// // export const fetchChatHistory = createAsyncThunk(
// //   "sellerChat/fetchChatHistory",
// //   async (userId, { rejectWithValue, getState }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
// //       console.log("fetchChatHistory response:", response.data);

// //       const { sellerChat } = getState();
// //       const currentUserId = sellerChat.selectedChatId; // Adjust if current user ID is stored elsewhere

// //       const messages = response.data.data.map((msg) => ({
// //         _id: msg._id?.toString(),
// //         text: msg.message || "Message unavailable",
// //         fromMe: msg.sender._id.toString() === currentUserId,
// //         createdAt: msg.createdAt || new Date().toISOString(),
// //         isRead: msg.isRead || false,
// //       }));

// //       // Calculate unread count for this chat
// //       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

// //       console.log("fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
// //       return { userId, messages, unreadCount };
// //     } catch (error) {
// //       console.error("fetchChatHistory error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
// //     }
// //   }
// // );

// // export const sendMessage = createAsyncThunk(
// //   "sellerChat/sendMessage",
// //   async ({ receiverId, message }, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       console.log("Sending message to API:", { receiverId, message });
// //       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
// //       console.log("sendMessage response:", response.data);
// //       return response.data.data;
// //     } catch (error) {
// //       console.error("sendMessage error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to send message");
// //     }
// //   }
// // );

// // export const markMessagesAsRead = createAsyncThunk(
// //   "sellerChat/markMessagesAsRead",
// //   async (userId, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
// //       console.log("markMessagesAsRead response:", response.data);
// //       return userId;
// //     } catch (error) {
// //       console.error("markMessagesAsRead error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
// //     }
// //   }
// // );

// // const sellerChatSlice = createSlice({
// //   name: "sellerChat",
// //   initialState,
// //   reducers: {
// //     setSelectedChatId(state, action) {
// //       console.log("setSelectedChatId: Setting chat ID:", action.payload);
// //       state.selectedChatId = action.payload;
// //     },
// //     setMobileView(state, action) {
// //       state.mobileView = action.payload;
// //     },
// //     addMessage(state, action) {
// //       const message = action.payload;
// //       const chatId = message.sender._id.toString() === state.selectedChatId
// //         ? message.sender._id.toString()
// //         : message.receiver._id.toString();
// //       const chat = state.chatList.find((c) => c.id === chatId);

// //       if (chat) {
// //         chat.messages = chat.messages || [];
// //         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
// //         if (!existingMessage) {
// //           const newMessage = {
// //             _id: message._id?.toString(),
// //             text: message.message || "Message unavailable",
// //             fromMe: message.sender._id.toString() !== state.selectedChatId,
// //             createdAt: message.createdAt || new Date().toISOString(),
// //             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
// //           };
// //           chat.messages.push(newMessage);
// //           chat.lastMessage = message.message;
// //           chat.time = message.createdAt || new Date().toISOString();

// //           // Update unread count
// //           if (!newMessage.fromMe && !newMessage.isRead) {
// //             chat.unreadCount = (chat.unreadCount || 0) + 1;
// //           }

// //           console.log("addMessage: Added message to chat:", chatId, newMessage);
// //         } else {
// //           console.log("addMessage: Message already exists:", message._id);
// //         }
// //       } else {
// //         console.warn("addMessage: Chat not found for ID:", chatId);
// //         // Optionally add new chat if not in chatList
// //         state.chatList.push({
// //           id: chatId,
// //           name: message.sender.name || message.receiver.name || "Unknown User",
// //           email: message.sender.email || message.receiver.email || "",
// //           phone: message.sender.phone || message.receiver.phone || "",
// //           lastMessage: message.message,
// //           time: message.createdAt || new Date().toISOString(),
// //           unreadCount: message.sender._id.toString() !== state.selectedChatId ? 1 : 0,
// //           messages: [{
// //             _id: message._id?.toString(),
// //             text: message.message || "Message unavailable",
// //             fromMe: message.sender._id.toString() !== state.selectedChatId,
// //             createdAt: message.createdAt || new Date().toISOString(),
// //             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
// //           }],
// //           initials: (message.sender.name || message.receiver.name || "UN")
// //             .split(" ")
// //             .map((n) => n[0])
// //             .join("")
// //             .slice(0, 2)
// //             .toUpperCase(),
// //         });
// //       }
// //     },
// //     markChatAsRead(state, action) {
// //       const chat = state.chatList.find((c) => c.id === action.payload);
// //       if (chat) {
// //         chat.messages = chat.messages.map((msg) => ({
// //           ...msg,
// //           isRead: true,
// //         }));
// //         chat.unreadCount = 0;
// //         console.log("markChatAsRead: Marked messages as read for chat:", action.payload);
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchChatList.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchChatList.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.chatList = action.payload.map((chat) => ({
// //           ...chat,
// //           initials: chat.name
// //             ? chat.name
// //                 .split(" ")
// //                 .map((n) => n[0])
// //                 .join("")
// //                 .slice(0, 2)
// //                 .toUpperCase()
// //             : "UN",
// //           messages: chat.messages || [],
// //           unreadCount: chat.unreadCount || 0,
// //         }));
// //       })
// //       .addCase(fetchChatList.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(fetchChatHistory.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchChatHistory.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const chat = state.chatList.find((c) => c.id === action.payload.userId);
// //         if (chat) {
// //           chat.messages = action.payload.messages;
// //           chat.unreadCount = action.payload.unreadCount;
// //           // Update lastMessage and time based on latest message
// //           if (action.payload.messages.length > 0) {
// //             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
// //             chat.lastMessage = latestMessage.text;
// //             chat.time = latestMessage.createdAt;
// //           }
// //           console.log("fetchChatHistory: Updated chat:", chat);
// //         } else {
// //           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
// //         }
// //       })
// //       .addCase(fetchChatHistory.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(sendMessage.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(sendMessage.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const message = action.payload;
// //         const chat = state.chatList.find(
// //           (c) => c.id === message.receiver._id.toString()
// //         );
// //         if (chat) {
// //           chat.messages = chat.messages || [];
// //           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
// //           if (!existingMessage) {
// //             chat.messages.push({
// //               _id: message._id?.toString(),
// //               text: message.message || "Message unavailable",
// //               fromMe: true,
// //               createdAt: message.createdAt || new Date().toISOString(),
// //               isRead: message.isRead || false,
// //             });
// //             chat.lastMessage = message.message;
// //             chat.time = message.createdAt;
// //             chat.unreadCount = 0; // Reset unread count for sent messages
// //             console.log("sendMessage: Added sent message to chat:", chat.id);
// //           }
// //         } else {
// //           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
// //         }
// //       })
// //       .addCase(sendMessage.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
// //         const chat = state.chatList.find((c) => c.id === action.payload);
// //         if (chat) {
// //           chat.messages = chat.messages.map((msg) => ({
// //             ...msg,
// //             isRead: true,
// //           }));
// //           chat.unreadCount = 0;
// //           console.log("markMessagesAsRead: Updated unreadCount for chat:", action.payload);
// //         }
// //       });
// //   },
// // });

// // export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
// //   sellerChatSlice.actions;
// // export default sellerChatSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "../../axiosInstance";

// // const initialState = {
// //   chatList: [],
// //   selectedChatId: null,
// //   mobileView: "both",
// //   loading: false,
// //   error: null,
// // };

// // export const fetchChatList = createAsyncThunk(
// //   "sellerChat/fetchChatList",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.get("/api/v1/chat/list", config);
// //       console.log("fetchChatList raw response:", response.data);

// //       // Deduplicate chats by id and keep the latest based on time
// //       const chatsMap = new Map();
// //       response.data.data.forEach((chat) => {
// //         const chatId = chat._id?.toString();
// //         if (!chatId) {
// //           console.warn("Skipping chat with undefined ID:", chat);
// //           return;
// //         }
// //         const existingChat = chatsMap.get(chatId);
// //         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
// //         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

// //         if (!existingChat || chatTime > existingTime) {
// //           chatsMap.set(chatId, {
// //             id: chatId,
// //             name: chat.name || "Unknown User",
// //             email: chat.email || "",
// //             phone: chat.phone || "",
// //             lastMessage: chat.lastMessage || "",
// //             time: chat.time || new Date().toISOString(),
// //             unreadCount: chat.unreadCount || 0, // Initialize unread count
// //           });
// //         }
// //       });

// //       const chats = Array.from(chatsMap.values()).sort(
// //         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
// //       );
// //       console.log("fetchChatList mapped chats:", chats);
// //       return chats;
// //     } catch (error) {
// //       console.error("fetchChatList error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
// //     }
// //   }
// // );

// // export const fetchChatHistory = createAsyncThunk(
// //   "sellerChat/fetchChatHistory",
// //   async (userId, { rejectWithValue, getState }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
// //       console.log("fetchChatHistory response:", response.data);

// //       const { sellerChat } = getState();
// //       const currentUserId = sellerChat.selectedChatId; // Adjust if current user ID is stored elsewhere

// //       const messages = response.data.data.map((msg) => ({
// //         _id: msg._id?.toString(),
// //         text: msg.message || "Message unavailable",
// //         fromMe: msg.sender._id.toString() === currentUserId,
// //         createdAt: msg.createdAt || new Date().toISOString(),
// //         isRead: msg.isRead || false,
// //       }));

// //       // Calculate unread count for this chat
// //       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

// //       console.log("fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
// //       return { userId, messages, unreadCount };
// //     } catch (error) {
// //       console.error("fetchChatHistory error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
// //     }
// //   }
// // );

// // export const sendMessage = createAsyncThunk(
// //   "sellerChat/sendMessage",
// //   async ({ receiverId, message }, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       console.log("Sending message to API:", { receiverId, message });
// //       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
// //       console.log("sendMessage response:", response.data);
// //       return response.data.data;
// //     } catch (error) {
// //       console.error("sendMessage error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to send message");
// //     }
// //   }
// // );

// // export const markMessagesAsRead = createAsyncThunk(
// //   "sellerChat/markMessagesAsRead",
// //   async (userId, { rejectWithValue }) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       };
// //       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
// //       console.log("markMessagesAsRead response:", response.data);
// //       return userId;
// //     } catch (error) {
// //       console.error("markMessagesAsRead error:", error.response?.data || error.message);
// //       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
// //     }
// //   }
// // );

// // const sellerChatSlice = createSlice({
// //   name: "sellerChat",
// //   initialState,
// //   reducers: {
// //     setSelectedChatId(state, action) {
// //       console.log("setSelectedChatId: Setting chat ID:", action.payload);
// //       state.selectedChatId = action.payload;
// //     },
// //     setMobileView(state, action) {
// //       state.mobileView = action.payload;
// //     },
// //     addMessage(state, action) {
// //       const message = action.payload;
// //       const chatId = message.sender._id.toString() === state.selectedChatId
// //         ? message.sender._id.toString()
// //         : message.receiver._id.toString();
// //       const chat = state.chatList.find((c) => c.id === chatId);

// //       if (chat) {
// //         chat.messages = chat.messages || [];
// //         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
// //         if (!existingMessage) {
// //           const newMessage = {
// //             _id: message._id?.toString(),
// //             text: message.message || "Message unavailable",
// //             fromMe: message.sender._id.toString() !== state.selectedChatId,
// //             createdAt: message.createdAt || new Date().toISOString(),
// //             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
// //           };
// //           chat.messages.push(newMessage);
// //           chat.lastMessage = message.message;
// //           chat.time = message.createdAt || new Date().toISOString();

// //           // Update unread count
// //           if (!newMessage.fromMe && !newMessage.isRead) {
// //             chat.unreadCount = (chat.unreadCount || 0) + 1;
// //           }

// //           console.log("addMessage: Added message to chat:", chatId, newMessage);
// //         } else {
// //           console.log("addMessage: Message already exists:", message._id);
// //         }
// //       } else {
// //         console.warn("addMessage: Chat not found for ID:", chatId);
// //         // Optionally add new chat if not in chatList
// //         state.chatList.push({
// //           id: chatId,
// //           name: message.sender.name || message.receiver.name || "Unknown User",
// //           email: message.sender.email || message.receiver.email || "",
// //           phone: message.sender.phone || message.receiver.phone || "",
// //           lastMessage: message.message,
// //           time: message.createdAt || new Date().toISOString(),
// //           unreadCount: message.sender._id.toString() !== state.selectedChatId ? 1 : 0,
// //           messages: [{
// //             _id: message._id?.toString(),
// //             text: message.message || "Message unavailable",
// //             fromMe: message.sender._id.toString() !== state.selectedChatId,
// //             createdAt: message.createdAt || new Date().toISOString(),
// //             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
// //           }],
// //           initials: (message.sender.name || message.receiver.name || "UN")
// //             .split(" ")
// //             .map((n) => n[0])
// //             .join("")
// //             .slice(0, 2)
// //             .toUpperCase(),
// //         });
// //       }
// //     },
// //     markChatAsRead(state, action) {
// //       const chat = state.chatList.find((c) => c.id === action.payload);
// //       if (chat) {
// //         chat.messages = chat.messages.map((msg) => ({
// //           ...msg,
// //           isRead: true,
// //         }));
// //         chat.unreadCount = 0;
// //         console.log("markChatAsRead: Marked messages as read for chat:", action.payload);
// //       }
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchChatList.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchChatList.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.chatList = action.payload.map((chat) => ({
// //           ...chat,
// //           initials: chat.name
// //             ? chat.name
// //                 .split(" ")
// //                 .map((n) => n[0])
// //                 .join("")
// //                 .slice(0, 2)
// //                 .toUpperCase()
// //             : "UN",
// //           messages: chat.messages || [],
// //           unreadCount: chat.unreadCount || 0,
// //         }));
// //       })
// //       .addCase(fetchChatList.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(fetchChatHistory.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchChatHistory.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const chat = state.chatList.find((c) => c.id === action.payload.userId);
// //         if (chat) {
// //           chat.messages = action.payload.messages;
// //           chat.unreadCount = action.payload.unreadCount;
// //           // Update lastMessage and time based on latest message
// //           if (action.payload.messages.length > 0) {
// //             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
// //             chat.lastMessage = latestMessage.text;
// //             chat.time = latestMessage.createdAt;
// //           }
// //           console.log("fetchChatHistory: Updated chat:", chat);
// //         } else {
// //           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
// //         }
// //       })
// //       .addCase(fetchChatHistory.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(sendMessage.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(sendMessage.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const message = action.payload;
// //         const chat = state.chatList.find(
// //           (c) => c.id === message.receiver._id.toString()
// //         );
// //         if (chat) {
// //           chat.messages = chat.messages || [];
// //           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
// //           if (!existingMessage) {
// //             chat.messages.push({
// //               _id: message._id?.toString(),
// //               text: message.message || "Message unavailable",
// //               fromMe: true,
// //               createdAt: message.createdAt || new Date().toISOString(),
// //               isRead: message.isRead || false,
// //             });
// //             chat.lastMessage = message.message;
// //             chat.time = message.createdAt;
// //             chat.unreadCount = 0; // Reset unread count for sent messages
// //             console.log("sendMessage: Added sent message to chat:", chat.id);
// //           }
// //         } else {
// //           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
// //         }
// //       })
// //       .addCase(sendMessage.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
// //         const chat = state.chatList.find((c) => c.id === action.payload);
// //         if (chat) {
// //           chat.messages = chat.messages.map((msg) => ({
// //             ...msg,
// //             isRead: true,
// //           }));
// //           chat.unreadCount = 0;
// //           console.log("markMessagesAsRead: Updated unreadCount for chat:", action.payload);
// //         }
// //       });
// //   },
// // });

// // export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
// //   sellerChatSlice.actions;
// // export default sellerChatSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const initialState = {
//   chatList: [],
//   selectedChatId: null,
//   mobileView: "both",
//   loading: false,
//   error: null,
// };

// export const fetchChatList = createAsyncThunk(
//   "sellerChat/fetchChatList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get("/api/v1/chat/list", config);
//       // console.log("fetchChatList raw response:", response.data);

//       const chatsMap = new Map();
//       response.data.data.forEach((chat) => {
//         const chatId = chat._id?.toString();
//         if (!chatId) {
//           console.warn("Skipping chat with undefined ID:", chat);
//           return;
//         }
//         const existingChat = chatsMap.get(chatId);
//         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
//         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

//         if (!existingChat || chatTime > existingTime) {
//           chatsMap.set(chatId, {
//             id: chatId,
//             name: chat.name || "Unknown User",
//             email: chat.email || "",
//             phone: chat.phone || "",
//             lastMessage: chat.lastMessage || "",
//             time: chat.time || new Date().toISOString(),
//             unreadCount: chat.unreadCount || 0,
//           });
//         }
//       });

//       const chats = Array.from(chatsMap.values()).sort(
//         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
//       );
//       // console.log("fetchChatList mapped chats:", chats);
//       return chats;
//     } catch (error) {
//       console.error("fetchChatList error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
//     }
//   }
// );

// export const fetchChatHistory = createAsyncThunk(
//   "sellerChat/fetchChatHistory",
//   async (userId, { rejectWithValue, getState }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
//       // console.log("fetchChatHistory response:", response.data);

//       const { sellerChat } = getState();
//       const currentUserId = localStorage.getItem("userId") || sellerChat.selectedChatId;

//       const messages = response.data.data.map((msg) => ({
//         _id: msg._id?.toString(),
//         text: msg.message || "Message unavailable",
//         fromMe: msg.sender._id.toString() === currentUserId,
//         createdAt: msg.createdAt || new Date().toISOString(),
//         isRead: msg.isRead || false,
//       }));

//       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

//       // console.log("fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
//       return { userId, messages, unreadCount };
//     } catch (error) {
//       console.error("fetchChatHistory error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   "sellerChat/sendMessage",
//   async ({ receiverId, message }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("Sending message to API:", { receiverId, message });
//       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
//       // console.log("sendMessage response:", response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("sendMessage error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to send message");
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   "sellerChat/markMessagesAsRead",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
//       // console.log("markMessagesAsRead response:", response.data);
//       return userId;
//     } catch (error) {
//       console.error("markMessagesAsRead error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
//     }
//   }
// );

// const sellerChatSlice = createSlice({
//   name: "sellerChat",
//   initialState,
//   reducers: {
//     setSelectedChatId(state, action) {
//       // console.log("setSelectedChatId: Setting chat ID:", action.payload);
//       state.selectedChatId = action.payload;
//     },
//     setMobileView(state, action) {
//       state.mobileView = action.payload;
//     },
//     addMessage(state, action) {
//       const message = action.payload;
//       const currentUserId = localStorage.getItem("userId") || state.selectedChatId;
//       console.log("addMessage: Current user ID:", currentUserId);
//       const chatId = message.sender._id.toString() === currentUserId
//         ? message.receiver._id.toString()
//         : message.sender._id.toString();
//       // console.log("addMessage: Processing message for chatId:", chatId, "message:", message);

//       const chat = state.chatList.find((c) => c.id === chatId);

//       if (chat) {
//         chat.messages = chat.messages || [];
//         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//         if (!existingMessage) {
//           const newMessage = {
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() === currentUserId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || (message.sender._id.toString() === currentUserId || state.selectedChatId === chatId),
//           };
//           chat.messages.push(newMessage);
//           chat.lastMessage = message.message;
//           chat.time = message.createdAt || new Date().toISOString();

//           if (!newMessage.fromMe && !newMessage.isRead && state.selectedChatId !== chatId) {
//             chat.unreadCount = (chat.unreadCount || 0) + 1;
//           }

//           // console.log("addMessage: Added message to existing chat:", chatId, newMessage);
//         } else {
//           console.log("addMessage: Message already exists:", message._id);
//         }
//       } else {
//         // console.log("addMessage: Creating new chat for ID:", chatId);
//         const newChat = {
//           id: chatId,
//           name: message.sender.name || message.receiver.name || "Unknown User",
//           email: message.sender.email || message.receiver.email || "",
//           phone: message.sender.phone || message.receiver.phone || "",
//           lastMessage: message.message,
//           time: message.createdAt || new Date().toISOString(),
//           unreadCount: message.sender._id.toString() !== currentUserId && !message.isRead && state.selectedChatId !== chatId ? 1 : 0,
//           messages: [{
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() === currentUserId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || (message.sender._id.toString() === currentUserId || state.selectedChatId === chatId),
//           }],
//           initials: (message.sender.name || message.receiver.name || "UN")
//             .split(" ")
//             .map((n) => n[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase(),
//         };
//         state.chatList.push(newChat);
//         state.chatList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
//         // console.log("addMessage: Added new chat:", newChat);
//       }
//     },
//     markChatAsRead(state, action) {
//       const chat = state.chatList.find((c) => c.id === action.payload);
//       if (chat) {
//         chat.messages = chat.messages.map((msg) => ({
//           ...msg,
//           isRead: true,
//         }));
//         chat.unreadCount = 0;
//         // console.log("markChatAsRead: Marked messages as read for chat:", action.payload);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chatList = action.payload.map((chat) => ({
//           ...chat,
//           initials: chat.name
//             ? chat.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()
//             : "UN",
//           messages: chat.messages || [],
//           unreadCount: chat.unreadCount || 0,
//         }));
//       })
//       .addCase(fetchChatList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchChatHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         const chat = state.chatList.find((c) => c.id === action.payload.userId);
//         if (chat) {
//           chat.messages = action.payload.messages;
//           chat.unreadCount = action.payload.unreadCount;
//           if (action.payload.messages.length > 0) {
//             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
//             chat.lastMessage = latestMessage.text;
//             chat.time = latestMessage.createdAt;
//           }
//           // console.log("fetchChatHistory: Updated chat:", chat);
//         } else {
//           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
//         }
//       })
//       .addCase(fetchChatHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         const message = action.payload;
//         const chat = state.chatList.find(
//           (c) => c.id === message.receiver._id.toString()
//         );
//         if (chat) {
//           chat.messages = chat.messages || [];
//           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//           if (!existingMessage) {
//             chat.messages.push({
//               _id: message._id?.toString(),
//               text: message.message || "Message unavailable",
//               fromMe: true,
//               createdAt: message.createdAt || new Date().toISOString(),
//               isRead: message.isRead || false,
//             });
//             chat.lastMessage = message.message;
//             chat.time = message.createdAt;
//             chat.unreadCount = 0;
//             console.log("sendMessage: Added sent message to chat:", chat.id);
//           }
//         } else {
//           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
//         }
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chat = state.chatList.find((c) => c.id === action.payload);
//         if (chat) {
//           chat.messages = chat.messages.map((msg) => ({
//             ...msg,
//             isRead: true,
//           }));
//           chat.unreadCount = 0;
//           // console.log("markMessagesAsRead: Updated unreadCount for chat:", action.payload);
//         }
//       });
//   },
// });

// export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
//   sellerChatSlice.actions;
// export default sellerChatSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const initialState = {
//   chatList: [],
//   selectedChatId: null,
//   mobileView: "both",
//   loading: false,
//   error: null,
// };

// export const fetchChatList = createAsyncThunk(
//   "sellerChat/fetchChatList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get("/api/v1/chat/list", config);
//       console.log("fetchChatList raw response:", response.data);

//       // Deduplicate chats by id and keep the latest based on time
//       const chatsMap = new Map();
//       response.data.data.forEach((chat) => {
//         const chatId = chat._id?.toString();
//         if (!chatId) {
//           console.warn("Skipping chat with undefined ID:", chat);
//           return;
//         }
//         const existingChat = chatsMap.get(chatId);
//         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
//         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

//         if (!existingChat || chatTime > existingTime) {
//           chatsMap.set(chatId, {
//             id: chatId,
//             name: chat.name || "Unknown User",
//             email: chat.email || "",
//             phone: chat.phone || "",
//             lastMessage: chat.lastMessage || "",
//             time: chat.time || new Date().toISOString(),
//           });
//         }
//       });

//       const chats = Array.from(chatsMap.values()).sort(
//         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
//       );
//       console.log("fetchChatList mapped chats:", chats);
//       return chats;
//     } catch (error) {
//       console.error("fetchChatList error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
//     }
//   }
// );

// export const fetchChatHistory = createAsyncThunk(
//   "sellerChat/fetchChatHistory",
//   async (userId, { rejectWithValue, getState }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
//       console.log("fetchChatHistory response:", response.data);

//       const { sellerChat } = getState();
//       const currentUserId = sellerChat.selectedChatId; // Assuming current user ID is available elsewhere

//       const messages = response.data.data.map((msg) => ({
//         _id: msg._id?.toString(),
//         text: msg.message || "Message unavailable",
//         fromMe: msg.sender._id.toString() === currentUserId,
//         createdAt: msg.createdAt || new Date().toISOString(),
//         isRead: msg.isRead || false,
//       }));

//       console.log("fetchChatHistory mapped messages:", messages);
//       return { userId, messages };
//     } catch (error) {
//       console.error("fetchChatHistory error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   "sellerChat/sendMessage",
//   async ({ receiverId, message }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("Sending message to API:", { receiverId, message });
//       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
//       console.log("sendMessage response:", response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("sendMessage error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to send message");
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   "sellerChat/markMessagesAsRead",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
//       console.log("markMessagesAsRead response:", response.data);
//       return userId;
//     } catch (error) {
//       console.error("markMessagesAsRead error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
//     }
//   }
// );

// const sellerChatSlice = createSlice({
//   name: "sellerChat",
//   initialState,
//   reducers: {
//     setSelectedChatId(state, action) {
//       console.log("setSelectedChatId: Setting chat ID:", action.payload);
//       state.selectedChatId = action.payload;
//     },
//     setMobileView(state, action) {
//       state.mobileView = action.payload;
//     },
//     addMessage(state, action) {
//       const message = action.payload;
//       const chatId = message.sender._id.toString() === state.selectedChatId
//         ? message.sender._id.toString()
//         : message.receiver._id.toString();
//       const chat = state.chatList.find((c) => c.id === chatId);

//       if (chat) {
//         chat.messages = chat.messages || [];
//         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//         if (!existingMessage) {
//           chat.messages.push({
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() !== state.selectedChatId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || false,
//           });
//           chat.lastMessage = message.message;
//           chat.time = message.createdAt || new Date().toISOString();
//         }
//       } else {
//         console.warn("addMessage: Chat not found for ID:", chatId);
//       }
//     },
//     markChatAsRead(state, action) {
//       const chat = state.chatList.find((c) => c.id === action.payload);
//       if (chat) {
//         chat.messages = chat.messages.map((msg) => ({
//           ...msg,
//           isRead: true,
//         }));
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chatList = action.payload.map((chat) => ({
//           ...chat,
//           initials: chat.name
//             ? chat.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()
//             : "UN",
//           messages: chat.messages || [],
//         }));
//       })
//       .addCase(fetchChatList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchChatHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         const chat = state.chatList.find((c) => c.id === action.payload.userId);
//         if (chat) {
//           chat.messages = action.payload.messages;
//           // Update lastMessage and time based on latest message
//           if (action.payload.messages.length > 0) {
//             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
//             chat.lastMessage = latestMessage.text;
//             chat.time = latestMessage.createdAt;
//           }
//         } else {
//           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
//         }
//       })
//       .addCase(fetchChatHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         const message = action.payload;
//         const chat = state.chatList.find(
//           (c) => c.id === message.receiver._id.toString()
//         );
//         if (chat) {
//           chat.messages = chat.messages || [];
//           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//           if (!existingMessage) {
//             chat.messages.push({
//               _id: message._id?.toString(),
//               text: message.message || "Message unavailable",
//               fromMe: true,
//               createdAt: message.createdAt || new Date().toISOString(),
//               isRead: message.isRead || false,
//             });
//             chat.lastMessage = message.message;
//             chat.time = message.createdAt;
//           }
//         } else {
//           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
//         }
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chat = state.chatList.find((c) => c.id === action.payload);
//         if (chat) {
//           chat.messages = chat.messages.map((msg) => ({
//             ...msg,
//             isRead: true,
//           }));
//         }
//       });
//   },
// });

// export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
//   sellerChatSlice.actions;
// export default sellerChatSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const initialState = {
//   chatList: [],
//   selectedChatId: null,
//   mobileView: "both",
//   loading: false,
//   error: null,
// };

// export const fetchChatList = createAsyncThunk(
//   "sellerChat/fetchChatList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get("/api/v1/chat/list", config);
//       console.log("fetchChatList raw response:", response.data);

//       // Deduplicate chats by id and keep the latest based on time
//       const chatsMap = new Map();
//       response.data.data.forEach((chat) => {
//         const chatId = chat._id?.toString();
//         if (!chatId) {
//           console.warn("Skipping chat with undefined ID:", chat);
//           return;
//         }
//         const existingChat = chatsMap.get(chatId);
//         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
//         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

//         if (!existingChat || chatTime > existingTime) {
//           chatsMap.set(chatId, {
//             id: chatId,
//             name: chat.name || "Unknown User",
//             email: chat.email || "",
//             phone: chat.phone || "",
//             lastMessage: chat.lastMessage || "",
//             time: chat.time || new Date().toISOString(),
//             unreadCount: chat.unreadCount || 0, // Initialize unread count
//           });
//         }
//       });

//       const chats = Array.from(chatsMap.values()).sort(
//         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
//       );
//       console.log("fetchChatList mapped chats:", chats);
//       return chats;
//     } catch (error) {
//       console.error("fetchChatList error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
//     }
//   }
// );

// export const fetchChatHistory = createAsyncThunk(
//   "sellerChat/fetchChatHistory",
//   async (userId, { rejectWithValue, getState }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
//       console.log("fetchChatHistory response:", response.data);

//       const { sellerChat } = getState();
//       const currentUserId = sellerChat.selectedChatId; // Adjust if current user ID is stored elsewhere

//       const messages = response.data.data.map((msg) => ({
//         _id: msg._id?.toString(),
//         text: msg.message || "Message unavailable",
//         fromMe: msg.sender._id.toString() === currentUserId,
//         createdAt: msg.createdAt || new Date().toISOString(),
//         isRead: msg.isRead || false,
//       }));

//       // Calculate unread count for this chat
//       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

//       console.log("fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
//       return { userId, messages, unreadCount };
//     } catch (error) {
//       console.error("fetchChatHistory error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   "sellerChat/sendMessage",
//   async ({ receiverId, message }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("Sending message to API:", { receiverId, message });
//       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
//       console.log("sendMessage response:", response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("sendMessage error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to send message");
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   "sellerChat/markMessagesAsRead",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
//       console.log("markMessagesAsRead response:", response.data);
//       return userId;
//     } catch (error) {
//       console.error("markMessagesAsRead error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
//     }
//   }
// );

// const sellerChatSlice = createSlice({
//   name: "sellerChat",
//   initialState,
//   reducers: {
//     setSelectedChatId(state, action) {
//       console.log("setSelectedChatId: Setting chat ID:", action.payload);
//       state.selectedChatId = action.payload;
//     },
//     setMobileView(state, action) {
//       state.mobileView = action.payload;
//     },
//     addMessage(state, action) {
//       const message = action.payload;
//       const chatId = message.sender._id.toString() === state.selectedChatId
//         ? message.sender._id.toString()
//         : message.receiver._id.toString();
//       const chat = state.chatList.find((c) => c.id === chatId);

//       if (chat) {
//         chat.messages = chat.messages || [];
//         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//         if (!existingMessage) {
//           const newMessage = {
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() !== state.selectedChatId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
//           };
//           chat.messages.push(newMessage);
//           chat.lastMessage = message.message;
//           chat.time = message.createdAt || new Date().toISOString();

//           // Update unread count
//           if (!newMessage.fromMe && !newMessage.isRead) {
//             chat.unreadCount = (chat.unreadCount || 0) + 1;
//           }

//           console.log("addMessage: Added message to chat:", chatId, newMessage);
//         } else {
//           console.log("addMessage: Message already exists:", message._id);
//         }
//       } else {
//         console.warn("addMessage: Chat not found for ID:", chatId);
//         // Optionally add new chat if not in chatList
//         state.chatList.push({
//           id: chatId,
//           name: message.sender.name || message.receiver.name || "Unknown User",
//           email: message.sender.email || message.receiver.email || "",
//           phone: message.sender.phone || message.receiver.phone || "",
//           lastMessage: message.message,
//           time: message.createdAt || new Date().toISOString(),
//           unreadCount: message.sender._id.toString() !== state.selectedChatId ? 1 : 0,
//           messages: [{
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() !== state.selectedChatId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
//           }],
//           initials: (message.sender.name || message.receiver.name || "UN")
//             .split(" ")
//             .map((n) => n[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase(),
//         });
//       }
//     },
//     markChatAsRead(state, action) {
//       const chat = state.chatList.find((c) => c.id === action.payload);
//       if (chat) {
//         chat.messages = chat.messages.map((msg) => ({
//           ...msg,
//           isRead: true,
//         }));
//         chat.unreadCount = 0;
//         console.log("markChatAsRead: Marked messages as read for chat:", action.payload);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chatList = action.payload.map((chat) => ({
//           ...chat,
//           initials: chat.name
//             ? chat.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()
//             : "UN",
//           messages: chat.messages || [],
//           unreadCount: chat.unreadCount || 0,
//         }));
//       })
//       .addCase(fetchChatList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchChatHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         const chat = state.chatList.find((c) => c.id === action.payload.userId);
//         if (chat) {
//           chat.messages = action.payload.messages;
//           chat.unreadCount = action.payload.unreadCount;
//           // Update lastMessage and time based on latest message
//           if (action.payload.messages.length > 0) {
//             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
//             chat.lastMessage = latestMessage.text;
//             chat.time = latestMessage.createdAt;
//           }
//           console.log("fetchChatHistory: Updated chat:", chat);
//         } else {
//           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
//         }
//       })
//       .addCase(fetchChatHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         const message = action.payload;
//         const chat = state.chatList.find(
//           (c) => c.id === message.receiver._id.toString()
//         );
//         if (chat) {
//           chat.messages = chat.messages || [];
//           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//           if (!existingMessage) {
//             chat.messages.push({
//               _id: message._id?.toString(),
//               text: message.message || "Message unavailable",
//               fromMe: true,
//               createdAt: message.createdAt || new Date().toISOString(),
//               isRead: message.isRead || false,
//             });
//             chat.lastMessage = message.message;
//             chat.time = message.createdAt;
//             chat.unreadCount = 0; // Reset unread count for sent messages
//             console.log("sendMessage: Added sent message to chat:", chat.id);
//           }
//         } else {
//           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
//         }
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chat = state.chatList.find((c) => c.id === action.payload);
//         if (chat) {
//           chat.messages = chat.messages.map((msg) => ({
//             ...msg,
//             isRead: true,
//           }));
//           chat.unreadCount = 0;
//           console.log("markMessagesAsRead: Updated unreadCount for chat:", action.payload);
//         }
//       });
//   },
// });

// export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
//   sellerChatSlice.actions;
// export default sellerChatSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const initialState = {
//   chatList: [],
//   selectedChatId: null,
//   mobileView: "both",
//   loading: false,
//   error: null,
// };

// export const fetchChatList = createAsyncThunk(
//   "sellerChat/fetchChatList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get("/api/v1/chat/list", config);
//       console.log("fetchChatList raw response:", response.data);

//       // Deduplicate chats by id and keep the latest based on time
//       const chatsMap = new Map();
//       response.data.data.forEach((chat) => {
//         const chatId = chat._id?.toString();
//         if (!chatId) {
//           console.warn("Skipping chat with undefined ID:", chat);
//           return;
//         }
//         const existingChat = chatsMap.get(chatId);
//         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
//         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

//         if (!existingChat || chatTime > existingTime) {
//           chatsMap.set(chatId, {
//             id: chatId,
//             name: chat.name || "Unknown User",
//             email: chat.email || "",
//             phone: chat.phone || "",
//             lastMessage: chat.lastMessage || "",
//             time: chat.time || new Date().toISOString(),
//             unreadCount: chat.unreadCount || 0, // Initialize unread count
//           });
//         }
//       });

//       const chats = Array.from(chatsMap.values()).sort(
//         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
//       );
//       console.log("fetchChatList mapped chats:", chats);
//       return chats;
//     } catch (error) {
//       console.error("fetchChatList error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
//     }
//   }
// );

// export const fetchChatHistory = createAsyncThunk(
//   "sellerChat/fetchChatHistory",
//   async (userId, { rejectWithValue, getState }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
//       console.log("fetchChatHistory response:", response.data);

//       const { sellerChat } = getState();
//       const currentUserId = sellerChat.selectedChatId; // Adjust if current user ID is stored elsewhere

//       const messages = response.data.data.map((msg) => ({
//         _id: msg._id?.toString(),
//         text: msg.message || "Message unavailable",
//         fromMe: msg.sender._id.toString() === currentUserId,
//         createdAt: msg.createdAt || new Date().toISOString(),
//         isRead: msg.isRead || false,
//       }));

//       // Calculate unread count for this chat
//       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

//       console.log("fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
//       return { userId, messages, unreadCount };
//     } catch (error) {
//       console.error("fetchChatHistory error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   "sellerChat/sendMessage",
//   async ({ receiverId, message }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("Sending message to API:", { receiverId, message });
//       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
//       console.log("sendMessage response:", response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("sendMessage error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to send message");
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   "sellerChat/markMessagesAsRead",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
//       console.log("markMessagesAsRead response:", response.data);
//       return userId;
//     } catch (error) {
//       console.error("markMessagesAsRead error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
//     }
//   }
// );

// const sellerChatSlice = createSlice({
//   name: "sellerChat",
//   initialState,
//   reducers: {
//     setSelectedChatId(state, action) {
//       console.log("setSelectedChatId: Setting chat ID:", action.payload);
//       state.selectedChatId = action.payload;
//     },
//     setMobileView(state, action) {
//       state.mobileView = action.payload;
//     },
//     addMessage(state, action) {
//       const message = action.payload;
//       const chatId = message.sender._id.toString() === state.selectedChatId
//         ? message.sender._id.toString()
//         : message.receiver._id.toString();
//       const chat = state.chatList.find((c) => c.id === chatId);

//       if (chat) {
//         chat.messages = chat.messages || [];
//         const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//         if (!existingMessage) {
//           const newMessage = {
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() !== state.selectedChatId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
//           };
//           chat.messages.push(newMessage);
//           chat.lastMessage = message.message;
//           chat.time = message.createdAt || new Date().toISOString();

//           // Update unread count
//           if (!newMessage.fromMe && !newMessage.isRead) {
//             chat.unreadCount = (chat.unreadCount || 0) + 1;
//           }

//           console.log("addMessage: Added message to chat:", chatId, newMessage);
//         } else {
//           console.log("addMessage: Message already exists:", message._id);
//         }
//       } else {
//         console.warn("addMessage: Chat not found for ID:", chatId);
//         // Optionally add new chat if not in chatList
//         state.chatList.push({
//           id: chatId,
//           name: message.sender.name || message.receiver.name || "Unknown User",
//           email: message.sender.email || message.receiver.email || "",
//           phone: message.sender.phone || message.receiver.phone || "",
//           lastMessage: message.message,
//           time: message.createdAt || new Date().toISOString(),
//           unreadCount: message.sender._id.toString() !== state.selectedChatId ? 1 : 0,
//           messages: [{
//             _id: message._id?.toString(),
//             text: message.message || "Message unavailable",
//             fromMe: message.sender._id.toString() !== state.selectedChatId,
//             createdAt: message.createdAt || new Date().toISOString(),
//             isRead: message.isRead || (message.sender._id.toString() === state.selectedChatId),
//           }],
//           initials: (message.sender.name || message.receiver.name || "UN")
//             .split(" ")
//             .map((n) => n[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase(),
//         });
//       }
//     },
//     markChatAsRead(state, action) {
//       const chat = state.chatList.find((c) => c.id === action.payload);
//       if (chat) {
//         chat.messages = chat.messages.map((msg) => ({
//           ...msg,
//           isRead: true,
//         }));
//         chat.unreadCount = 0;
//         console.log("markChatAsRead: Marked messages as read for chat:", action.payload);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chatList = action.payload.map((chat) => ({
//           ...chat,
//           initials: chat.name
//             ? chat.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()
//             : "UN",
//           messages: chat.messages || [],
//           unreadCount: chat.unreadCount || 0,
//         }));
//       })
//       .addCase(fetchChatList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchChatHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         const chat = state.chatList.find((c) => c.id === action.payload.userId);
//         if (chat) {
//           chat.messages = action.payload.messages;
//           chat.unreadCount = action.payload.unreadCount;
//           // Update lastMessage and time based on latest message
//           if (action.payload.messages.length > 0) {
//             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
//             chat.lastMessage = latestMessage.text;
//             chat.time = latestMessage.createdAt;
//           }
//           console.log("fetchChatHistory: Updated chat:", chat);
//         } else {
//           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
//         }
//       })
//       .addCase(fetchChatHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         const message = action.payload;
//         const chat = state.chatList.find(
//           (c) => c.id === message.receiver._id.toString()
//         );
//         if (chat) {
//           chat.messages = chat.messages || [];
//           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//           if (!existingMessage) {
//             chat.messages.push({
//               _id: message._id?.toString(),
//               text: message.message || "Message unavailable",
//               fromMe: true,
//               createdAt: message.createdAt || new Date().toISOString(),
//               isRead: message.isRead || false,
//             });
//             chat.lastMessage = message.message;
//             chat.time = message.createdAt;
//             chat.unreadCount = 0; // Reset unread count for sent messages
//             console.log("sendMessage: Added sent message to chat:", chat.id);
//           }
//         } else {
//           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
//         }
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chat = state.chatList.find((c) => c.id === action.payload);
//         if (chat) {
//           chat.messages = chat.messages.map((msg) => ({
//             ...msg,
//             isRead: true,
//           }));
//           chat.unreadCount = 0;
//           console.log("markMessagesAsRead: Updated unreadCount for chat:", action.payload);
//         }
//       });
//   },
// });

// export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
//   sellerChatSlice.actions;
// export default sellerChatSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const initialState = {
//   chatList: [],
//   selectedChatId: null,
//   mobileView: "both",
//   loading: false,
//   error: null,
// };

// export const fetchChatList = createAsyncThunk(
//   "sellerChat/fetchChatList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get("/api/v1/chat/list", config);
//       // console.log("fetchChatList raw response:", response.data);

//       const chatsMap = new Map();
//       response.data.data.forEach((chat) => {
//         const chatId = chat._id?.toString();
//         if (!chatId) {
//           console.warn("Skipping chat with undefined ID:", chat);
//           return;
//         }
//         const existingChat = chatsMap.get(chatId);
//         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
//         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

//         if (!existingChat || chatTime > existingTime) {
//           chatsMap.set(chatId, {
//             id: chatId,
//             name: chat.name || "Unknown User",
//             email: chat.email || "",
//             phone: chat.phone || "",
//             lastMessage: chat.lastMessage || "",
//             time: chat.time || new Date().toISOString(),
//             unreadCount: chat.unreadCount || 0,
//           });
//         }
//       });

//       const chats = Array.from(chatsMap.values()).sort(
//         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
//       );
//       // console.log("fetchChatList mapped chats:", chats);
//       return chats;
//     } catch (error) {
//       console.error("fetchChatList error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
//     }
//   }
// );

// export const fetchChatHistory = createAsyncThunk(
//   "sellerChat/fetchChatHistory",
//   async (userId, { rejectWithValue, getState }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
//       // console.log("fetchChatHistory response:", response.data);

//       const { sellerChat } = getState();
//       const currentUserId = localStorage.getItem("userId") || sellerChat.selectedChatId;

//       const messages = response.data.data.map((msg) => ({
//         _id: msg._id?.toString(),
//         text: msg.message || "Message unavailable",
//         fromMe: msg.sender._id.toString() === currentUserId,
//         createdAt: msg.createdAt || new Date().toISOString(),
//         isRead: msg.isRead || false,
//       }));

//       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

//       // console.log("fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
//       return { userId, messages, unreadCount };
//     } catch (error) {
//       console.error("fetchChatHistory error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   "sellerChat/sendMessage",
//   async ({ receiverId, message }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("Sending message to API:", { receiverId, message });
//       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
//       // console.log("sendMessage response:", response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("sendMessage error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to send message");
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   "sellerChat/markMessagesAsRead",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//        await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
//       // console.log("markMessagesAsRead response:", response.data);
//       return userId;
//     } catch (error) {
//       console.error("markMessagesAsRead error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
//     }
//   }
// );

// const sellerChatSlice = createSlice({
//   name: "sellerChat",
//   initialState,
//   reducers: {
//     setSelectedChatId(state, action) {
//       // console.log("setSelectedChatId: Setting chat ID:", action.payload);
//       state.selectedChatId = action.payload;
//     },
//     setMobileView(state, action) {
//       state.mobileView = action.payload;
//     },
//     // addMessage(state, action) {
//     //   const message = action.payload;
//     //   const currentUserId = localStorage.getItem("userId") || state.selectedChatId;
//     //   const chatId = message.sender._id.toString() === currentUserId
//     //     ? message.receiver._id.toString()
//     //     : message.sender._id.toString();
//     //   // console.log("addMessage: Processing message for chatId:", chatId, "message:", message);

//     //   const chat = state.chatList.find((c) => c.id === chatId);

//     //   if (chat) {
//     //     chat.messages = chat.messages || [];
//     //     const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//     //     if (!existingMessage) {
//     //       const newMessage = {
//     //         _id: message._id?.toString(),
//     //         text: message.message || "Message unavailable",
//     //         fromMe: message.sender._id.toString() === currentUserId,
//     //         createdAt: message.createdAt || new Date().toISOString(),
//     //         isRead: message.isRead || (message.sender._id.toString() === currentUserId || state.selectedChatId === chatId),
//     //       };
//     //       chat.messages.push(newMessage);
//     //       chat.lastMessage = message.message;
//     //       chat.time = message.createdAt || new Date().toISOString();

//     //       if (!newMessage.fromMe && !newMessage.isRead && state.selectedChatId !== chatId) {
//     //         chat.unreadCount = (chat.unreadCount || 0) + 1;
//     //       }

//     //       // console.log("addMessage: Added message to existing chat:", chatId, newMessage);
//     //     } else {
//     //       console.log("addMessage: Message already exists:", message._id);
//     //     }
//     //   } else {
//     //     // console.log("addMessage: Creating new chat for ID:", chatId);
//     //     const newChat = {
//     //       id: chatId,
//     //       name: message.sender.name || message.receiver.name || "Unknown User",
//     //       email: message.sender.email || message.receiver.email || "",
//     //       phone: message.sender.phone || message.receiver.phone || "",
//     //       lastMessage: message.message,
//     //       time: message.createdAt || new Date().toISOString(),
//     //       unreadCount: message.sender._id.toString() !== currentUserId && !message.isRead && state.selectedChatId !== chatId ? 1 : 0,
//     //       messages: [{
//     //         _id: message._id?.toString(),
//     //         text: message.message || "Message unavailable",
//     //         fromMe: message.sender._id.toString() === currentUserId,
//     //         createdAt: message.createdAt || new Date().toISOString(),
//     //         isRead: message.isRead || (message.sender._id.toString() === currentUserId || state.selectedChatId === chatId),
//     //       }],
//     //       initials: (message.sender.name || message.receiver.name || "UN")
//     //         .split(" ")
//     //         .map((n) => n[0])
//     //         .join("")
//     //         .slice(0, 2)
//     //         .toUpperCase(),
//     //     };
//     //     state.chatList.push(newChat);
//     //     state.chatList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
//     //     // console.log("addMessage: Added new chat:", newChat);
//     //   }
//     // },
//     // sellerChatSlice.js - addMessage reducer
// addMessage: (state, action) => {
//   const message = action.payload;
//   console.log("Adding message to Redux:", message);

//   const chatUserId = message.sender._id === state.selectedChatId ?
//     message.sender._id : message.receiver._id;

//   const chatIndex = state.chatList.findIndex(chat => chat.id === chatUserId);

//   if (chatIndex !== -1) {
//     // Add message to selected chat
//     if (!state.chatList[chatIndex].messages) {
//       state.chatList[chatIndex].messages = [];
//     }
//     state.chatList[chatIndex].messages.push({
//       ...message,
//       fromMe: message.sender._id === localStorage.getItem("userId")
//     });

//     // Update last message and time
//     state.chatList[chatIndex].lastMessage = message.message;
//     state.chatList[chatIndex].time = message.createdAt;
//   }
// },
//     markChatAsRead(state, action) {
//       const chat = state.chatList.find((c) => c.id === action.payload);
//       if (chat) {
//         chat.messages = chat.messages.map((msg) => ({
//           ...msg,
//           isRead: true,
//         }));
//         chat.unreadCount = 0;
//         // console.log("markChatAsRead: Marked messages as read for chat:", action.payload);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chatList = action.payload.map((chat) => ({
//           ...chat,
//           initials: chat.name
//             ? chat.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()
//             : "UN",
//           messages: chat.messages || [],
//           unreadCount: chat.unreadCount || 0,
//         }));
//       })
//       .addCase(fetchChatList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchChatHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         const chat = state.chatList.find((c) => c.id === action.payload.userId);
//         if (chat) {
//           chat.messages = action.payload.messages;
//           chat.unreadCount = action.payload.unreadCount;
//           if (action.payload.messages.length > 0) {
//             const latestMessage = action.payload.messages[action.payload.messages.length - 1];
//             chat.lastMessage = latestMessage.text;
//             chat.time = latestMessage.createdAt;
//           }
//           // console.log("fetchChatHistory: Updated chat:", chat);
//         } else {
//           console.warn("fetchChatHistory: Chat not found for userId:", action.payload.userId);
//         }
//       })
//       .addCase(fetchChatHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         const message = action.payload;
//         const chat = state.chatList.find(
//           (c) => c.id === message.receiver._id.toString()
//         );
//         if (chat) {
//           chat.messages = chat.messages || [];
//           const existingMessage = chat.messages.find((msg) => msg._id === message._id?.toString());
//           if (!existingMessage) {
//             chat.messages.push({
//               _id: message._id?.toString(),
//               text: message.message || "Message unavailable",
//               fromMe: true,
//               createdAt: message.createdAt || new Date().toISOString(),
//               isRead: message.isRead || false,
//             });
//             chat.lastMessage = message.message;
//             chat.time = message.createdAt;
//             chat.unreadCount = 0;
//             console.log("sendMessage: Added sent message to chat:", chat.id);
//           }
//         } else {
//           console.warn("sendMessage: Chat not found for receiverId:", message.receiver._id);
//         }
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chat = state.chatList.find((c) => c.id === action.payload);
//         if (chat) {
//           chat.messages = chat.messages.map((msg) => ({
//             ...msg,
//             isRead: true,
//           }));
//           chat.unreadCount = 0;
//           // console.log("markMessagesAsRead: Updated unreadCount for chat:", action.payload);
//         }
//       });
//   },
// });

// export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
//   sellerChatSlice.actions;
// export default sellerChatSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const initialState = {
//   chatList: [],
//   selectedChatId: null,
//   mobileView: "both",
//   loading: false,
//   error: null,
// };

// export const fetchChatList = createAsyncThunk(
//   "sellerChat/fetchChatList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get("/api/v1/chat/list", config);
//       console.log("📨 fetchChatList raw response:", response.data);

//       const chatsMap = new Map();
//       response.data.data.forEach((chat) => {
//         const chatId = chat._id?.toString();
//         if (!chatId) {
//           console.warn("Skipping chat with undefined ID:", chat);
//           return;
//         }
//         const existingChat = chatsMap.get(chatId);
//         const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
//         const existingTime = existingChat ? new Date(existingChat.time).getTime() : 0;

//         if (!existingChat || chatTime > existingTime) {
//           chatsMap.set(chatId, {
//             id: chatId,
//             name: chat.name || "Unknown User",
//             email: chat.email || "",
//             phone: chat.phone || "",
//             lastMessage: chat.lastMessage || "",
//             time: chat.time || new Date().toISOString(),
//             unreadCount: chat.unreadCount || 0,
//             messages: [],
//           });
//         }
//       });

//       const chats = Array.from(chatsMap.values()).sort(
//         (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
//       );
//       console.log("✅ fetchChatList mapped chats:", chats);
//       return chats;
//     } catch (error) {
//       console.error("❌ fetchChatList error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat list");
//     }
//   }
// );

// export const fetchChatHistory = createAsyncThunk(
//   "sellerChat/fetchChatHistory",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.get(`/api/v1/chat/history/${userId}`, config);
//       console.log("📨 fetchChatHistory response:", response.data);

//       const checkCurrentUserId = localStorage.getItem("userId");

//     const currentUserId = checkCurrentUserId ? JSON.parse(checkCurrentUserId)._id : null;

//       const messages = response.data.data.map((msg) => ({
//         _id: msg._id?.toString(),
//         message: msg.message,
//         text: msg.message,
//         fromMe: msg.sender._id.toString() === currentUserId,
//         createdAt: msg.createdAt || new Date().toISOString(),
//         isRead: msg.isRead || false,
//         sender: msg.sender,
//         receiver: msg.receiver
//       }));

//       const unreadCount = messages.filter((msg) => !msg.fromMe && !msg.isRead).length;

//       console.log("✅ fetchChatHistory mapped messages:", messages, "unreadCount:", unreadCount);
//       return { userId, messages, unreadCount };
//     } catch (error) {
//       console.error("❌ fetchChatHistory error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch chat history");
//     }
//   }
// );

// export const sendMessage = createAsyncThunk(
//   "sellerChat/sendMessage",
//   async ({ receiverId, message }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       console.log("📤 Sending message to API:", { receiverId, message });
//       const response = await axios.post("/api/v1/chat", { receiverId, message }, config);
//       console.log("✅ sendMessage response:", response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("❌ sendMessage error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to send message");
//     }
//   }
// );

// export const markMessagesAsRead = createAsyncThunk(
//   "sellerChat/markMessagesAsRead",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
//       console.log("✅ Messages marked as read for user:", userId);
//       return userId;
//     } catch (error) {
//       console.error("❌ markMessagesAsRead error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || "Failed to mark messages as read");
//     }
//   }
// );

// const sellerChatSlice = createSlice({
//   name: "sellerChat",
//   initialState,
//   reducers: {
//     setSelectedChatId(state, action) {
//       console.log("🎯 setSelectedChatId: Setting chat ID:", action.payload);
//       state.selectedChatId = action.payload;
//     },

//     setMobileView(state, action) {
//       state.mobileView = action.payload;
//     },

//     // ✅ FIXED: Correct reducer syntax
//     addMessage(state, action) {
//       const message = action.payload;
//       const checkCurrentUserId = localStorage.getItem("userId");

//     const currentUserId = checkCurrentUserId ? JSON.parse(checkCurrentUserId)._id : null;

//       console.log("🔄 addMessage: Processing message:", {
//         messageId: message._id,
//         senderId: message.sender._id,
//         receiverId: message.receiver._id,
//         currentUserId,
//         messageText: message.message || message.text
//       });

//       const chatUserId = message.sender._id === currentUserId
//         ? message.receiver._id
//         : message.sender._id;

//       console.log("💬 Message belongs to chat:", chatUserId);

//       let chat = state.chatList.find((c) => c.id === chatUserId);

//       if (chat) {
//         if (!chat.messages) {
//           chat.messages = [];
//         }

//         const messageExists = chat.messages.some(msg => msg._id === message._id);

//         if (!messageExists) {
//           const newMessage = {
//             _id: message._id,
//             message: message.message || message.text,
//             text: message.message || message.text,
//             fromMe: message.sender._id === currentUserId,
//             createdAt: message.createdAt,
//             isRead: message.isRead || false,
//             sender: message.sender,
//             receiver: message.receiver
//           };

//           chat.messages.push(newMessage);
//           chat.lastMessage = message.message || message.text;
//           chat.time = message.createdAt;

//           if (!newMessage.fromMe && !newMessage.isRead && state.selectedChatId !== chatUserId) {
//             chat.unreadCount = (chat.unreadCount || 0) + 1;
//           }

//           console.log("✅ Message added to existing chat:", chatUserId);
//         } else {
//           console.log("⚠️ Message already exists in chat:", message._id);
//         }
//       } else {
//         console.log("🆕 Creating new chat for:", chatUserId);

//         const newChat = {
//           id: chatUserId,
//           name: message.sender._id === currentUserId ? message.receiver.name : message.sender.name,
//           email: message.sender._id === currentUserId ? message.receiver.email : message.sender.email,
//           phone: message.sender._id === currentUserId ? message.receiver.phone : message.sender.phone,
//           lastMessage: message.message || message.text,
//           time: message.createdAt,
//           unreadCount: message.sender._id !== currentUserId && !message.isRead ? 1 : 0,
//           messages: [{
//             _id: message._id,
//             message: message.message || message.text,
//             text: message.message || message.text,
//             fromMe: message.sender._id === currentUserId,
//             createdAt: message.createdAt,
//             isRead: message.isRead || false,
//             sender: message.sender,
//             receiver: message.receiver
//           }],
//           initials: (message.sender._id === currentUserId ? message.receiver.name : message.sender.name || "UN")
//             .split(" ")
//             .map((n) => n[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase(),
//         };

//         state.chatList.unshift(newChat);
//         console.log("✅ New chat created:", newChat);
//       }

//       state.chatList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
//     },

//     markChatAsRead(state, action) {
//       const chatId = action.payload;
//       const chat = state.chatList.find((c) => c.id === chatId);

//       if (chat) {
//         if (chat.messages) {
//           chat.messages.forEach(msg => {
//             msg.isRead = true;
//           });
//         }
//         chat.unreadCount = 0;
//         console.log("✅ All messages marked as read for chat:", chatId);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chatList = action.payload.map((chat) => ({
//           ...chat,
//           initials: chat.name
//             ? chat.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()
//             : "UN",
//           messages: chat.messages || [],
//           unreadCount: chat.unreadCount || 0,
//         }));
//         console.log("✅ Chat list updated with:", state.chatList.length, "chats");
//       })
//       .addCase(fetchChatList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchChatHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         const { userId, messages, unreadCount } = action.payload;

//         let chat = state.chatList.find((c) => c.id === userId);

//         if (chat) {
//           chat.messages = messages;
//           chat.unreadCount = unreadCount;

//           if (messages.length > 0) {
//             const latestMessage = messages[messages.length - 1];
//             chat.lastMessage = latestMessage.message || latestMessage.text;
//             chat.time = latestMessage.createdAt;
//           }

//           console.log("✅ Chat history loaded for:", userId, "with", messages.length, "messages");
//         } else {
//           console.warn("❌ Chat not found for history:", userId);
//           const newChat = {
//             id: userId,
//             name: "Unknown User",
//             lastMessage: messages.length > 0 ? (messages[messages.length - 1].message || messages[messages.length - 1].text) : "",
//             time: messages.length > 0 ? messages[messages.length - 1].createdAt : new Date().toISOString(),
//             unreadCount: unreadCount,
//             messages: messages,
//             initials: "UN"
//           };
//           state.chatList.push(newChat);
//         }
//       })
//       .addCase(fetchChatHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         const message = action.payload;
//         const checkCurrentUserId = localStorage.getItem("userId");
//     const currentUserId = checkCurrentUserId ? JSON.parse(checkCurrentUserId)._id : null;

//         console.log("✅ sendMessage fulfilled:", message);

//         const chatUserId = message.receiver._id;
//         let chat = state.chatList.find((c) => c.id === chatUserId);

//         if (chat) {
//           if (!chat.messages) chat.messages = [];

//           const messageExists = chat.messages.some(msg => msg._id === message._id);

//           if (!messageExists) {
//             chat.messages.push({
//               _id: message._id,
//               message: message.message,
//               text: message.message,
//               fromMe: true,
//               createdAt: message.createdAt,
//               isRead: true,
//               sender: message.sender,
//               receiver: message.receiver
//             });

//             chat.lastMessage = message.message;
//             chat.time = message.createdAt;
//             chat.unreadCount = 0;

//             console.log("✅ Sent message added to chat:", chatUserId);
//           }
//         } else {
//           const newChat = {
//             id: chatUserId,
//             name: message.receiver.name,
//             lastMessage: message.message,
//             time: message.createdAt,
//             unreadCount: 0,
//             messages: [{
//               _id: message._id,
//               message: message.message,
//               text: message.message,
//               fromMe: true,
//               createdAt: message.createdAt,
//               isRead: true,
//               sender: message.sender,
//               receiver: message.receiver
//             }],
//             initials: message.receiver.name
//               ? message.receiver.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .slice(0, 2)
//                   .toUpperCase()
//               : "UN",
//           };
//           state.chatList.unshift(newChat);
//           console.log("✅ New chat created for sent message:", chatUserId);
//         }

//         state.chatList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(markMessagesAsRead.fulfilled, (state, action) => {
//         const chatId = action.payload;
//         const chat = state.chatList.find((c) => c.id === chatId);

//         if (chat) {
//           if (chat.messages) {
//             chat.messages.forEach(msg => {
//               if (!msg.fromMe) {
//                 msg.isRead = true;
//               }
//             });
//           }
//           chat.unreadCount = 0;
//           console.log("✅ Messages marked as read via API for chat:", chatId);
//         }
//       });
//   },
// });

// export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
//   sellerChatSlice.actions;
// export default sellerChatSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

// Utility to safely get current user ID
const getCurrentUserId = () => {
  try {
    const stored = localStorage.getItem("userId");
    if (!stored) return null;
    return stored.startsWith("{") ? JSON.parse(stored)._id : stored;
  } catch (err) {
    console.error("Failed to parse userId from localStorage:", err);
    return null;
  }
};

const initialState = {
  chatList: [],
  selectedChatId: null,
  mobileView: "both",
  loading: false,
  error: null,
};

// ====================== Thunks ====================== //

export const fetchChatList = createAsyncThunk(
  "sellerChat/fetchChatList",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.get("/api/v1/chat/list", config);
      console.log("📨 fetchChatList raw response:", response.data);

      const chatsMap = new Map();
      response.data.data.forEach((chat) => {
        const chatId = chat._id?.toString();
        if (!chatId)
          return console.warn("Skipping chat with undefined ID:", chat);

        const existingChat = chatsMap.get(chatId);
        const chatTime = chat.time ? new Date(chat.time).getTime() : 0;
        const existingTime = existingChat
          ? new Date(existingChat.time).getTime()
          : 0;

        if (!existingChat || chatTime > existingTime) {
          chatsMap.set(chatId, {
            id: chatId,
            name: chat.name || "Unknown User",
            email: chat.email || "",
            phone: chat.phone || "",
            lastMessage: chat.lastMessage || "",
            time: chat.time || new Date().toISOString(),
            unreadCount: chat.unreadCount || 0,
            messages: [],
          });
        }
      });

      const chats = Array.from(chatsMap.values()).sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      console.log("fetchChatList mapped chats:", chats);
      return chats;
    } catch (error) {
      console.error(
        "fetchChatList error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chat list"
      );
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  "sellerChat/fetchChatHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.get(
        `/api/v1/chat/history/${userId}`,
        config
      );
      console.log("fetchChatHistory response:", response.data);

      const currentUserId = getCurrentUserId();

      const messages = response.data.data.map((msg) => ({
        _id: msg._id?.toString(),
        message: msg.message,
        text: msg.message,
        fromMe: msg.sender._id.toString() === currentUserId,
        createdAt: msg.createdAt || new Date().toISOString(),
        isRead: msg.isRead || false,
        sender: msg.sender,
        receiver: msg.receiver,
      }));

      const unreadCount = messages.filter(
        (msg) => !msg.fromMe && !msg.isRead
      ).length;

      console.log(
        "fetchChatHistory mapped messages:",
        messages,
        "unreadCount:",
        unreadCount
      );
      return { userId, messages, unreadCount };
    } catch (error) {
      console.error(
        "fetchChatHistory error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chat history"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "sellerChat/sendMessage",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      console.log("Sending message to API:", { receiverId, message });
      const response = await axios.post(
        "/api/v1/chat",
        { receiverId, message },
        config
      );
      console.log("send message response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error(
        "sendMessage error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

export const markMessagesAsRead = createAsyncThunk(
  "sellerChat/markMessagesAsRead",
  async (userId, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios.put(`/api/v1/chat/read/${userId}`, {}, config);
      console.log("Messages marked as read for user:", userId);
      return userId;
    } catch (error) {
      console.error(
        "markMessagesAsRead error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark messages as read"
      );
    }
  }
);

// ====================== Slice ====================== //

const sellerChatSlice = createSlice({
  name: "sellerChat",
  initialState,
  reducers: {
    setSelectedChatId(state, action) {
      console.log("🎯 setSelectedChatId: Setting chat ID:", action.payload);
      state.selectedChatId = action.payload;
    },

    setMobileView(state, action) {
      state.mobileView = action.payload;
    },
    addMessage: (state, action) => {
      const msg = action.payload;
      const chatIndex = state.chatList.findIndex(
        (chat) => chat.id === msg.sender._id || chat.id === msg.receiver._id
      );

      if (chatIndex !== -1) {
        state.chatList[chatIndex].messages = [
          ...(state.chatList[chatIndex].messages || []),
          msg,
        ];
        // update lastMessage and time
        state.chatList[chatIndex].lastMessage = msg.message || msg.text;
        state.chatList[chatIndex].time = msg.createdAt;
        // unread count
        if (msg.sender._id !== state.currentUserId) {
          state.chatList[chatIndex].unreadCount =
            (state.chatList[chatIndex].unreadCount || 0) + 1;
        }
      } else {
        // new chat
        state.chatList.push({
          id:
            msg.sender._id === state.currentUserId
              ? msg.receiver._id
              : msg.sender._id,
          name:
            msg.sender._id === state.currentUserId
              ? msg.receiver.name
              : msg.sender.name,
          initials:
            msg.sender._id === state.currentUserId
              ? msg.receiver.name[0]
              : msg.sender.name[0],
          messages: [msg],
          lastMessage: msg.message || msg.text,
          time: msg.createdAt,
          unreadCount: msg.sender._id !== state.currentUserId ? 1 : 0,
        });
      }
    },

    markChatAsRead(state, action) {
      const chatId = action.payload;
      const chat = state.chatList.find((c) => c.id === chatId);

      if (chat) {
        if (chat.messages) chat.messages.forEach((msg) => (msg.isRead = true));
        chat.unreadCount = 0;
        console.log("All messages marked as read for chat:", chatId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload.map((chat) => ({
          ...chat,
          initials: chat.name
            ? chat.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "UN",
          messages: chat.messages || [],
          unreadCount: chat.unreadCount || 0,
        }));
      })
      .addCase(fetchChatList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, messages, unreadCount } = action.payload;

        let chat = state.chatList.find((c) => c.id === userId);

        if (chat) {
          chat.messages = messages;
          chat.unreadCount = unreadCount;
          if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            chat.lastMessage = latestMessage.message || latestMessage.text;
            chat.time = latestMessage.createdAt;
          }
        } else {
          state.chatList.push({
            id: userId,
            name: "Unknown User",
            lastMessage:
              messages.length > 0 ? messages[messages.length - 1].message : "",
            time:
              messages.length > 0
                ? messages[messages.length - 1].createdAt
                : new Date().toISOString(),
            unreadCount,
            messages,
            initials: "UN",
          });
        }
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const message = action.payload;
        const currentUserId = getCurrentUserId();

        const chatUserId = message.receiver._id;
        let chat = state.chatList.find((c) => c.id === chatUserId);

        if (chat) {
          if (!chat.messages) chat.messages = [];

          const messageExists = chat.messages.some(
            (msg) => msg._id === message._id
          );
          if (!messageExists) {
            chat.messages.push({
              _id: message._id,
              message: message.message,
              text: message.message,
              fromMe: true,
              createdAt: message.createdAt,
              isRead: true,
              sender: message.sender,
              receiver: message.receiver,
            });
            chat.lastMessage = message.message;
            chat.time = message.createdAt;
            chat.unreadCount = 0;
          }
        } else {
          state.chatList.unshift({
            id: chatUserId,
            name: message.receiver.name,
            lastMessage: message.message,
            time: message.createdAt,
            unreadCount: 0,
            messages: [
              {
                _id: message._id,
                message: message.message,
                text: message.message,
                fromMe: true,
                createdAt: message.createdAt,
                isRead: true,
                sender: message.sender,
                receiver: message.receiver,
              },
            ],
            initials: message.receiver.name
              ? message.receiver.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "UN",
          });
        }

        state.chatList.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        const chatId = action.payload;
        const chat = state.chatList.find((c) => c.id === chatId);

        if (chat) {
          if (chat.messages)
            chat.messages.forEach((msg) => {
              if (!msg.fromMe) msg.isRead = true;
            });
          chat.unreadCount = 0;
        }
      });
  },
});

export const { setSelectedChatId, setMobileView, addMessage, markChatAsRead } =
  sellerChatSlice.actions;
export default sellerChatSlice.reducer;
