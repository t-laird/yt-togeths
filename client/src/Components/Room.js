import React, { Component } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

class Room extends Component {

  constructor(props) {
    super(props);

    var qRoomId = Object.assign({}, props.match.params);
    var qVideoUrl = Object.assign({}, queryString.parse(props.location.search))
    console.debug(qRoomId);
    console.debug(qVideoUrl);

    this.state = {
      formValue: '',
      roomId: qRoomId.uuid,
      videoUrl: qVideoUrl.videoUrl
    };

    this.socket = io('http://localhost:5000');

    this.socket.on('play', roomId => this.onPlay(roomId));
    this.socket.on('pause', roomId => this.onPause(roomId));
    this.socket.on('join', userName => this.onJoin(userName));
    this.socket.on('leave', userName => this.onLeave(userName));

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.debug = this.debug.bind(this);
    this.join();
  
  }

  handleChange({ target: { value } }) {
    this.setState({ formValue: value });
  }

  // changing video here as a POC for changing video player state
  // later we will change the video upon receipt of a socket event
  handleSubmit() {
    const rawUrl = this.state.videoUrl;
    window.loadVideoByUrl(rawUrl, 1);
  }

  join() {
    this.socket.emit('join', this.state.roomId);
  }

  onJoin(userName) {
    console.log(`${userName} has joined the room`);
  }

  leave() {
    this.socket.emit('leave', this.state.roomId);
  }

  onLeave(userName) {
    console.log(`${userName} has left the room`);
  }

  play() {
    this.socket.emit('play', this.state.roomId);
  }

  onPlay(roomId) {
    console.debug("play the video", roomId);
    window.playVideo();
  }

  pause() {
    this.socket.emit('pause', this.state.roomId);
  }

  onPause(roomId) {
    console.debug("pause the video", roomId);
    window.pauseVideo();
  }

  debug() {
    this.socket.emit('debug', this.state.roomId);
  }

  render() {
    return (
      <div className="room">
        <div className="form">
          <h3>Change video:</h3>
          <input type="text" value={this.state.videoUrl} onChange={this.handleChange} placeholder="enter youtube URL" />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div className="controls">
          <button onClick={this.play}>play</button>
          <button onClick={this.pause}>pause</button>
          <button onClick={this.debug}>debug</button>
        </div>
        <div id="yt-embedded-player">
        </div>
      </div>
    );
  }
}

export default Room;