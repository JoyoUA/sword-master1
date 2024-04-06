import express from 'express';
import http from 'http';
import {Server} from 'socket.io'

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
    console.log('user connect:' + socket.id);

    socket.on('chat-message', message => {
        io.emit('chat-message', message)
    })
})