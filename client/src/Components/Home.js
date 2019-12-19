
import React, {Component} from 'react';

import './Styles/Home.scss';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            formValue: ''
        };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  handleChange({target: {value}}) {
      const invalidChars = new RegExp('[^a-zA-Z0-9]', 'g');
      const formValue = value.replace(invalidChars, '').toUpperCase();

      if (value.length > 4) {
        return;
      }  else {
          this.setState({formValue})
      }
  }

  handleSubmit() {
      // send req to backend (does this room user requested exist?)
      // handle redirect if it does

      Promise.resolve(true)
      .then((res) => {
          if (res) {
              this.props.history.push('/watch/' + this.state.formValue);
          }
      })
  }

  handleCreateRoom() {
      // send req to backend (request room id)
      // handle redirect on success

      Promise.resolve('asdf')
      .then((res) => {
          if (res) {
              this.props.history.push('/watch/'+res);
          }
      })
  }

    render() {
        return (
            <div className="home">
                <div className="welcome">
                    <h1>Welcome to YT Together</h1>
                    <h4>Enter a <span>room code</span> or create a room.</h4>
                </div>
                <div className="banner">
                    <h2>Enter Room Code:</h2>
                    <div className="form">
                        <input type="text" value={this.state.formValue} onChange={this.handleChange} placeholder="AZ09" />
                        <button onClick={this.handleSubmit}><span>JOIN</span></button>
                    </div>
                </div>
                <div className="new">
                    <button onClick={this.handleCreateRoom}><span>Create New Room</span></button>
                </div>
            </div>
        );
    }
}

export default Home;