'use strict';

const React = require('react');

class TimerInput extends React.Component {
  /**
   * @param {{timer:Timer}} props
   */
  constructor(props) {
    super(props);
    this.state = {timeString: '', val: ''};
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    
    props.timer.on('tick', time => this.setState({timeString: time}));
  }
  
  submit(event) {
    const timer = this.props.timer;
    
    if(event.key === 'Enter') {
      timer.setTime(event.target.value);
      timer.start();
      this.setState({val: ''});
    }
  }
  
  change(event) {
    this.setState({val: event.target.value})
  }
  
  render() {
    return <input placeholder={this.state.timeString} value={this.state.val} onChange={this.change} onKeyPress={this.submit} />
  }
}

module.exports = TimerInput;