import mongoose from "mongoose";

const ChatModel = mongoose.Schema({
    chatName: { type:String, trim:true, unique: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    // latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
});

const Chat = mongoose.model("Chat", ChatModel);

export default Chat;