export default class CanvasController {
  constructor(path) {
    this.canvas = document.getElementById('map');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.map = new Image();
    this.map.src = path;
    this.map.onload = () => this.ctx.drawImage(this.map, 0, 0);
  }

  setDot(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x - 10, y - 10);
    this.ctx.lineTo(x + 1 - 10, y + 1 - 10);
    this.ctx.stroke();
  }

}
