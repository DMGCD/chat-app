import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = 8080;
const app = express();
app.use(cors());

const server = http.createServer(app);

server.listen(PORT, ()=> {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
})