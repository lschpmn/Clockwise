'use strict';

import App from './App';
import React from "react";
import { render } from 'react-dom';

render(<App />, document.getElementById('app'));

//legacy
/*
global.jQuery = global.$ = require('jquery');
require('./index.jade');
require('./index.scss');
require('./sounds/tone.mp3');

//Materialize css
require('materialize-css/dist/font/material-design-icons/Material-Design-Icons.woff2');
require('materialize-css/dist/css/materialize.min.css');
require('materialize-css/dist/js/materialize.min.js');

//menu controller
require('./components/menu');

//components
const React = require('react');
const ReactDOM = require('react-dom');
const Timer = require('./lib/Timer');
const PlayPause = require('./components/PlayPause.jsx');
const Reset = require('./components/Reset.jsx');
const TimerInput = require('./components/TimerInput.jsx');
const Muter = require('./components/sound/Muter.jsx');

const timer = new Timer();

ReactDOM.render(<PlayPause timer={timer} />, document.getElementById('playPause'));
ReactDOM.render(<Reset timer={timer} />, document.getElementById('reset'));
ReactDOM.render(<TimerInput timer={timer} />, document.getElementById('timerInput'));
ReactDOM.render(<Muter timer={timer} soundUrl="./tone.mp3" />, document.getElementById('muter'));

//notifies electron that the timer went off
timer.on('end', () => {
  fetch('http://localhost:5000/alarm');
});

*/