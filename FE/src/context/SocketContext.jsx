import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const BACKPORT = import.meta.env.VITE_BACKPORT ;
    if (authUser) {
      const socket = io(`http://127.0.0.1:${BACKPORT}`, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // Listen for the online users list from the server
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Notify the server that the user is online
      socket.emit("userConnected", authUser._id);

      // Cleanup on unmount or authUser change
      return () => {
        socket.emit("userDisconnected", authUser._id);
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
