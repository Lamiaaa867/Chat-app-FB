import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConverstion";
import { decryptMessage } from "../utils/decryption";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages ,selectedConversation} = useConversation();

  useEffect(() => {
   
    socket?.on("newMessage", (newMessage) => {
  
        newMessage.shouldShake = true;

newMessage.message=decryptMessage (newMessage.message,newMessage.sharedKey)
      setMessages([...messages, newMessage]);
    });
  

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages,selectedConversation]);
};
export default useListenMessages;
