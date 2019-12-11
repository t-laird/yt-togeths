const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

app.use('/', express.static(`${__dirname}/client/build`));
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let socketRooms = [];

io.on('connection', socket => {
  io.sockets.emit('welcome', 'hi ⛑️');

  socket.on('connect', () => {
    console.log('client connected');
  });

  socket.on('join-room', joinrequest => {
    socket.join(joinrequest.room.id)
    io.to(joinrequest.room.id).emit('welcome', `User ${socket.id} has joined the room.`)
  });

  socket.on('leave-room', leaverequest => {
    socket.leave(leaverequest.room.id)
    io.to(joinrequest.room.id).emit('GoodBye', `User ${socket.id} has left the room.`)
  });

});

http.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});
