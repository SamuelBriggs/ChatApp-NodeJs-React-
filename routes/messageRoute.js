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
router.delete("/deleteMessage/:messageId", authMiddleWare, async(req, res) => {
    try{
      await Message.findByIdAndDelete(req.params.messageId)
        res.send({
            success:true,
            message: "Message deleted successfully",
            data: deleted

        })
    }
    catch (error){
        res.send({
            success:false,
            message: "error deleting messages",
            error: error.message
        })
    }





})
module.exports = router;