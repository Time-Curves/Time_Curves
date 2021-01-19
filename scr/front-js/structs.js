'use strict';

export class Point {
  constructor(x, y) {
    if (typeof x !== 'number') throw new Error('coordinates must be numbers');
    if (typeof y !== 'number') throw new Error('coordinates must be numbers');
    this.x = x;
    this.y = y;
  }
}


