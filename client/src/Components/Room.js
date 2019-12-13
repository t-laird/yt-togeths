import React, { Component } from 'react';
import Url from 'url-parse';
import Controls from './Controls';

class Room extends Component {
  constructor() {
    super();

    this.state = {
      formValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ formValue: value });
  }

  // changing video here as a POC for changing video player state
  // later we will change the video upon receipt of a socket event
  handleSubmit() {
    const rawUrl = this.state.formValue;
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

  render() {
    return (
      <div className="room">
        <div className="form">
          <h3>Change video:</h3>
          <input type="text" value={this.state.formValue} onChange={this.handleChange} placeholder="enter youtube URL" />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <Controls uuid={this.props.match.params.uuid}></Controls>
        <div id="yt-embedded-player">
          <embed src="http://www.youtube.com/v/GlIzuTQGgzs?version=3&amp;hl=en_US&amp;rel=0&amp;autohide=1&amp;autoplay=1"
            width="100%"
            height="100%"
            wmode="transparent"
            type="application/x-shockwave-flash"
            allowfullscreen="true" title="Adobe Flash Player" />
        </div>
      </div>
    );
  }
}

export default Room;