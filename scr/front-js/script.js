'use strict';

document.addEventListener('DOMContentLoaded', () => {
  //draw background image
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = document.getElementById("map");
  img.addEventListener('load', () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  });

  //handle scroll-range
  const timeMachine = document.getElementById('time');
  timeMachine.value = '2021';
  const currYear = document.getElementById('year');
  timeMachine.addEventListener('input', () => {
    currYear.innerText = timeMachine.value;
  })

  const canvasHolder = document.getElementById('canvas-holder');
  canvasHolder.style.maxWidth = window.innerWidth;
  canvasHolder.style.maxHeight = window.innerHeight;

  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let mouseDown = false;
  canvasHolder.addEventListener('mousedown', e => {
    canvasHolder.style.cursor = 'grabbing';
    mouseDown = true;
    pos = {
      left: canvasHolder.scrollLeft,
      top: canvasHolder.scrollTop,
      x: e.clientX,
      y: e.clientY,
  }
  });
  canvasHolder.addEventListener('mousemove', e => {
    if (!mouseDown) return;
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    canvasHolder.scrollTop = pos.top - dy;
    canvasHolder.scrollLeft = pos.left - dx;
  });
  document.addEventListener('mouseup', () => {
    mouseDown = false;
  });
  canvasHolder.addEventListener('mouseup', () => {
    canvasHolder.style.cursor = 'grab';
  });

})


