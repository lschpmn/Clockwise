'use strict';

const EventEmitter = require('events');
const parse = require('parse-duration');
const bluebird = /**@type {Promise}*/ require('bluebird');
bluebird.config({cancellation: true});

let duration, heartbeat, startingDuration, startTime;

exports = module.exports = new EventEmitter();

/**
 * @param {String} time
 */
exports.setTime = function(time) {
  duration = startingDuration = parse(time);
  if(startTime) startTime = Date.now();//if running, reset startTime to now
};

/**
 * Attempts to start timer
 * @returns {boolean} true if successfully started timer, otherwise false
 */
exports.start = function() {
  if(!duration) return false;
  
  startTime = Date.now();
  loop(0);
  return true;
};

exports.stop = function stop() {
  if(!startTime) return;
  
  heartbeat.cancel();
  duration = duration - (Date.now() - startTime);
  startTime = null;
};

exports.reset = function() {
  duration = startingDuration;
  exports.stop();
};

exports.toString = function() {
  let seconds = 0;
  let second = 1000;
  let minutes = 0;
  let minute = second * 60;
  let hours = 0;
  let hour = minute * 60;
  let days = 0;
  let day = hour * 24;
  let startDuration = duration - (Date.now() - startTime);
  let currDuration = startDuration;
  let secondString, minuteString, hourString, dayString;
  
  while(currDuration >= day) {
    days++;
    currDuration -= day;
  }
  
  while(currDuration >= hour) {
    hours++;
    currDuration -= hour;
  }
  
  while(currDuration >= minute) {
    minutes++;
    currDuration -= minute;
  }
  
  while(currDuration >= second) {
    seconds++;
    currDuration -= second;
  }
  
  dayString = startDuration < day ? '' : `${days} days `;
  hourString = startDuration < hour ? '' : `${hours} hours `;
  minuteString = startDuration < minute ? '' : `${minutes} minutes `;
  secondString = `${seconds} seconds`;
  
  return dayString + hourString + minuteString + secondString;
};

exports.valueOf = function() {
  return duration - (Date.now() - startTime);
};

/**
 * @param {Number} wait
 * @private
 */
function loop(wait) {
  heartbeat = bluebird.delay(wait)
    .then(() => {
      exports.emit('tick', exports.toString()); //send heartbeat
      const timeLeft = duration - (Date.now() - startTime);
      const milliseconds = timeLeft % 1000;
      
      loop(milliseconds || 1000);
    })
    .catch(err => console.log(err.stack));
}