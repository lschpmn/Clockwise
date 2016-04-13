'use strict';

const React = require('react');
const bluebird = /**@type {Promise}*/ require('bluebird');

class NotificationSound extends React.Component {
  /**
   * @param {{soundUrl:String,ring:Boolean}} props
   */
  constructor(props) {
    super(props);
    this.state = {play: false};
    this.props = props;
  }
  
  componentDidMount() {
    if(this.props.ring) this.heartbeat();
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.ring) this.heartbeat();
  }
  
  heartbeat() {
    const togglePlay = (bool, cb) => this.setState({play: bool}, cb);
    togglePlay(false, () => togglePlay(true)); //clears previous state first
    
    return bluebird
      .delay(650)
      .then(() => togglePlay(false, () => togglePlay(true)))
      .delay(2000)
      .then(() => this.props.ring ? this.heartbeat() : null);
  }
  
  render() {
    return this.state.play ? 
      <audio src={this.props.soundUrl} autoPlay > </audio> : 
      <div></div>;
  }
}

module.exports = NotificationSound;