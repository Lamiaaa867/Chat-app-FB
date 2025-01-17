import { BsSend } from "react-icons/bs";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useSendMessage from "../../hooks/useSendMessage.js";
import { deriveSharedKey, encryptMessage } from "../../utils/decryption.js";
import useConversation from "../../zustand/useConverstion.js";
const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const { authUser } = useAuthContext();
	const {selectedConversation}= useConversation()

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
     const sharedKey= deriveSharedKey(authUser._id,selectedConversation._id)
	 sessionStorage.setItem(`${selectedConversation.username}_key`, sharedKey);

    const encryptedMessage=encryptMessage(message,sharedKey)
	
	 await sendMessage(encryptedMessage);
		
		setMessage("");
		
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;