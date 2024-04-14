import express from 'express';
import http from 'http';
import {Server} from 'socket.io'
import onConnection from './socket/onConnection';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    onConnection(io, socket)
    // console.log('user connect:' + socket.id);
    
    socket.on('message', message => {
        
        // io.emit('message', message)
    })
})

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