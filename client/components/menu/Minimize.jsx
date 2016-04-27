'use strict';

const React = require('react');

class Minimize extends React.Component {
  static clicked() {
    fetch('http://localhost:5000/minimize')
      .catch(err => Minimize.clicked()); //infinite error loop! 
  }
  
  render() {
    return <button className="btn-flat waves-effect right valign-wrapper" onClick={Minimize.clicked}>
      <i className="material-icons valign" style={{height: '100%'}}>-</i>
    </button>;
  }
}

module.exports = Minimize;