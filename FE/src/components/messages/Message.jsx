import React from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'
import useConversation from '../../zustand/useConverstion.js'
import { extractTime } from '../../utils/extractTime.js';
const Message = ({message}) => {
  console.log("your message is " , message)
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const formattedTime = extractTime(message.createdAt);

  const fromMe = message.senderId === authUser.userInstance._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.userInstance.profilePicture
    : selectedConversation.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={profilePic} />
        </div>
      </div>
      {/* Accessing the 'message' property directly */}
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {message.createdAt}
      </div>
    </div>
  );
};

export default Message;
