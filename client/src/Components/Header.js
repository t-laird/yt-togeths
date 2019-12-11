import React from 'react';
import logo from '../logo.png';
import './Styles/Header.css';

const Header = ({ user }) => {
  return (
    <header className="App-header">
      <img src={logo} alt="logo" />
      <a className="back" href="https://t-laird.com">Back to t-laird.com</a>
    </header>
  );
}

export default Header;