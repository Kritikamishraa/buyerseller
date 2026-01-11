// import { createContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// export const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     const userId = user ? JSON.parse(user)._id : null;

//     if (!token || !userId) {
//       console.error("Socket.IO: Token or userId missing");
//       return;
//     }

//     const socketInstance = io("http://localhost:8080", {
//       auth: { token, userId },
//       transports: ["websocket"],
//       reconnection: true,
//     });

//     socketInstance.on("connect", () => {
//       console.log("Socket connected:", socketInstance.id);
//       socketInstance.emit("joinRoom", userId); // join user's room
//     });

//     socketInstance.on("disconnect", (reason) => {
//       console.log("Socket disconnected:", reason);
//     });

//     socketInstance.on("connect_error", (err) => {
//       console.error("Socket connect_error:", err.message);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//       console.log("Socket disconnected on cleanup");
//     };
//   }, []);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };


import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNewConnection } from "../redux/slices/buyerNetworkSlice";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user)._id : null;

    if (!token || !userId) return;
    // const socketInstance = io("http://localhost:8080", {
    const socketInstance = io("https://bizbridgetech.onrender.com", {
      auth: { token, userId },
      transports: ["websocket"],
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      socketInstance.emit("joinRoom", userId);
    });

    socketInstance.on("newConnection", (connection) => {
      console.log("New connection received:", connection);
      dispatch(addNewConnection(connection));
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, [dispatch]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
