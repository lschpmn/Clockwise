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
    return <div className="glyphicon glyphicon-repeat" onClick={this.clicked}></div>
  }
}

module.exports = Reset;