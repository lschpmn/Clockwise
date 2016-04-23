'use strict';

const React = require('react');

class Reset extends React.Component {
  /**
   * @param {{timer:Timer}} props
   */
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  
  clicked() {
    this.props.timer.reset();
  }
  
  render() {
    return <div className='waves-effect waves-light btn-flat' onClick={this.clicked}>
      <i className="material-icons">replay</i>
    </div>
  }
}

module.exports = Reset;