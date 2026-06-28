//cylender
class CYL {
  constructor(x, y, z, len, dir) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.len = len;
    this.dir = dir;
    this.ref = createVector(0, -len/2, 0);
  } //con

  update() {} //ud()

  show() {
    push();
    //angleMode(DEGREES);
    translate(this.x, this.y, this.len / 2);
    rotateZ(this.dir.z);
    rotateY(this.dir.y);
    rotateX(this.dir.x);

    noFill();
    point(0, 0, 0);
    normalMaterial();
    cylinder(3, this.len);
    //pop();
    //push();
    normalMaterial();
    translate(this.ref);
    sphere(4);
    pop();
  } //show()
} //cl
