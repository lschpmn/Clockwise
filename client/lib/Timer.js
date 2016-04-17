'use strict';

const EventEmitter = require('events');
const parse = require('parse-duration');
const bluebird = /**@type {Promise}*/ require('bluebird');
bluebird.config({cancellation: true, warnings: false});

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
    this.emit('tick', this.toString());
  };
  
  /**
   * Attempts to start timer
   * @returns {boolean} true if successfully started timer, otherwise false
   */
  start() {
    if(!this.duration) return false;
    
    this.startTime = Date.now();
    this._loop(0);
    this.emit('running', true);
    return true;
  };
  
  stop() {
    if(!this.startTime) return;
    
    this.heartbeat.cancel();
    this.duration = this.duration - (Date.now() - this.startTime);
    this.startTime = null;
    this.emit('running', false);
  };
  
  reset() {
    this.stop();
    this.duration = this.startingDuration;
    this.emit('tick', this.toString());
  };
  
  get running() {
    return this.startTime != null;
  }
  
  get remainingTime() {
    if(!this.running) return 0;
    
    return this.duration - (Date.now() - this.startTime);
  }
  
  toString() {
    if(isNaN(this.duration)) return '';
    let seconds = 0;
    let second = 1000;
    let minutes = 0;
    let minute = second * 60;
    let hours = 0;
    let hour = minute * 60;
    let days = 0;
    let day = hour * 24;
    //if not running, grab duration, else grab remaining duration since started
    let startDuration = !this.running ? this.duration : this.duration - (Date.now() - this.startTime);
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
  
  valueOf() {
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
        let milliseconds = timeLeft % 1000;
        
        if(timeLeft < 0) {
          this.emit('end');
          return this.stop();
        }
        
        this._loop(milliseconds + 100);//add a hundred milliseconds to avoid race conditions
      })
      .catch(err => console.log(err.stack));
  }
}

module.exports = Timer;