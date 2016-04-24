'use strict';

const React = require('react');
const NotificationSound = require('./NotificationSound.jsx');

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
  
  render() {
    return <div className='btn-flat waves-effect waves-light' onClick={this.clicked}>
      <i className="material-icons">{this.state.muted ? 'volume_mute' : 'volume_up'}</i>
      <NotificationSound soundUrl={this.props.soundUrl} ring={this.state.ring && !this.state.muted} />
      <div className={this.state.ring ? 'soundOverlay' : ''} onClick={() => this.toggleRing(false)}></div>
    </div>
  }
}

module.exports = Muter;