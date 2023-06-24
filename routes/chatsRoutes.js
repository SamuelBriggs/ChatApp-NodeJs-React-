const router = require("express").Router();
const chatBox = require("../models/chatBox");
const authMiddleWare = require("../middleware/authMiddleWare")


router.post("/createNewChat", authMiddleWare, async (req, res) => {
    try {
        const newChat = new chatBox();
        newChat.chatMembers = req.body
        const savedChat = await newChat.save()
        await savedChat.populate("chatMembers")
        res.send({
            success:true,
            message: "Chat created successfully",
            data:savedChat
        })
    }
    catch (error){
        res.send({
            success:false,
            message: "Error creating chat",
            error: error.message
        })

    }
})

router.get("/getAllChats", authMiddleWare, async (req, res) => {
    try {
        const chats = await chatBox.find({chatMembers: {$in: [req.body.userId],},

    }).populate("chatMembers");
        res.send({
        success:true,
            message: "Chats fetched successfully",
            data:chats,
        })
    }
    catch (error){
    res.send({
        success:false,
        message: "Error getting chats",
        error : error.message
    })
    }
})

module.exports = router;