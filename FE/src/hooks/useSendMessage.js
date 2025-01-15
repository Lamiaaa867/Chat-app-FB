import { useState } from "react";
import useConversation from "../zustand/useConverstion";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";


import {

  decryptMessage,
  deriveSharedKey,
  encryptMessage,
} from "../utils/decryption";




const useSendMessage = () => {
  const { socket } = useSocketContext();
 
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/message/send?receiverId=${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
     
       // Emit the newMessage event via socket
       socket?.emit("sendMessage",JSON.stringify(data));
      
      if (data.error) {
        console.log(data.error);
        throw new Error(data.error);
      }
      data.message= decryptMessage(data.message, data.sharedKey);
      
      
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};
export default useSendMessage;
