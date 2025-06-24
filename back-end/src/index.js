const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();
require('./db/mongoose');
const requestRouter = require('./routers/request');
const userRouter = require('./routers/user');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_URL,
        methods: ['GET', 'POST', 'PATCH']
    }
});

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(requestRouter);
app.use(userRouter);

io.on('connection', (socket) => {
    console.log('connected new user: ' + socket.id);

    socket.on('join', (roomId) => {
        socket.join(roomId);
        console.log(socket.rooms);
    });

    socket.on('request-approved', ({ _id }, request) => {
        io.in(_id).emit('approved', request);
    })
});

server.listen(port, () => {
    console.log('Server is running');
});
