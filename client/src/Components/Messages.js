import React, { Component } from 'react';
import './Styles/Messages.css';

class Messages extends Component {
  renderMessages = (messages) => {
    return messages.map((message, i) => {
      return <p key={`msg${i}`}>{message.user.sn}: {message.msg}</p>
    });
  }

  componentDidUpdate() {
    this.messages.scrollTop = this.messages.scrollHeight;    
  }
  
  render() {
    const { messages } = this.props;
    return (
      <div ref={(msgs => this.messages = msgs)} className="Messages">
        {this.renderMessages(messages)}
      </div>
    );
  }
}
export default Messages;