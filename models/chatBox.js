const mongoose = require("mongoose")

const chatBoxSchema = new mongoose.Schema(
    {
        chatMembers: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
            ],
        },
        lastMessage: {
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "message"
            }
        },
        unreadMessageCount: {
            type: Number,
            default: 0
        },},
    {timestamps:true
    }
)

module.exports = mongoose.model("chatBox", chatBoxSchema)