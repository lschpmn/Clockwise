'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const NotificationSound = require('./NotificationSound.jsx');
const AlarmPopup = require('./AlarmPopup.jsx');

class Muter extends React.Component {
  /**
   * @param {{timer:Timer,soundUrl:String}} props
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {muted: false, ring: false};
    this.clicked = this.clicked.bind(this);
    this.toggleRing = this.toggleRing.bind(this);
  }
  
  componentDidMount() {
    this.props.timer.on('end', () => this.toggleRing(true));
    this.updateAlarmPopup(false);
  }
  
  componentWillUpdate(nextProp, nextState) {
    this.updateAlarmPopup(nextState.ring);
  }
  
  clicked() {
    this.setState({muted: !this.state.muted});
  }
  
  /**
   * @param {Boolean} isRinging
   */
  toggleRing(isRinging) {
    this.setState({ring: isRinging});
  }
  
  updateAlarmPopup(show) {
    ReactDOM.render(<AlarmPopup show={show} toggleRing={this.toggleRing}/>, document.getElementById('alarmPopup'));
  }
  
  render() {
    return <div className='btn-flat waves-effect waves-light' onClick={this.clicked}>
      <i className="material-icons">{this.state.muted ? 'volume_mute' : 'volume_up'}</i>
      <NotificationSound soundUrl={this.props.soundUrl} ring={this.state.ring && !this.state.muted} />
    </div>
  }
}

module.exports = Muter;