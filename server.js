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


io.on('connection', socket => {
  io.sockets.emit('welcome', 'hi ⛑️');

  socket.on('connect', () => {
    console.log('client connected');
  });

  socket.on('message', message => {
    io.sockets.emit('message', message);
    const msg = {
      message: message.msg,
      user_id: message.user.id
    };
    database('messages').insert(msg)
      .then(() => {
      })
      .catch(err => {
        console.log(`Error adding message: ${err}`);
      });
  });

  socket.on('newuser', usr => {
    const msg = {
      user: { sn: '🤖CHATBOT🤖'},
      msg: `A new user has connected 👋🏻, hi ${usr.sn}!`
    };
    io.sockets.emit('message', msg);
  });

  socket.on('signout', usr => {
    const msg = {
      user: { sn: '🤖CHATBOT🤖'},
      msg: `A user has disconnected 👋🏻, bye ${usr.sn}!`
    };
    io.sockets.emit('message', msg);
  });

  socket.on('namechange', info => {
    const msg = {
      user: { sn: '🤖CHATBOT🤖' },
      msg: `${info.old} has changed their name to ${info.new}.`
    };

    io.sockets.emit('message', msg);
  });
});

http.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});
