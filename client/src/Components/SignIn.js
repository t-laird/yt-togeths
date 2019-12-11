import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles/SignIn.css';


class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      showPass: false,
      pw: '',
      un: '',
      error: null
    };
  }

  showPassToggle = () => {
    this.setState({
      showPass: !this.state.showPass
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { un, pw } = this.state;
    const sendUser = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({un, pw})
    });

    const sendRes = await sendUser.json();

    if (sendRes.error) {
      this.setState({error: sendRes.error});
      return setTimeout(() => {
        this.setState({error: null});
      }, 2000);
    }

    this.props.history.push("/");
    this.props.signInUser(sendRes);
  }

  render() {
    const passType = this.state.showPass ? "text" : "password";
    return (
      <form onSubmit={this.handleSubmit} className="SignIn">
        <span>{this.state.error}</span>
        <input name="un" onChange={this.handleChange} value={this.state.un} type="text" placeholder="Username" />
        <input name="pw" onChange={this.handleChange} value={this.state.pw} type={passType} placeholder="Password" />
        <div className="signin">
          <label>Show Password</label>
          <input 
            onChange={this.showPassToggle} 
            value={this.state.showPass}
            checked={this.state.showPass}
            name="showPass"
            tabIndex="-1"
            type="checkbox" />
          <input type="Submit" value="Sign In" />
        </div>
        <div className="links">
          <Link to="/">HOME</Link>
          <Link to="/signin/signup">Sign Up</Link>
        </div>
      </form>
    );
  }
}
export default SignIn;