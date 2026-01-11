import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputBase,
  Paper,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material";
import { Send, ArrowBack } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedChatId,
  addMessage,
  setMobileView,
  fetchChatHistory,
  sendMessage,
  markMessagesAsRead,
  markChatAsRead,
  fetchChatList,
} from "../redux/slices/sellerChatSlice";
import { SocketContext } from "../Seller/SocketProvider";

// Utility to safely get current user ID
const getCurrentUserId = () => {
  try {
    const stored = localStorage.getItem("userId");
    if (!stored) return null;
    return stored.startsWith("{") ? JSON.parse(stored)._id : stored;
  } catch (err) {
    console.error("Failed to parse userId:", err);
    return null;
  }
};

export default function SellerChat() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const chatList = useSelector((state) => state.sellerChat.chatList);
  const selectedChatId = useSelector(
    (state) => state.sellerChat.selectedChatId
  );
  const mobileView = useSelector((state) => state.sellerChat.mobileView);
  const loading = useSelector((state) => state.sellerChat.loading);

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef(null);

  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);
  const currentUserId = getCurrentUserId();

  // Fetch chat list on mount
  useEffect(() => {
    dispatch(fetchChatList()).catch((err) => {
      console.error("Failed to fetch chat list:", err);
      alert("Failed to load chats");
    });
  }, [dispatch]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      if (currentUserId) socket.emit("joinRoom", currentUserId);
    });

    socket.on("receiveMessage", (message) => {
      if (
        message.receiver._id === currentUserId ||
        message.sender._id === currentUserId
      ) {
        dispatch(addMessage(message));
        if (
          selectedChatId &&
          (message.sender._id === selectedChatId ||
            message.receiver._id === selectedChatId)
        ) {
          dispatch(markMessagesAsRead(selectedChatId));
        }
      }
    });
    socket.on("messagesRead", ({ readerId }) => {
      dispatch(markChatAsRead(readerId));
    });

    socket.on("connect_error", (error) =>
      console.error("Socket connection error:", error)
    );
    socket.on("error", (error) => console.error("Socket error:", error));

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("messagesRead");
      socket.off("connect_error");
      socket.off("error");
    };
  }, [socket, dispatch, selectedChatId, currentUserId]);

  // Mobile view handling
  useEffect(() => {
    dispatch(setMobileView(isMobile ? "list" : "both"));
  }, [isMobile, dispatch]);

  // Fetch chat history when a chat is selected
  useEffect(() => {
    if (!selectedChatId) return;
    dispatch(fetchChatHistory(selectedChatId));
    dispatch(markMessagesAsRead(selectedChatId));
    dispatch(markChatAsRead(selectedChatId));
    if (socket) socket.emit("messagesRead", { readerId: selectedChatId });
  }, [selectedChatId, dispatch, socket]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current && selectedChat?.messages?.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat?.messages?.length]);

  const handleChatSelect = (chatId) => {
    if (!chatId) return alert("Cannot select chat: Invalid ID");
    dispatch(setSelectedChatId(chatId));
    dispatch(markMessagesAsRead(chatId));
    dispatch(markChatAsRead(chatId));
    if (socket) socket.emit("messagesRead", { readerId: chatId });
    if (isMobile) dispatch(setMobileView("chat"));
  };

  const handleSend = async () => {
    if (!input.trim()) return alert("Please enter a message");
    if (!selectedChatId) return alert("Please select a chat");

    try {
      await dispatch(
        sendMessage({ receiverId: selectedChatId, message: input.trim() })
      ).unwrap();
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
      alert(err?.message || "Failed to send message");
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(new Date(time))) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      dispatch(addMessage(message));
      // mark as read only if it's the currently selected chat
      if (
        selectedChat?.id &&
        (message.sender._id === selectedChat.id ||
          message.receiver._id === selectedChat.id)
      ) {
        dispatch(markMessagesAsRead(selectedChat.id));
        dispatch(markChatAsRead(selectedChat.id));
        socket.emit("messagesRead", { readerId: selectedChat.id });
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, dispatch, selectedChat]);

  // Filter chats based on search term
  const filteredChats = chatList.filter((chat) => {
  const name = chat.name?.toLowerCase() || "";
  const lastMsg = chat.lastMessage?.toLowerCase() || "";
  return (
    name.includes(searchTerm.toLowerCase()) ||
    lastMsg.includes(searchTerm.toLowerCase())
  );
});


  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex" }}>
      {/* Chat List */}
      {(mobileView === "list" || !isMobile) && (
        <Paper
          elevation={0}
          sx={{
            width: isMobile ? "100vw" : 340,
            p: 2,
            height: "100vh",
            overflowY: "auto",
            borderRight: { sm: "1px solid #e0e7ef", xs: "none" },
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Chats
          </Typography>
          {/* <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search chats..."
            sx={{
              mb: 2,
              bgcolor: "#f0f4fa",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": { fontSize: 15 },
            }}
          /> */}

          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "#f0f4fa",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": { fontSize: 15 },
            }}
          /> 

          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {loading ? (
              <Typography textAlign="center" color="text.secondary">
                Loading chats...
              </Typography>
            ) : filteredChats.length === 0 ? (
              <Typography textAlign="center" color="text.secondary">
                {/* No chats available */}
                 No chats found
              </Typography>
            ) : (
              filteredChats.map((chat, index) => (
                <Box
                  key={chat.id || `chat-${index}`}
                  onClick={() => handleChatSelect(chat.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1,
                    px: 1,
                    borderRadius: 2,
                    backgroundColor:
                      selectedChatId === chat.id ? "#def0ff" : "transparent",
                    cursor: chat.id ? "pointer" : "default",
                    mb: 0.5,
                    "&:hover": chat.id ? { backgroundColor: "#e5efff" } : {},
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 1.5,
                      fontSize: 18,
                      bgcolor: "#e9f0ff",
                      color: "#3a4d7f",
                    }}
                  >
                    {chat.initials || "UN"}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography fontWeight="bold" noWrap>
                      {chat.name || "Unknown User"}
                    </Typography>
                    <Typography noWrap variant="body2" color="text.secondary">
                      {chat.lastMessage || "No messages yet"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ml: 1,
                      minWidth: 55,
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.disabled">
                      {formatTime(chat.time)}
                    </Typography>
                    {chat.unreadCount > 0 && (
                      <Badge
                        badgeContent={chat.unreadCount}
                        color="primary"
                        sx={{
                          "& .MuiBadge-badge": {
                            fontSize: 10,
                            height: 16,
                            minWidth: 16,
                            padding: "0 4px",
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Paper>
      )}

      {/* Chat Window */}
      {(mobileView === "chat" || !isMobile) && selectedChat ? (
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: "#f3f8ff",
            }}
          >
            {isMobile && (
              <IconButton onClick={() => dispatch(setMobileView("list"))}>
                <ArrowBack />
              </IconButton>
            )}
            <Avatar sx={{ width: 42, height: 42, mr: 1.5 }}>
              {selectedChat.initials || "UN"}
            </Avatar>
            <Typography fontWeight="bold">
              {selectedChat.name || "Unknown User"}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              px: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {selectedChat.messages && selectedChat.messages.length > 0 ? (
              selectedChat.messages.map((msg, idx) => (
                <Box
                  key={msg._id || idx}
                  sx={{
                    alignSelf: msg.fromMe ? "flex-end" : "flex-start",
                    bgcolor: msg.fromMe ? "#cce4ff" : "#e3e6f3",
                    color: msg.fromMe ? "#003366" : "#212b45",
                    px: 3,
                    py: 1.5,
                    borderRadius: "16px",
                    maxWidth: "75%",
                  }}
                >
                  {msg.message || msg.text || "Message unavailable"}
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.disabled"
                  >
                    {formatTime(msg.createdAt)}
                    {msg.fromMe && (msg.isRead ? " ✓✓" : " ✓")}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary" textAlign="center">
                No messages yet
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            sx={{
              display: "flex",
              p: 2,
              gap: 1,
              position: isMobile ? "fixed" : "static",
              bottom: 0,
              left: 0,
              width: isMobile ? "100vw" : "auto",
              bgcolor: "#fff",
            }}
          >
            <InputBase
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              sx={{
                flexGrow: 1,
                bgcolor: "#f0f4fa",
                borderRadius: 8,
                px: 3,
                py: 1.5,
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || loading || !selectedChatId}
              sx={{ bgcolor: "#1976d2", color: "#fff" }}
            >
              <Send />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        !isMobile && (
          <Paper
            elevation={0}
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">
              Select a chat to start messaging
            </Typography>
          </Paper>
        )
      )}
    </Box>
  );
}
