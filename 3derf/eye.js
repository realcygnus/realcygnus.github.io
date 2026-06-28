function drawbullseye() {
  if (bullseye) {
    //lat rung
    push();
    //must be a better way
    let la = createVector(PI / 2, 0, 0);
    let r = srad * cos(radians(latS.value()));
    let b = srad * -sin(radians(latS.value()));
    //a nut suck'n way but slider change doesn't update till released
    //x,y,z,rad,dir,strkw,col,360/num
    LAT = new DC(0, b, 0, r + 1, la, 1.5, color(100, 0, 0), 5); //eq
    if (LAT) LAT.show();
    pop();

    //lon rung
    push();
    noFill();
    rotateY(-radians(90 - lonS.value()));
    if (LON) LON.show();
    pop();

    // Draw the circle on the sphere
    push();
    translate(cper);
    // //set dir
    rotateY(PI / 2 - theta);
    rotateX(HALF_PI + phi);
    if (cir) cir.show();
    pop();

    //just for the sphere in center of bullseye
    if (cperc) {
      push();
      translate(cperc);
      // rotateZ(cpercZ);
      // rotateY(cpercY);
      // rotateX(cpercX);
      //noFill();
      //strokeWeight(0.5);
      //stroke(0,200,200);
      normalMaterial();
      sphere(5);
      pop();
    } //fi
  } //fi be
} //dbe()
