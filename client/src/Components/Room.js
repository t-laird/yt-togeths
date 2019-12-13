import React, { Component } from 'react';
import Url from 'url-parse';
import queryString from 'query-string';
import io from 'socket.io-client';

class Room extends Component {
  constructor(props) {
    super(props);
    var qRoomId = Object.assign({}, props.match.params);
    var qVideoUrl = Object.assign({}, queryString.parse(props.location.search))
    console.log(qRoomId);
    console.log(qVideoUrl);
    this.state = {
      formValue: '',
      roomId: qRoomId.uuid,
      videoUrl: qVideoUrl.videoUrl
    };

    this.socket = io('http://localhost:5000');

    this.socket.on('play', roomId => {
      console.log(`room: ${roomId} asked us to play`);
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.debug = this.debug.bind(this);
    this.join();
  
  }

  componentDidMount() {
    console.log("component did mount", this);
    console.log("window", window);
    setTimeout(() => this.handleSubmit(), 100);
  }

  handleChange({ target: { value } }) {
    this.setState({ formValue: value });
  }

  // changing video here as a POC for changing video player state
  // later we will change the video upon receipt of a socket event
  handleSubmit() {
    const rawUrl = this.state.videoUrl;
    const videoUrl = new Url(rawUrl, true);

    if (videoUrl.query && videoUrl.query.v) {
      window.player.destroy();

      window.player = new window.YT.Player('yt-embedded-player', {
        height: '390',
        width: '640',
        videoId: videoUrl.query.v 
        // ,
        // events: {
        //   'onReady': onPlayerReady, // TODO addTheseMethods 
        //   'onStateChange': onPlayerStateChange
        // }
      });
    }
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
      <div className="room">
        <div className="form">
          <h3>Change video:</h3>
          <input type="text" value={this.state.videoUrl} onChange={this.handleChange} placeholder="enter youtube URL" />
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.play}>play</button>
          <button onClick={this.debug}>debug</button>
        </div>
        <div id="yt-embedded-player">
          <embed src="http://www.youtube.com/v/GlIzuTQGgzs?version=3&amp;hl=en_US&amp;rel=0&amp;autohide=1&amp;autoplay=1"
            width="100%"
            height="100%"
            wmode="transparent"
            type="application/x-shockwave-flash"
            title="Adobe Flash Player" />
        </div>
      </div>
    );
  }
}

export default Room;