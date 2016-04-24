'use strict';

const React = require('react');

class PlayPause extends React.Component {
  /**
   * Button for starting and stopping timer
   * @param {{timer:Timer}} props
   */
  constructor(props) {
    super(props);
    this.state = {play: false};
    this.props = props;
    this.clicked = this.clicked.bind(this);
    
    const playState = (play) => this.setState({play: play});
    const timer = props.timer;
    
    timer.on('started', () => playState(true));
    timer.on('stopped', () => playState(false));
    timer.on('end', () => playState(false));
  }
  
  clicked() {
    const play = !this.state.play;
    const timer = this.props.timer;
    
    play ? timer.start() : timer.stop();
  }
  
  render() {
    return <div className='waves-effect waves-light btn-flat' onClick={this.clicked}>
      <i className='material-icons'>{this.state.play ? 'pause' : 'play_arrow'}</i>
    </div>;
  }
}

module.exports = PlayPause;