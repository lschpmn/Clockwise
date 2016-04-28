'use strict';

const React = require('react');

class TimerInput extends React.Component {
  /**
   * @param {{timer:Timer}} props
   */
  constructor(props) {
    super(props);
    const rand = () => Math.random().toString(35).slice(-10);
    this.state = {timeString: '', val: '', inputId: rand(), labelId: rand()};
    this.props = props;
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    
    const timer = props.timer;
    
    timer.on('tick', () => this.changeTime(timer.toString()));
  }
  
  /**
   * @param {String} time
   */
  changeTime(time) {
    if(this.props.timer < 0) this.setState({timeString: ''});
    else this.setState({timeString: time})
  }
  
  submit(event) {
    if(event.key !== 'Enter') return;
    const timer = this.props.timer;
  
    timer.setTime(event.target.value);
    timer.start();
    this.setState({val: ''});
    
    //dom changes
    setTimeout(() => {
      document.getElementById(this.state.inputId).blur();
      document.getElementById(this.state.labelId).classList.remove('active');
    }, 500);
  }
  
  change(event) {
    this.setState({val: event.target.value});
  }
  
  render() {
    return <div className='input-field label-floating container'>
      <input
        id={this.state.inputId}
        value={this.state.val}
        onChange={this.change}
        onKeyPress={this.submit}
        className='col s10 offset-s1'
        type='text'
      />
      <label id={this.state.labelId} className='control-label' htmlFor='timerInput'>{this.state.timeString}</label>
    </div>;
  }
}

module.exports = TimerInput;