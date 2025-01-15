import React from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'
import useConversation from '../../zustand/useConverstion.js'
import { use } from 'react';



const Message = ({message}) => {

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const shakeClass = message.shouldShake ? "shake" : "";

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation.profilePicture;
     const bubbleBgColor = fromMe ? "bg-blue-500" : "";  
  return (
    <div className={`chat ${chatClassName}`}>
    <div className='chat-image avatar'>
      <div className='w-10 rounded-full'>
        <img alt='Tailwind CSS chat bubble component' src={profilePic} />
      </div>
    </div>
    <div className={`chat-bubble text-white ${shakeClass} ${bubbleBgColor} pb-2`}>{message.message}</div>
   
  </div>
  );
};

export default Message;
