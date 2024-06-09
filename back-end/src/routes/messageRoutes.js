import { Router } from 'express';
import Message from '../model/Message.js';

const messageRouter = Router();

// get messages for chat
messageRouter.get("/:chatId", async(req,res)=>{
    const chatId = req.params.chatId;
    const messages = await Message.find({chat:chatId});
    console.log(messages);
    res.json(messages);
})

export default messageRouter;