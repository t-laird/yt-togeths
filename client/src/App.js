import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router';
import './App.scss';
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      formValue: ''
    };
    this.socket = io();

    this.socket.on('message', message => {
    });

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target: {value}}) {
    this.setState({formValue: value});
  }


  render() {
    return (
      <div className="App">
        <div class="form">
          <input type="text" value={this.state.formValue} onChange={this.handleChange} placeholder="enter youtube URL"/>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div class="yt-embedded-player">
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

export default withRouter(App);
