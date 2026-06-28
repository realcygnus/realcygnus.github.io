//f = 1 for arc & 0 for great circle
class Ark {
  constructor(start, end, radius, f) {
    this.Start = start.copy().normalize();
    this.End = end.copy().normalize();
    this.radius = radius;
    let v1 = start.copy();
    let v2 = end.copy();
    this.circ = 2 * PI * this.radius;
    //dist
    this.dst = p5.Vector.dist(v1, v2);
    //console.log(this.dst);
    this.al = arclen(v1, v2, radius);
    //console.log(this.al);

    if (f === 0) {
      this.m = this.circ / this.al; //or just/dst ?
    } else if (f === 1) {
      this.m = 1;
    } //fi
  } //con

  show() {
    // Draw the arc
    noFill();
    beginShape();
    let numPoints = 200;
    for (let i = 0; i <= numPoints; i++) {
      let t = i / numPoints;
      let pnt = this.calcpoint(t * this.m); //long
      vertex(pnt.x, pnt.y, pnt.z);
    } //4
    endShape();
  } //show()

  calcpoint(t) {
    // Slerp interpolation
    let slerpVec = p5.Vector.slerp(this.Start, this.End, t);
    //slerpVec.normalize()

    // Scale the slerped vector based on radius
    let scaledVec = slerpVec.mult(this.radius);

    return scaledVec;
  } //calcpt()
} //Ark cl

