import  { useState } from 'react'
import useConversation from '../zustand/useConverstion'
import toast from 'react-hot-toast';
const useSendMessage = () => {
   const [loading , setLoading]=useState(false)
   const {messages , setMessages,selectedConversation}=useConversation()

   const sendMessage=async(message)=>{
    setLoading(true)
    try {
        const res = await fetch(`/api/message/send?receiverId=${selectedConversation._id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({message }),
        });
        const data = await res.json();
        console.log("data from send messages hook", data)
        if (data.error) {
            console.log(data.error)
            throw new Error(data.error)};

        setMessages([...messages, data]);
        //console.log("set messages",  setMessages([...messages, data]))
    } catch (error) {

        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};

return { loading,sendMessage };
};
export default useSendMessage;