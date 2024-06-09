import express, { json } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './model/User.js';
import userRouter from './routes/userRoutes.js';
import Message from './model/Message.js';
import Chat from './model/Chat.js';

dotenv.config();

connectDB()

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(json());

app.use("/api/user", userRouter);

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`User:${socket.id} has been connected!`);


    // User Registration
    socket.on("registerUser", async(data)=>{
        const username = data.username;
        let user = await User.findOne({username});
        if (!user)
            user = new User({username, socketId: socket.id});
        else
            user.socketId = socket.id;
        await user.save();
        console.log("user has been saved");
    });

    socket.on("privateMsg", async ({receiverUsername, msgContent}) => {
        // suppose that every sender has been registered
        const sender = await User.findOne({socketId: socket.id});
        const receiver = await User.findOne({username:receiverUsername});

        if (!receiver)
            socket.to(socket.id).emit("error",{error: `User with ${receiverUsername} isn't found!`});
        else {
            // Access private chat belong to sender and receiver
            const getChat = async() => {
                const chatName1 = `${sender.username}&${receiver.username}`;
                const chatName2 = `${receiver.username}&${sender.username}`;
    
                let chat = await Chat.findOne({ chatName: chatName1 }) || await Chat.findOne({ chatName: chatName2 });
                
                if (!chat){
                    chat = new Chat({
                        chatName:`${sender.username}&${receiver.username}`,
                        isGroupChat:false,
                        users: [sender._id, receiver._id],
                    })
                    chat.save();
                }
                return chat;
            }

            const chat = getChat();

            new Message({
                sender: sender._id,
                content: msgContent,
                chat: chat._id
            }).save();

            socket.to(receiver.socketId).emit("receivePrivateMsg",msgContent);
        }
    })

    socket.on("disconnect", ()=>{
        console.log(`User:${socket.id} has been disconnected!`);
    })
})


server.listen(PORT, ()=> {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})