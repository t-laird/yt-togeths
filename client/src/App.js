import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router';
import './App.css';
import io from 'socket.io-client';
import Messages from './Components/Messages';
import MsgInput from './Components/MsgInput';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import Settings from './Components/Settings';
import Nav from './Components/Nav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      msg: null,
      nameChangeErr: null,
      messages: [],
      user: {
      }
    };
    this.socket = io();

    this.socket.on('message', message => {
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  async componentDidMount() {
    const getRecentMessages = await fetch('/api/recentmessages');
    const parseMessages = await getRecentMessages.json();

    const formatMessages = parseMessages.messages.map( async message => {
      const userRes = await fetch(`/api/users/${message.user_id}`);
      const { user } = await userRes.json();

      return { msg: message.message, user};
    });

    const messages = await Promise.all(formatMessages);
    this.setState({ messages });

  }

  sendMessage = (msg) => {
    if (msg.length && this.state.user.sn) {
      this.socket.send({
        msg,
        user: this.state.user
      });
    }
  }

  signInUser = ({ user }) => {
    this.setState({ user });
    this.socket.emit('newuser', user);
  }

  signout = () => {
    this.socket.emit('signout', this.state.user);
    this.setState({ user: {} });
  }

  guest = async () => {
    const getGuestUser = await fetch('/api/guest');
    const { user } = await getGuestUser.json();
    const rand = Math.floor(Math.random() * 10000 + 30000);
    user.sn += rand;

    this.setState({ user });
  }

  updatesn = async (newsn) => {
    if (newsn) {
      const update = await fetch(`/api/users/${this.state.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newsn})
      });
      
      if (update.status === 500) {
        this.setState({ nameChangeErr: 'That name is already taken.'})
        return setTimeout(() => {
          this.setState({ nameChangeErr: null })
        }, 2000);
      }
      
      if (update.status === 204) {
        this.socket.emit('namechange', {old: this.state.user.sn, new: newsn});
        this.setState({ 
          user: Object.assign({}, this.state.user, {sn: newsn})
        });

        this.props.history.push("/");
      }

    }
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <Nav signout={this.signout} user={this.state.user}/>
        <Switch>
          <Route path="/signin/signup" render={(props) => {
            return (
              <SignUp signInUser={this.signInUser} {...props}/>
            );
          }} />          
          <Route path="/signin" render={(props) => {
            return (
              <SignIn signInUser={this.signInUser} {...props}/>
            );
          }} />
          <Route path="/settings" render={(props) => {
            return (
              <Settings nameChangeErr={this.state.nameChangeErr} user={this.state.user} updatesn={this.updatesn} {...props}/>
            );
          }} />
          <Route path="/" render={(props) => {
            return (
              <Fragment>
                <Messages user={this.state.user} messages={this.state.messages} {...props}/>
                <MsgInput guest={this.guest} user={this.state.user} sendMessage={this.sendMessage}/>
              </Fragment>
            );
          }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
