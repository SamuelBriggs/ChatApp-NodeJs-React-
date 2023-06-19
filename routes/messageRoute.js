const router = require("express").Router()
const Message = require("../models/messageModel")
const ChatBox = require("../models/chatBox")
const authMiddleWare = require("../middleware/authMiddleWare")

router.post("/newMessage", authMiddleWare,  async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        const chat = await ChatBox.findById(req.body.chat);
        chat.lastMessage = savedMessage._id;
         await chat.save();
        console.log(req.body)

        res.send({
            success: true,
            message:"Message Sent succesfully",
            data: savedMessage,
        })
    }
    catch(error){
        throw error
        }

});

router.get("/getAllMessages/:chatId", authMiddleWare,  async (req, res) =>{

    try {
        const messages = await Message.find({
            chat:req.params.chatId,})

        console.log(req.params.chatId + "This is the chat Id coming in to request params")

        console.log("this is the messages up here " + messages)
        res.send({
            success:true,
            message:"Messages fetched successfully",
            data:messages,
        });

        }
        catch (error){
        res.send({
            success:false,
            message:"error fetching messages",
            error: error.message
        })}


})
module.exports = router;