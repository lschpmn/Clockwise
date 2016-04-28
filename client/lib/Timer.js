'use strict';

const EventEmitter = require('events');
const parse = require('parse-duration');
const bluebird = /**@type {Promise}*/ require('bluebird');

bluebird.config({cancellation: true, warnings: false});
const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE*60;
const DAY = HOUR*24;

class Timer extends EventEmitter {
  /**
   * @returns {boolean}
   */
  get isRunning() {
    return this.lastTick != null;
  }
  
  reset() {
    this.stop();
    this.timeLeft = this.startingTime;
    this.emit('tick');
  }
  
  /**
   * @param {String} time
   */
  setTime(time) {
    this.timeLeft = this.startingTime = parse(time);
    if(this.isRunning) this.stop();
  };
  
  start() {
    if(this.isRunning || !this.timeLeft) return;
    this.lastTick = Date.now();
    this._loop();
    this.emit('started');
  }
  
  stop() {
    if(this._promise) this._promise.cancel();
    this.timeLeft -= Date.now() - this.lastTick;
    this.lastTick = null;
    this.emit('stopped');
  }
  
  toString() {
    if(!this.timeLeft) return '';
    let secondStr, minuteStr, hourStr, dayStr;
    let seconds = 0, minutes = 0, hours = 0, days = 0;
    const timeStart = Math.ceil(this.timeLeft / 1000);
    let timeLeft = timeStart;
    
    while(timeLeft >= DAY) {
      days++;
      timeLeft -= DAY;
    }
    
    while(timeLeft >= HOUR) {
      hours++;
      timeLeft -= HOUR;
    }
    
    while(timeLeft >= MINUTE) {
      minutes++;
      timeLeft -= MINUTE;
    }
    
    while(timeLeft >= SECOND) {
      seconds++;
      timeLeft -= SECOND;
    }
    
    dayStr = timeStart < DAY ? '' : `${days} days `;
    hourStr = timeStart < HOUR ? '' : `${hours} hours `;
    minuteStr = timeStart < MINUTE ? '' : `${minutes} minutes `;
    secondStr = `${seconds} seconds`;
    
    return dayStr + hourStr + minuteStr + secondStr;
  }
  
  valueOf() {
    return this.timeLeft;
  }
  
  /**
   * @private
   */
  _loop() {
    this.timeLeft -= Date.now() - this.lastTick;
    this.emit('tick');
    
    if(this.timeLeft <= 0) {
      this.emit('end');
      this.lastTick = null;
    } else {
      //'|| 1000' so when time difference is 0, it will still wait a full second 
      const delayTime = (this.timeLeft % 1000 || 1000) + 50;
      
      this.lastTick = Date.now();
      this._promise = /**@type {Promise}*/ bluebird.delay(delayTime).then(() => this._loop());
    }
  }
}

module.exports = Timer;