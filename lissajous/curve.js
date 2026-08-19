class Curve {

  constructor() {
    this.c = floor(random(256));
    this.path = [];
    this.current = createVector();
  }//Curve constructor

   setX(x) {
    this.current.x = x;
  }//setX()

   setY(y) {
    this.current.y = y;
  }//setY()

   addPoint() {
    this.path.push(this.current);
  }//addPoint()

   reset() {
    this.path = [];
    this.c = floor(random(361));
    loop1 = false;
  }//reset()

   show() {
    stroke(this.c, 360, 360, 150);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let v of this.path) {
      vertex(v.x, v.y);
    }//4
    endShape();

    strokeWeight(8);
    point(this.current.x, this.current.y);
    this.current = createVector();
  }//show()
}//cc
