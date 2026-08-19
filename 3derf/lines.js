//connect the dots actual lines
function drawlines(cyl1V, cyl2V, cyl3V) {
  if (lines) {
    if (l1) {
      push();
      noFill();
      strokeWeight(2);
      stroke(0, 180, 200, 200);
      //if(cyl1V)console.log(cyl1V.mag());
      if (cyl1V && cyl2V) dl3D(cyl1V, cyl2V); //didn't fix must redo
      //line(cyl1V.x, cyl1V.y, cyl1V.z, cyl2V.x, cyl2V.y, cyl2V.z);
      strokeWeight(12);
      stroke(100, 100, 100, 200);
      point(cyl1V);
      pop();
    } //fi l1
    if (l2) {
      push();
      strokeWeight(2);
      stroke(0, 180, 200, 200);
      //console.log(cyl1V)
      if (cyl2V && cyl3V)
        //dl3d(cyl1V,cyl2V)
        line(cyl2V.x, cyl2V.y, cyl2V.z, cyl3V.x, cyl3V.y, cyl3V.z);
      strokeWeight(12);
      stroke(100, 100, 100, 200);
      point(cyl2V);
      pop();
    } //fi l2
    if (l3) {
      push();
      strokeWeight(2);
      stroke(0, 180, 200, 200);
      //console.log(cyl1V)
      if (cyl1V && cyl2V && cyl3V)
        line(cyl3V.x, cyl3V.y, cyl3V.z, cyl1V.x, cyl1V.y, cyl1V.z);
      strokeWeight(12);
      stroke(100, 100, 100, 200);
      point(cyl3V);
      pop();
    } //fi l3
  } //fi
} //drawlines()
