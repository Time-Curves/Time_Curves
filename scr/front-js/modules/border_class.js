'use strict';

import Shape from './shape_class.js';
import { borderTemplates } from '../line_templates.js'

export default class Border extends Shape {

  constructor(template = borderTemplates.default, cycle = false) {
    super();
    this.template = template;
    this.cycle = cycle;
  }
  
  #useTemplate(ctx) {
    for (const prop in this.template) {
      if (typeof ctx[prop] === 'function') {
        ctx[prop](this.template[prop]);
      } else ctx[prop] = this.template[prop];
    }
  }

  draw(ctx) {
    const pointsArr = this._pointArr;
    console.log(pointsArr);
    const startPoint = pointsArr[0];

    this.#useTemplate(ctx);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y); 
    for (const point of pointsArr) {
      ctx.lineTo(point.x, point.y);
    }
    if (this.cycle) ctx.lineTo(startPoint.x, startPoint.y);
    ctx.stroke();
  }

}
