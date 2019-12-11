import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles/MsgInput.css';

class MsgInput extends Component {
  constructor() {
    super();
    this.state = {
      msg: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.msg);

    this.setState({ msg: '' });
  }

  renderForm = () => {
    if (this.props.user.sn) {
      return (
        <form onSubmit={this.handleSubmit} className="MsgInput">
          <input onChange={this.handleChange} type="text" placeholder="Enter your message" value={this.state.msg} name="msg" />
          <input onClick={this.handleSubmit} type="submit" value="Send Message" />
        </form>
      );
    } else {
      return (
        <div className="MsgInput">
          <h3><Link to="/signin">Sign in to Chat</Link> OR <span onClick={this.props.guest}>Chat as a Guest</span></h3>
        </div>
      );
    }
  }

  render() {
    return this.renderForm();
  }
}
export default MsgInput;