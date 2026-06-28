//static equator, prime/anti meridian, tropics & arctic cirs
function drawtropics() {
  //more like create/init but oh well
  //cap
  let la = createVector(PI / 2, 0, 0);
  let r = srad * cos(radians(23.5));
  let b = srad * -sin(radians(23.5));
  //a nut suck'n way but slider change doesn't update till released
  //x,y,z,rad,dir,strkw,col,360/num
  tocap = new DC(0, b, 0, r, la, 1.5, color(0, 10, 0), 5);
  //can
  r = srad * cos(radians(-23.5));
  b = srad * -sin(radians(-23.5));
  //x,y,z,rad,dir,strkw,col,360/num
  tocan = new DC(0, b, 0, r, la, 1.5, color(0, 10, 0), 5);
  //arctic
  r = srad * cos(radians(66.5));
  b = srad * -sin(radians(66.5));
  //x,y,z,rad,dir,strkw,col,360/num
  arccir = new DC(0, b, 0, r, la, 1.5, color(0, 10, 0), 5);
  //antarctic
  r = srad * cos(radians(-66.5));
  b = srad * -sin(radians(-66.5));
  //x,y,z,rad,dir,strkw,col,360/num
  antcir = new DC(0, b, 0, r, la, 1.5, color(0, 10, 0), 5);
  //eq
  r = srad * cos(radians(0));
  b = srad * -sin(radians(0));
  //x,y,z,rad,dir,strkw,col,360/num
  eq = new DC(0, b, 0, r, la, 1.5, color(0, 10, 0), 5);
  //pm
  la = createVector(0, PI / 2, 0);
  //x,y,z,rad,dir,strkw,col,360/num
  pm = new DC(0, 0, 0, srad, la, 1.5, color(0, 10, 0), 5);
  
  //actual show/draw 
  //trops/cirs
  if (eqpmarcs) {
    push();
    if (tocap) tocap.show();
    if (tocan) tocan.show();
    if (arccir) arccir.show();
    if (antcir) antcir.show();
    if (eq) eq.show();
    if (pm) pm.show();
    pop();
  } //fi
} //trop()
