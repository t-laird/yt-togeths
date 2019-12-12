import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router';
import './App.scss';
import io from 'socket.io-client';
import Room from './Components/Room';
import Home from './Components/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: 0
    };
    this.socket = io('http://localhost:5000');

    this.socket.on('play', roomId => {
      console.log(`room: ${roomId} asked us to play`);
    });

    this.handleChange = this.handleChange.bind(this);
    this.updateRoomId = this.updateRoomId.bind(this);
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.play = this.play.bind(this);
    this.debug = this.debug.bind(this);
  }

  handleChange({target: {value}}) {
    this.setState({formValue: value});
  }

  updateRoomId({target: {value}}) {
    this.setState({roomId: value})
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
      <div className="App">
        <input type="text" value={this.roomId} onChange={this.updateRoomId}></input>
        <button onClick={this.join}>join</button>
        <button onClick={this.leave}>leave</button>
        <button onClick={this.play}>play</button>
        <button onClick={this.debug}>debug</button>
        <Switch>
          <Route component={Room} path="/watch/:uuid"></Route>
          <Route component={Home} path="/"></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
