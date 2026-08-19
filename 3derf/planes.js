function drawplanes() {
  if (planes) {
    if (p1) {
      push();
      if (cyl1V) translate(cyl1V);
      if (cyl1Z) rotateZ(cyl1Z);
      if (cyl1Y) rotateY(cyl1Y);
      if (cyl1X) rotateX(cyl1X);
      fill(150, 100);
      noStroke();
      plane(50, 50);
      pop();
    } //fip1
    if (p2) {
      push();
      if (cyl2V) translate(cyl2V);
      if (cyl2Z) rotateZ(cyl2Z);
      if (cyl2Y) rotateY(cyl2Y);
      if (cyl2X) rotateX(cyl2X);
      fill(150, 100);
      noStroke();
      plane(50, 50);
      pop();
    } //fip2
    if (p3) {
      push();
      if (cyl3V) translate(cyl3V.x, cyl3V.y, cyl3V.z);
      if (cyl3Z) rotateZ(cyl3Z);
      if (cyl3Y) rotateY(cyl3Y);
      if (cyl3X) rotateX(cyl3X);
      fill(150, 100);
      noStroke();
      plane(50, 50);
      pop();
    } //fip3
  } //fi
  if (p4) {
    //push();
    if (cyl1V && cyl2V && cyl3V) {
      let va = createVector(X1, Y1, Z1);
      let vb = createVector(X2, Y2, Z2);
      let vc = createVector(X3, Y3, Z3);

      let nv = p5.Vector.cross(
        p5.Vector.sub(vb, va),
        p5.Vector.sub(vc, va)
      ).normalize();

      push();
      //1st align the plane with the Z axis
      //translate(va.mult(mult));
      translate(va);
     
      // Find rotation angles around X and Y axes
      let aX = atan2(-nv.y, nv.z);
      let aY = atan2(nv.x, sqrt(nv.y ** 2 + nv.z ** 2));

      // Apply rotations
      rotateX(aX);
      rotateY(aY);
      //center
      translate(75,-120, 0);
      // console.log(cent);

      fill(150, 125);
      noStroke();
      plane(500, 500);
      pop();
    } //fi
  } //fip3
} //drpl()
