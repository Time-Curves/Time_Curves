export default class CanvasController {
  constructor(path) {
    this.canvas = document.getElementById('map');
    this.ctx = this.canvas.getContext('2d');
    this.map = new Image();
    this.map.src = path;
    this.map.onload = () => {
      this.canvas.width = this.map.naturalWidth;
      this.canvas.height = this.map.naturalHeight;
      this.ctx.drawImage(this.map, 0, 0, this.canvas.width, this.canvas.height);
    }
    this.functionInstruments = {
      0: this.setDot,
      1: this.drawLine,
      2: this.drug,
      3: this.zoomIn,
    }
    this.zoomFactor = 1;
    this.setActive(0);
  }

  executeActive(x, y) {
    this.active(x, y);
  }

  setActive(id) {
    this.active = this.functionInstruments[id];
  } 

  setDot(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 1, y + 1);
    this.ctx.stroke();
  }

  drawLine(x, y) {
    console.log('line');
  }

  drug(x, y) {
    console.log(x, y);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.ctx.drawImage(this.map, sx, sy, w/z, h/z, 0, 0, w, h);
  }

  zoomIn(x, y) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);
    this.zoomFactor *= 2;
    const z = this.zoomFactor;
    let sx = x - (w/(z*2));
    if (sx < 0) sx = 0;
    console.log(sx, w, w/z);
    let sy = y - (h/(z*2));
    if (sy < 0) sy = 0;
    console.log(sy, h, h/z);
    this.ctx.drawImage(this.map, sx, sy, w/z, h/z, 0, 0, w, h); //middle 924, 906
    //this.setDot(sx, sy);
    //this.setDot(sx + w/z, sy + h/z);
    console.log('Send help!');
  }
}
