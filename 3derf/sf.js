
//stars
class SF {
  constructor(num, w, h) {
    this.num = num;
    this.size = [];
    this.col = [];
    this.pos = [];
    randomSeed(123);
    //bw
    for (let i = 0; i < this.num; i++) {
      this.size[i] = (random(3));
      this.col[i] = random(100,255);
      this.pos[i] = createVector(random(w), random(h), random(w));//was -srad
    } //4
  } //con

  show() {
    for (let i = 0; i < this.num; i++) {
      //bw
      push();
      noFill();
      translate(-W/2,-H/2,-W/2);//z was 0
      strokeWeight(this.size[i]);
      stroke(this.col[i]);
      point(this.pos[i]);
      pop();
    } //4
  } //sh()
} //sf cl
