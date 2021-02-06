
import {
  Hill
} from './hill.js';

import {
  SheepController
} from './sheep.controller.js';

import {
  Sun
} from './sun.js';

class App {
  constructor() {
    // Create Canvas in <body>
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    // ADD elements to draw
    this.sun = new Sun();

    this.hills = [
      new Hill('#f07f7f', 0.2, 10),
      new Hill('#ff6178', 0.5, 8),
      new Hill('#fa255a', 1.4, 5)
    ];

    this.sheepController = new SheepController();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    // Double Size up for Retina Display
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    // RESIZE elements on the canvas
    this.sun.resize(this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    this.sheepController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // DRAW elements
    this.sun.draw(this.ctx, t);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }

    this.sheepController.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};