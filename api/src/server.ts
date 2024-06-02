import express from 'express';
import http from 'http';
import {Server} from 'socket.io'
import onConnection from './socket/onConnection';
import fs from 'fs';

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

let allWords: string[] = [];

fs.readFile("./dictionary/ru.json", (err, data) => {
    if (err) {
        console.error("Ошибка чтения файла:", err);
        return;
    }
    
    allWords = JSON.parse(data.toString());
});
const hiddenWord = Array.from('слова')
// Array.from(allWords[Math.floor(Math.random() * allWords.length)])


io.on('connection', (socket) => {
    onConnection(io, socket)
    // console.log('user connect:' + socket.id);
    // console.log(letters_hiddenWord);
    
    socket.on('message', message => {        
        if(checkWordInDictionary(message.message)){
            const checkInWord = wordHasLetter(message.message)
            
            console.log(checkInWord);
            io.emit('message', checkInWord)
            
        } else {
            io.emit('message', 'error')

            console.log('слова нет');
        }
    })
})

function checkWordInDictionary(userWord: string | string[]): boolean{
    return allWords.find(word => word == userWord) ? true : false
    // return true
}

// console.log(wordHasLetter('сосок', convertWordToLetter('слова')))

function wordHasLetter(word: string): wordArray[] {
    const wordArray: wordArray[] = convertWordToLetter(word);

    wordArray.forEach(letter => {
        const letterIndex = hiddenWord.indexOf(letter.letter);
        if (letterIndex!== -1) {
            letter.valid = 'has';
            if (letterIndex === wordArray.indexOf(letter)) {
                letter.valid = 'success';
            }
        } else {
            letter.valid = 'fail';
        }
    });

    return wordArray;
}

function convertWordToLetter(word: string): wordArray[] {
    const letters: wordArray[] = []
    Array.from(word).forEach((letter: string) => letters.push({letter: letter, valid: undefined}))
    
    return letters
}

export interface wordArray {
    letter: string
    valid: 'fail' | 'has' | 'success' | undefined
}

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