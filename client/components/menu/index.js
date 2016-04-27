'use strict';

require('./_menu.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const Close = require('./Close.jsx');
const Minimize = require('./Minimize.jsx');

ReactDOM.render(<Close />, document.getElementById('close'));
ReactDOM.render(<Minimize />, document.getElementById('minimize'));