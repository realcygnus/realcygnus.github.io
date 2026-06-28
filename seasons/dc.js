//draw circle
class DC {
  constructor(x, y, z, radius, dir, stkw, col, num) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.dir = dir;
    this.stkw = stkw;
    this.col = col;
    this.num = num;
    this.points = [];
  } //con

  update() {} //todo if needed ud()

  show() {
    push();
    //angleMode(DEGREES);
    translate(this.x, this.y, this.z);
    rotateZ(this.dir.z);
    rotateY(this.dir.y);
    rotateX(this.dir.x);
    //beginShape();
    for (let i = 0; i < 360; i += this.num) {
      let x = this.radius * Math.cos(radians(i));
      let y = this.radius * Math.sin(radians(i));
      this.points.push(createVector(x, y, this.z));
      vertex(x, y, this.z);
    } //4
    //endShape(CLOSE);
    for (let i = 0; i < 360; i += this.num) {
      let x1 = this.radius * Math.cos(radians(i));
      let y1 = this.radius * Math.sin(radians(i));
      let z1 = this.z;
      let x2 = this.radius * Math.cos(radians(i + this.num));
      let y2 = this.radius * Math.sin(radians(i + this.num));
      let z2 = this.z;
      noFill();
      //fill(0)
      strokeWeight(this.stkw);
      //point(this.x,this.y,this.z);
      stroke(this.col);
      line(x1, y1, z1, x2, y2, z2);
      strokeWeight(5);
      point(0, 0, 0);
    } //4
    pop();
  } //show()
} //cl
