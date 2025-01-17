import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConverstion";
import { decryptMessage, deriveSharedKey } from "../utils/decryption";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sharedKey = deriveSharedKey(selectedConversation._id, authUser._id);
      newMessage.message = decryptMessage(newMessage.message, sharedKey);
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation]);
};
export default useListenMessages;
