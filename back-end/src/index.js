import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
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
})

server.listen(PORT, ()=> {
    console.log(`SERVER IS RUNNING ON PORT:${PORT}`);
})