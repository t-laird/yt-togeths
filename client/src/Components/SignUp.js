import React, { Component } from 'react';
import './Styles/SignUp.css';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      showPass: false,
      username: '',
      screenname: '',
      pw: '',
      confirmpw: '',
      error: null
    };
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  showPassToggle = () => {
    this.setState({
      showPass: !this.state.showPass
    });
  }

  signupUser = async (e) => {
    e.preventDefault();
    const { username, screenname, pw, confirmpw } = this.state;
    const userInfo = {
      un: username, pw, confirmpw, sn: screenname
    };

    const sendUser = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    const userRes = await sendUser.json();

    if (userRes.error){
      this.setState({ error: userRes.error });

      return setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    }

    const user = {sn: screenname, un: username, id: userRes.userId };
    this.props.history.push("/");
    this.props.signInUser({user});
  }

  render() {
    const showPass = this.state.showPass ? 'text' : 'password';
    return (
      <form onSubmit={this.signupUser} className="SignUp">
        <span>{this.state.error}</span>
        <div className="name">
          <input 
            onChange={this.handleInput} 
            type="text" 
            value={this.state.username}
            name="username"
            placeholder="Username" />
          <input 
            onChange={this.handleInput} 
            type="text" 
            name="screenname"
            value={this.state.screenname}
            placeholder="Screenname" />
        </div>
        <div className="pass">
          <label>Show Password</label>
          <input 
            onChange={this.showPassToggle} 
            value={this.state.showPass}
            checked={this.state.showPass}
            name="showPass"
            tabIndex="-1"
            type="checkbox" />
          <input 
            onChange={this.handleInput} 
            type={showPass}
            value={this.state.pw}
            name="pw" 
            placeholder="Password" />
          <input 
            onChange={this.handleInput} 
            type={showPass} 
            value={this.state.confirmpw}
            name="confirmpw" 
            placeholder="Confirm Password" />
        </div>
        <input type="submit" value="Sign Up" />
        <div className="links">
          <Link to="/">HOME</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </form>
    );
  }
}
export default SignUp;