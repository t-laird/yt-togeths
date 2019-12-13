import React, { Component } from 'react';
import io from 'socket.io-client';

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: props.roomId
    };

    this.socket = io('http://localhost:5000');

    this.socket.on('play', roomId => {
      console.log(`room: ${roomId} asked us to play`);
    });

    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.debug = this.debug.bind(this);

    this.join();
  }

  join() {
    this.socket.emit('join-room', this.state.roomId);
  }

  leave() {
    this.socket.emit('leave-room', this.state.roomId);
  }

  play() {
    this.socket.emit('play', this.state.roomId);
  }

  pause() {
    this.socket.emit('pause', this.state.roomId);
  }

  debug() {
    this.socket.emit('debug', this.state.roomId);
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.play}>play</button>
        <button onClick={this.debug}>debug</button>
      </div>
    );
  }
}

export default Controls;