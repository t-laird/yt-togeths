import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.socket = io();

    this.socket.on('message', message => {
    });
  }


  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default withRouter(App);
