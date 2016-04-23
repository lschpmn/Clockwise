'use strict';

const React = require('react');

class TimerInput extends React.Component {
  /**
   * @param {{timer:Timer}} props
   */
  constructor(props) {
    super(props);
    this.state = {timeString: '', val: ''};
    this.props = props;
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    
    props.timer.on('tick', time => this.changeTime(time));
  }
  
  /**
   * @param time
   */
  changeTime(time) {
    if(this.props.timer.remainingTime < 0) this.setState({timeString: ''});
    else this.setState({timeString: time})
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
    return <div className='input-field label-floating container'>
      <input
        id='timerInput'
        value={this.state.val}
        onChange={this.change}
        onKeyPress={this.submit}
        className='col s10 offset-s1'
        type='text'
      />
      <label className='control-label' htmlFor='timerInput'>{this.state.timeString}</label>
    </div>;
  }
}

module.exports = TimerInput;