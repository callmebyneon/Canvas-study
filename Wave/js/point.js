export class Point {
  // Make points moves up and down
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.05;

    // Random Wave Speed between 0.02~0.05
    // this.speed = 0.02 + (Math.random() * 0.03);

    this.cur = index;
    this.max = Math.random() * 100 + 100;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    //* Math.sin(x) ==> y값(return value)이 -1 ~ 1 사이의 값이 나옴 * max value
    // ===> 최댓값이 this.max & 최솟값이 -this.max
  }
}