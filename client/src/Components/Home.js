
import React, {Component} from 'react';
import Controls from './Controls';

class Home extends Component {
    constructor() {
        super();

        this.state = {
        formValue: ''
        };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target: {value}}) {
    this.setState({formValue: value});
  }

    render() {
        return (
            <div className="home">
                <Controls></Controls>
                <div className="form">
                    <input type="text" value={this.state.formValue} onChange={this.handleChange} placeholder="enter youtube URL" />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <div className="yt-embedded-player">
                    home
                </div>
            </div>
        );
    }
}

export default Home;