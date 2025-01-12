import React from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'
import useConversation from '../../zustand/useConverstion.js'

const Message = ({message}) => {
  console.log("your message is " , message)
  const { authUser } = useAuthContext();
  console.log("your auuuthhhh is " , authUser._id)
  const { selectedConversation } = useConversation();
  console.log("your selectedConversationkkkkkk is " , selectedConversation)
  const fromMe = message?.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation.profilePicture;
    console.log("your selectedConversationprofilePicture is " , selectedConversation.profilePicture)
  const bubbleBgColor = fromMe ? "" : "bg-blue-500";
  

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={profilePic} />
        </div>
      </div>
      {/* Accessing the 'message' property directly */}
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message?.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {message?.createdAt}
      </div>
    </div>
  );
};

export default Message;
