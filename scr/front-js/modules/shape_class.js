'use strict';

export default class Shape {
  _pointArr = [];

  constructor() {}

  addPoint(point) {
    this._pointArr.push(point);
  }

  removePoint(point) {
    const pIndex = this._pointArr.findIndex(p => {
     return p.x === point.x && p.y === point.y;
    });
    if (pIndex === -1) return false; 
    this._pointArr.splice(pIndex, 1);
    return true;
  }

}
