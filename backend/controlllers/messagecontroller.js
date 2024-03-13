import Conversation from "../Models/ConverStaionModel.js";
import Message from "../Models/MessageModel.js";

export const sendMessage = async (req,res)=>{
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants:{ $all : [senderId,receiverId]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json({newMessage})
    } catch (error) {
        console.log("ERROR IN SENDMESSAGE MIDDLEWARE!",error.message);
        res.status(400).json({
            message:"Error occured in message sending try again!"
        })
    }
}




export const getMessages = async ( req, res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId,userToChatId]}
        }).populate("messages");

        if(!conversation){
            res.status(200).json({
                message :"nothing to show"
            });
        }

        const messages = conversation.messages;

        res.status(200).json(messages);


    } catch (error) {
        console.log("ERROR OCCURED IN GETMESSAGE CONTROLLER!", error.message);
        res.status(400).json({
            message:"ERROR OCCURED IN GETMESSAGE CONTROLLER!"
        })
    }
}