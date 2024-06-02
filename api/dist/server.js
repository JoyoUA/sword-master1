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
const allWords = require('./dictionary/ru.json');
let hiddenWord = getRandomWord();
console.log(hiddenWord);
io.on('connection', (socket) => {
    (0, onConnection_1.default)(io, socket);
    socket.on('message', message => {
        console.log(message);
        const userWord = message.message.toLowerCase();
        if (userWord == hiddenWord.join('')) {
            hiddenWord = getRandomWord();
            io.emit('message', { success: 'wordUnHide' });
            console.log(hiddenWord);
        }
        else if (checkWordInDictionary(userWord)) {
            const checkInWord = wordHasLetter(userWord);
            io.emit('message', { word: checkInWord });
        }
        else {
            io.emit('message', { error: 'wordNotFound' });
        }
    });
});
function checkWordInDictionary(userWord) {
    return allWords.find(word => word.toLowerCase() == userWord.toLowerCase()) ? true : false;
}
function wordHasLetter(word) {
    const wordArray = convertWordToLetter(word);
    wordArray.forEach(letter => {
        const letterIndex = hiddenWord.indexOf(letter.letter);
        if (letterIndex !== -1) {
            letter.valid = 'has';
            if (letterIndex === wordArray.indexOf(letter)) {
                letter.valid = 'success';
            }
        }
        else {
            letter.valid = 'fail';
        }
    });
    return wordArray;
}
function convertWordToLetter(word) {
    const letters = [];
    Array.from(word).forEach((letter) => letters.push({ letter: letter, valid: undefined }));
    return letters;
}
function getRandomWord() {
    return (Array.isArray(allWords) && allWords.length > 0) ? Array.from(allWords[Math.floor(Math.random() * allWords.length)]) : [''];
}
