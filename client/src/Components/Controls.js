import React, { Component } from 'react';
import io from 'socket.io-client';

class Controls extends Component {
  constructor() {
    super();

    this.state = {
      roomId: 'asdf'
    };

    this.socket = io();

    this.socket.on('play', roomId => {
      console.log(`room: ${roomId} asked us to play`);
      window.player.playVideo();
    });

    this.updateRoomId = this.updateRoomId.bind(this);
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.play = this.play.bind(this);
    this.debug = this.debug.bind(this);
  }

  updateRoomId({ target: {value} }) {
    this.setState({ roomId: value })
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

  debug() {
    this.socket.emit('debug', this.state.roomId);
  }

  render() {
    return (
      <div className="controls">
        <input type="text" value={this.roomId} onChange={this.updateRoomId}></input>
        <button onClick={this.join}>join room</button>
        <button onClick={this.leave}>leave room</button>
        <button onClick={this.play}>play</button>
        <button onClick={this.debug}>debug</button>
      </div>
    );
  }
}

export default Controls;