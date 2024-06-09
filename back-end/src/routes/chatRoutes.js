import { Router } from "express";
import Chat from "../model/Chat.js";

const chatRouter = Router()

chatRouter.get("/", async(_,res)=>{
    const chats = await Chat.find({});
    res.json(chats);
})

export default chatRouter;