import { useEffect, useState } from "react";
import useConversation from "../zustand/useConverstion";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {
    messages,
    setMessages,
    selectedConversation,
    setMessages_text,
    messages_text,
  } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/message/getMessage?receiverId=${selectedConversation._id}`
        );
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        setMessages(data);
        setMessages_text(data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading, messages_text };
};
export default useGetMessages;
