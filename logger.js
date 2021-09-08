'use strict';

const fs = require('fs');
const path = require('path');

//example const logger = new Logger('./', 'test', {'uncaughtException': true, 'warning': true, 'exit': true});
class Logger {
  options = {
    'uncaughtException': () => process.on('uncaughtException', err => this.error(err.stack)),
    'warning': () => process.on('warning', warning => this.warn(warning)),
    'exit': () => process.on('exit', () => this.endServerSession()),
  }
  constructor(dirPath, dirName, processOptions) {
    this.path = path.resolve(dirPath + '/' + dirName);
    this.dirPath = this.path;
    this.lastPath = this.dirPath;
    for (let option in processOptions) {
      if (processOptions[option] === true) this.options[option](); 
    }
    //if (fs.existsSync(this.path)) fs.rmdirSync(this.path, { recursive: true, force: true });  //creates new log file every run
  }

  getDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    this.path = this.path + '/' + year + '/' + month;
    if (!fs.existsSync(this.path)) fs.mkdirSync(this.path, {recursive: true});
    this.path = this.path + '/' + day + '.txt';
    const locDate = new Date().toLocaleString();
    const milliseconds = new Date().getMilliseconds();
    return `\x1b[32m[ ${locDate} ms: ${milliseconds}]\x1b[0m`;
  }

  appendFile(mess, text) {
    const row = this.getDate() + ` ${mess} ${text}\n`;
    fs.appendFileSync(this.path, row);
    this.lastPath = this.path;
    this.path = this.dirPath;
  }

  endServerSession() {
    this.trace('exit application');
    fs.appendFileSync(this.lastPath, '--------------------------------------------------------------------------------------\n');
  }

  trace(text) {
    this.appendFile('\x1b[35m[TRACE]\x1b[0m', text);
  }

  warn(text) {
    this.appendFile('\x1b[33m[WARN]\x1b[0m', text);
  }

  error(text) {
    this.appendFile('\x1b[31m[ERROR]\x1b[0m', text);
  }

}

module.exports = { Logger };
