import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './model/User.js';

dotenv.config();

connectDB()

const PORT = process.env.PORT;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`User:${socket.id} has been connected!`);

    socket.on("registerUser", async(data)=>{
        const username = data.username;
        let user = await User.findOne({username});
        if (!user)
            user = new User({username, socketId: socket.id});
        else
            user.socketId = socket.id;
        await user.save();
        console.log("user has been saved");
    })

    socket.on("disconnect", ()=>{
        console.log(`User:${socket.id} has been disconnected!`);
    })

})

server.listen(PORT, ()=> {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})