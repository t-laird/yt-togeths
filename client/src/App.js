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
        <Switch>
          <Route component={Room} path="/watch/:uuid"></Route>
          <Route component={Home} path="/"></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
