import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = 8080;
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