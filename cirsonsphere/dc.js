//draw circle
class DC {
  constructor(startang, endang, radius, dir, stkw, col, num) {
    this.startang = startang;
    this.endang = endang;
    this.radius = radius;
    this.dir = dir.copy();
    this.stkw = stkw;
    this.col = col;
    this.num = num;
    this.points = [];
  } //con

  update() {} //ud() TODO: if needed

  show() {
    push();
    rotateZ(this.dir.z);
    rotateY(this.dir.y);
    rotateX(this.dir.x);
    //beginShape();
    for (let i = this.startang; i < this.endang; i += this.num) {
      let x = this.radius * cos(radians(i));
      let y = this.radius * sin(radians(i));
      this.points.push(createVector(x, y));
      //vertex(x, y);
    } //4
    //endShape(CLOSE);
    for (let i = this.startang; i < this.endang; i += this.num) {
      let x1 = this.radius * cos(radians(i));
      let y1 = this.radius * sin(radians(i));
      let x2 = this.radius * cos(radians(i + this.num));
      let y2 = this.radius * sin(radians(i + this.num));
      noFill();
      //fill(0)
      strokeWeight(this.stkw);
      stroke(this.col);
      line(x1, y1, x2, y2);
      strokeWeight(5);
      point(0, 0, 0);
    } //4
    pop();
  } //show()
} //cl
