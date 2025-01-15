import { create } from "zustand";
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => {
    set({ messages });
  },

  messages_text: [],
  setMessages_text: (messages_text) => {
    set({ messages_text });
  },
}));
export default useConversation;
