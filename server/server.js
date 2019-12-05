const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const db = require('./config/db');
const router = require('./config/router');
const cors = require('cors');

const jwt = require('jsonwebtoken'); // TO DELETE

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
const server = http.createServer(app);
const io = socketio(server);

const userService = require('./services/user');
const messageService = require('./services/messages');


  io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){

      const data = jwt.verify(socket.handshake.query.token, 'Q@DAS@R#FASCZXCOasdqwuh12981234', function(err, decoded) {
        
        if(err) {
            console.log(err);
            return next(new Error('Authentication error. Log in again'));
        }
        socket.decoded = decoded;
        next();
      })
  
    } else {
      return next(new Error('Authentication error. Log in again'));
    }    
  })
  .on('connect', function(socket) {

    socket.on('join', async ({ username, room }, callback) => {

      socket.join(room);

      const messages = await messageService.getMessagesByRooom(room);
      callback(messages);

    });

    socket.on('sendMessage', async ({room, message}, callback) => {
    

        await messageService.addMessage ( {
            text: message,
            room: room,
            username: socket.decoded.username
        })
     
        io.to(room).emit('message', { username: socket.decoded.username, text: message});
        callback();
        
    });

  });

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
}); 