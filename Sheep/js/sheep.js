export class Sheep {
  constructor(img, stageWidth) {
    // 양의 이미지와 양이 등장할 x위치(스테이지 오른쪽 끝)ㅇ르 파라미터로 받아옴
    this.img = img;

    // 양이미지의 총프레임 수, 시작 프레임(현재 프레임)
    this.totalFrame = 8;
    this.curFrame = 0;

    // 양 한마리 이미지 넓이, 높이
    this.imgWidth = 360;
    this.imgHeight = 300;

    // 그려질 양의 크기
    this.sheepWidth = 180;
    this.sheepHeight = 150;

    this.sheepWidthHalf = this.sheepWidth / 2;
    this.x = stageWidth + this.sheepWidth;
    this.y = 0;
    this.speed = Math.random() * 1 + 1;

    this.fps = 30;
    this.fpsTime = 1000 / this.fps;
  }

  draw(ctx, t, dots) {
    if (!this.time) {
      this.time = t;
    }

    // fpsTime과 비교하여 프레임 수에 맞춰 애니메이션 속도 제어
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.curFrame += 1;
      if (this.curFrame == this.totalFrame) {
        this.curFrame = 0;
      }
    }


    this.animate(ctx, dots);
  }

  animate(ctx, dots) {
    this.x -= this.speed;
    const closest = this.getY(this.x, dots);
    this.y = closest.y;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(closest.rotation);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // ❔ https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Using_images#이미지_자르기
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.sheepWidthHalf,
      -this.sheepHeight + 20,
      this.sheepWidth,
      this.sheepHeight
    );
    ctx.restore();
  }

  // 언덕의 곡선 위의 좌표 찾기 →
  // 여러곡선이 연결된 언덕의 X값(언덕 위 위치)에 해당하는지 확인,
  getY(x, dots) {
    for (let i = 1; i < dots.length; i++) {
      if (x >= dots[i].x1 && x <= dots[i].x3) {
        return this.getY2(x, dots[i]);
      }
    }

    return {
      y: 0,
      rotation: 0
    };
  }

  // 곡선을 촘촘하게 나누고(total) X값과 근사한 곡선 좌표를 찾아냄
  getY2(x, dot) {
    const total = 200;
    let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);

      if (x >= prevX && x <= pt.x) {
        return pt;
      }
      prevX = pt.x;
    }
    return pt;
  }

  // Get points(X, Y) on the Quadratic Bezier Curves
  // ❔ https://en.wikipedia.org/wiki/B%C3%A9zier_curve
  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    const tx = this.quadTangent(x1, x2, x3, t);
    const ty = this.quadTangent(y1, y2, y3, t);
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180);
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
      rotation: rotation,
    };
  }

  // Find the angle parallel to the curve
  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
};