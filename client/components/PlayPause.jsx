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
    this.clicked = this.clicked.bind(this);
    
    props.timer.on('running', isRunning => this.setState({play: isRunning}));
  }
  
  clicked() {
    const play = !this.state.play;
    const timer = this.props.timer;
    
    play ? timer.start() : timer.stop();
  }
  
  render() {
    const icon = this.state.play ? 'glyphicon-pause' : 'glyphicon-play';
    
    return <div className={`glyphicon ${icon}`} onClick={this.clicked}></div>;
  }
}

module.exports = PlayPause;