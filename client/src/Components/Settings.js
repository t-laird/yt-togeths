import React, { Component } from 'react';
import './Styles/Settings.css';

class Settings extends Component {
  componentWillMount() {
    const { user } = this.props;    
    if (!user.sn || (/guest/).test(user.sn)) {
      this.props.history.push("/");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updatesn(this.sn.value);
  }

  render() {
    const { user, nameChangeErr } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="Settings">
        <label>Change your Screenname: (Currently {user.sn})</label>
        <input 
          type="text" 
          ref={(input) => this.sn = input} 
          placeholder="New Screenname" />     
        <input
          type="submit"
          value="Change Screenname" />   
          <span>{nameChangeErr}</span>
      </form>
    )
  }
}
export default Settings;
