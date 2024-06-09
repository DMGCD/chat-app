import { Router } from "express";
import Chat from "../model/Chat.js";

const chatRouter = Router()

chatRouter.get("/", async(_,res)=>{
    const chats = await Chat.find({});
    res.json(chats);
})

chatRouter.get('/private-chat', async(req, res)=>{
    const username1 = req.body.username1;
    const username2 = req.body.username2;

    if (username1 === null || username2 === null)
        res.status(400).send({message: "User Id cannot be null"});
    else {
        const combinationOne = `${username1}&${username2}`;
        const combinationTwo = `${username2}&${username1}`;

        const chat = await Chat.findOne({chatName: combinationOne}) || await Chat.findOne({chatName: combinationTwo});
        res.json(chat);
    }

})

export default chatRouter;