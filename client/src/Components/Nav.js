import React from 'react';
import { NavLink } from 'react-router-dom';
import './Styles/Nav.css';

const Nav = ({ user, signout }) => {
  const renderNavComponents = () => {
    if (user.sn && !(/guest/).test(user.sn)) {
      return (
        <nav style={{ gridTemplateColumns: "repeat(3, 150px)" }} className="Nav">
          <NavLink exact to="/">Home</NavLink>
          <span onClick={signout}>Sign Out</span>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      );
    } else {
      return (
        <nav style={{ gridTemplateColumns: "repeat(2, 150px)" }} className="Nav">
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/signin">Sign In</NavLink> 
        </nav>
      );
    }
  };
  
  return renderNavComponents();
}

export default Nav;