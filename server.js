"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const winston = require('winston');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});


app.use('/', express.static(`${__dirname}/client/build`));
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


io.on('connection', socket => {
  io.sockets.emit('welcome', 'hi ⛑️');

  socket.on('debug', () => {
    logger.info(`${JSON.stringify(socket.rooms)}`);
  });

  socket.on('join', roomId => {
    socket.join(roomId, () => {
      logger.info(`${socket.id} has joined room: ${roomId}`);
      io.to(roomId).emit('join', socket.id);
    });
  });

  socket.on('leave', roomId => {
    socket.leave(roomId, () => {
      logger.info(`${socket.id} has left room: ${roomId}`);
      io.to(roomId).emit('leave', socket.id);
    });
  });

  socket.on('play', roomId => {
    io.to(roomId).emit('play', roomId);
      logger.info(`${socket.id} pressed play to room: ${roomId}`);
  });

  socket.on('pause', roomId => {
    io.to(roomId).emit('pause', roomId);
    logger.info(`${socket.id} pressed pause to room: ${roomId}`)
  })

});

http.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});
