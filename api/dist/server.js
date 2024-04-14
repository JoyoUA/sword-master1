"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const onConnection_1 = __importDefault(require("./socket/onConnection"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
io.on('connection', (socket) => {
    (0, onConnection_1.default)(io, socket);
    // console.log('user connect:' + socket.id);
    socket.on('message', message => {
        io.emit('message', message);
    });
});
// const app = require('express')();
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//   cors: {origin : '*'}
// });
// const port = process.env.PORT || 3000;
// io.on('connection', (socket: any) => {
//   console.log('a user connected');
//   socket.on('message', (message: any) => {
//     console.log(message);
//     io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
//   });
//   socket.on('disconnect', () => {
//     console.log('a user disconnected!');
//   });
// });
// httpServer.listen(port, () => console.log(`listening on port ${port}`));
