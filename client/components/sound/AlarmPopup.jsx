'use strict';

const React = require('react');

class AlarmPopup extends React.Component {
  /**
   * @param {{show:Boolean,toggleRing:function}} props
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.triggered = this.triggered.bind(this);
  }
  
  triggered() {
    this.props.toggleRing(false);
  }
  
  componentDidUpdate() {
    if(this.props.show) {
      document.getElementById('alarmPopup').firstElementChild.focus();
    }
  }
  
  render() {
    const s = this.props.show;
    
    return <div 
      className={`card-panel ${s ? '' : 'hide'} blue lighten-2`} 
      tabIndex="0" onKeyDown={this.triggered} 
      onClick={this.triggered}
    >
      
      <i className="material-icons large" style={{textAlign: 'center', width:'100%'}}>alarm_on</i>
    </div>;
  }
}

module.exports = AlarmPopup;