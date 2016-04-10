'use strict';

global.jQuery = global.$ = require('jquery');
require('bootstrap-loader');
require('./index.jade');
require('./index.scss');

//components
const React = require('react');
const ReactDOM = require('react-dom');
const Timer = require('./lib/Timer');

const PlayPause = require('./components/PlayPause.jsx');
const Reset = require('./components/Reset.jsx');
const TimerInput = require('./components/TimerInput.jsx');

const timer = new Timer();

ReactDOM.render(<PlayPause timer={timer} />, document.getElementById('playPause'));
ReactDOM.render(<Reset timer={timer} />, document.getElementById('reset'));
ReactDOM.render(<TimerInput timer={timer} />, document.getElementById('timerInput'));