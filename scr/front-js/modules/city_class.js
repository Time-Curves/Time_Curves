'use strict';

import Region from "./region_class.js";

export default class Country extends Region {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

}