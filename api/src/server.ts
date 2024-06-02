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

const allWords: string[] = require('./dictionary/ru.json')


let hiddenWord = getRandomWord();

console.log(hiddenWord);
io.on('connection', (socket) => {
    onConnection(io, socket)
    
    socket.on('message', message => {
        console.log(message);
        
        const userWord = message.message.toLowerCase()
        if(userWord == hiddenWord.join('')){
            hiddenWord = getRandomWord()
            io.emit('message', {success: 'wordUnHide'})
            console.log(hiddenWord);

        } else if(checkWordInDictionary(userWord)){
            const checkInWord = wordHasLetter(userWord)
            io.emit('message', {word: checkInWord})
            
        } else {
            io.emit('message', {error: 'wordNotFound'})
        }
    })
})

function checkWordInDictionary(userWord: string): boolean{
    return allWords.find(word => word.toLowerCase() == userWord.toLowerCase()) ? true : false
}


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

function getRandomWord(): string[] {
    return (Array.isArray(allWords) && allWords.length > 0) ? Array.from(allWords[Math.floor(Math.random() * allWords.length)]) : ['']
}

export interface wordArray {
    letter: string
    valid: 'fail' | 'has' | 'success' | undefined
}