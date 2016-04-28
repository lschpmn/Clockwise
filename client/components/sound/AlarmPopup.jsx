'use strict';

const React = require('react');
const bluebird = /**@type {Promise}*/ require('bluebird');

class AlarmPopup extends React.Component {
  /**
   * @param {{show:Boolean,toggleRing:function}} props
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {isGreen: false};
    this.triggered = this.triggered.bind(this);
  }
  
  colorLoop() {
    if(this.props.show) {
      this.setState({isGreen: !this.state.isGreen});
      
      bluebird.delay(500).then(() => this.colorLoop());
    }
  }
  
  triggered() {
    this.props.toggleRing(false);
  }
  
  componentDidUpdate() {
    if(this.props.show) {
      document.getElementById('alarmPopup').firstElementChild.focus();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    //allows props to be set before calling 'colorLoop'
    if(nextProps.show) process.nextTick(() => this.colorLoop());
  }
  
  render() {
    const s = this.props.show;
    const g = this.state.isGreen;
    
    return <div 
      className={`card-panel ${s ? '' : 'hide'} ${g ? 'green' : 'red'}`} 
      tabIndex="0" onKeyDown={this.triggered} 
      onClick={this.triggered}
    >
      
      <i className="material-icons large" style={{textAlign: 'center', width:'100%'}}>alarm_on</i>
    </div>;
  }
}

module.exports = AlarmPopup;