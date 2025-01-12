import Conversation from "../DB/models/converstaion.model.js";
import Message from "../DB/models/message.model.js";
//import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	  const {receiverId} = req.query;
		const { message } = req.body;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId:receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);


		res.status(201).json(newMessage);
	
};

export const getMessages = async (req, res) => {
    const {receiverId}= req.query
    const senderId= req.user._id
    let conversation= await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    }).populate("messages")
   if(!conversation){
    return res.status(200).json([])
   }
   
    return res.status(200).json(conversation.messages)
};