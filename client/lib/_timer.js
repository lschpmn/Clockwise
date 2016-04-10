'use strict';

const EventEmitter = require('events');
const parse = require('parse-duration');
const bluebird = /**@type {Promise}*/ require('bluebird');
bluebird.config({cancellation: true});

class Timer extends EventEmitter {
  constructor() {
    super();
  }
  
  /**
   * @param {String} time
   */
  setTime(time) {
    this.duration = this.startingDuration = parse(time);
    if(this.startTime) this.startTime = Date.now();//if running, reset startTime to now
  };
  
  /**
   * Attempts to start timer
   * @returns {boolean} true if successfully started timer, otherwise false
   */
  start() {
    if(!this.duration) return false;
    
    this.startTime = Date.now();
    this._loop(0);
    return true;
  };
  
  stop() {
    if(!this.startTime) return;
    
    this.heartbeat.cancel();
    this.duration = this.duration - (Date.now() - this.startTime);
    this.startTime = null;
  };
  
  reset = function() {
    this.duration = this.startingDuration;
    this.stop();
  };
  
  toString() {
    let seconds = 0;
    let second = 1000;
    let minutes = 0;
    let minute = second * 60;
    let hours = 0;
    let hour = minute * 60;
    let days = 0;
    let day = hour * 24;
    let startDuration = this.duration - (Date.now() - this.startTime);
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
  
  valueOf = function() {
    return this.duration - (Date.now() - this.startTime);
  };
  
  /**
   * @param {Number} wait
   * @private
   */
  _loop(wait) {
    this.heartbeat = bluebird.delay(wait)
      .then(() => {
        this.emit('tick', this.toString()); //send heartbeat
        const timeLeft = this.duration - (Date.now() - this.startTime);
        const milliseconds = timeLeft % 1000;
        
        this._loop(milliseconds || 1000);
      })
      .catch(err => console.log(err.stack));
  }
}

module.exports = Timer;