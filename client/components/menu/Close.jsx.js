'use strict';

const React = require('react');

class Close extends React.Component {
  static clicked() {
    fetch('http://localhost:5000/close')
      .catch(err => Close.clicked()); //infinite error loop! 
  }
  
  render() {
    return <button className="btn-flat waves-effect waves-red right valign-wrapper" onClick={Close.clicked}>
      <i className="material-icons valign">close</i>
    </button>;
  }
}

module.exports = Close;