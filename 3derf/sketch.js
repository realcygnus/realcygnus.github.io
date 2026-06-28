//-55lat,55lat,125lon = 362 
let W = 800; //width & height of canvas
let H = 600;
let srad = 175; // Radius of the sphere
let crad = 58; // Radius of the circle on the sphere def in s3 cradS
//arc surf dists
let sd1 = 0,
  sd2 = 0,
  sd3 = 0;
//kybd glob rot
let xrot = 0,
  yrot = 0,
  zrot = 0;
//glob rot vars fot txt
let gxr, gyr, gzr, gxrT, gyrT, gzrT;
//kybd glob trans
let tranx = 0,
  trany = 0,
  tranz = 0; //lol
//glob trans txt vars
let gxt, gyt, gzt;
//buttons
let b0, b1, b2, b3, b4;
let b0X = W + 5, //info
  b0Y = 5,
  b1X = b0X, //set 1
  b1Y = b0Y + 25,
  b2X = b0X, //set 2
  b2Y = b1Y + 25,
  b3X = b0X, //set 3
  b3Y = b2Y + 25,
  b4X = b0X, //clear sets
  b4Y = b3Y + 25; //clr
//checkboxes
let cb1, cb2, cb3, cb4, cb5, cb6, cb7, cb8, cb9;
let cb1X = W + 1, //stars
  cb1Y = 130,
  cb2X = cb1X, //grid
  cb2Y = cb1Y + 20,
  cb3X = cb1X, //bullseye
  cb3Y = cb2Y + 20,
  cb4X = cb1X, //eq.pm/ac
  cb4Y = cb3Y + 20,
  cb5X = cb4X, //sphere
  cb5Y = cb4Y + 20,
  cb6X = cb5X, //lines
  cb6Y = cb5Y + 20,
  cb7X = cb6X, //arcs
  cb7Y = cb6Y + 20,
  cb8X = cb7X, //cyls
  cb8Y = cb7Y + 20,
  cb9X = cb8X, //planes
  cb9Y = cb8Y + 20;
//Slider pos
let Ssize = W; //slider width
let latS, lonS, cradS; //slider vars
let latSX = 0,
  latSY = H + 5,
  lonSX = 0,
  lonSY = H + 45; //slider pos
let cradSX = 0,
  cradSY = H + 85;
//DOM txt
let fc; //frame cont txt
let fcX = W + 5,
  fcY = H - 285;
let gxrTX = W + 5,
  gxrTY = fcY + 20,
  gyrTX = gxrTX,
  gyrTY = gxrTY + 20,
  gzrTX = gyrTX,
  gzrTY = gyrTY + 20;
//sliders txt
let latST, lonST, cradST;
let latSTX = W / 2 - 26,
  latSTY = H + 22,
  lonSTX = W / 2 - 30,
  lonSTY = H + 64;
let cradSTX = W / 2 - 120,
  cradSTY = H + 104;
//globs
//cirs
let cir, cir1, cir2, cir3; //the circle on the sphere
let lat, lon;
//img / fnt
let img1, img2, fnt;
//rungs
let LAT, LON;
//cir dirs
let cper, cper1, cper2, cper3;
let cper1c, cper2c, cper3c;
//cir angs
let RX1, RY1, RX2, RY2, RX3, RY3;
//cyl dirs
let cyl1V, cyl2V, cyl3V;
let cyl1X, cyl1Y, cyl1Z, cyl2X, cyl2Y, cyl2Z, cyl3X, cyl3Y, cyl3Z;
let c1V, c2V, c3V;
//eq/pm/arccirs
let tocap, tocan, arccir, antcir, eq, pm;
//arx
let arc1, arc2, arc3;
//bullseye
let phi, theta, X, Y, Z;
let X1, Y1, Z1, X2, Y2, Z2, X3, Y3, Z3;
//glob bools
let stars = false;
let grid = false;
let bullseye = true;
let eqpmarcs = false;
//planes
let planes = false,
  p1 = false,
  p2 = false,
  p3 = false,
  p4 = false;
//lines
let lines = false,
  l1 = false,
  l2 = false,
  l3 = false;
//cyls
let cyls = true;
let cyl1, cyl2, cyl3;
let coea = true; //circle copies/lines of equal altitude
//arx
let arcs = false;
let a1 = false,
  a2 = false,
  a3 = false;
//sphere
let sph = true;
//tst sldr
let radS, rv;
//txt 4 surf dists
let sd1T, sd2T, sd3T;
//pos 4 above
let sd1TX = W + 5,
  sd1TY = H - 20;
let sd2TX = W + 5,
  sd2TY = sd1TY - 20;
let sd3TX = W + 5,
  sd3TY = sd2TY - 20;
//cirs arclen
let SR1, SR2, SR3, m1, m2, m3;
//rad multiplyer
let rmS, rm, mult, multS;
//draw
let drawing = [];
let deep, deepM; //like sagita/drop/depth mapped for txt
let vc1,
  vc2,
  vc3,
  ang1 = 0,
  ang2 = 0,
  ang3 = 0,
  angS = 0,
  a12T,
  a23T,
  a31T,
  angST;
let angles;

let scalefact = 200;
let rotX = 0,
  rotY = 0;
let t1, t2, t3, c1, c2, c3;
let eqlat, eqlatT;
let deep1, deep2, deep3;
let cperc,
  cb10,
  cb11,
  cb10V = 1;
//let elt, calculator;

// let elt = document.getElementById("calculator");
// let calculator = Desmos.GraphingCalculator(elt);

function preload() {
  img1 = loadImage("./egg10s.jpg"); //earth with grid
  img2 = loadImage("./e2.jpg"); //plain earth tex
  //img2 = loadImage("./ee.jpg"); //plain earth tex
  //fnt = loadFont("arial.ttf");
  document.oncontextmenu = function () {
    return false; // remove context menu
  }; //doc()
} //pl()

function setup() {
  createCanvas(W, H, WEBGL);

  //alert
  b0 = createButton(" Info ");
  b0.position(b0X, b0Y);
  // b0.style('background-color','#555');
  // b0.style('color','#000');
  b0.mouseClicked(alert1); //NOT pressed FFS
  //3 sets
  b1 = createButton("set pos 1");
  b1.position(b1X, b1Y);
  b2 = createButton("set pos 2");
  b2.position(b2X, b2Y);
  b3 = createButton("set pos 3");
  b3.position(b3X, b3Y);
  b4 = createButton("clear sets");
  //b4.changed(b4e);
  b4.position(b4X, b4Y);
  //starfield toggle
  cb1 = createCheckbox("Stars", false);
  cb1.position(cb1X, cb1Y);
  cb1.changed(cb1e);
  //grid tog
  cb2 = createCheckbox("Grid", false);
  cb2.position(cb2X, cb2Y);
  cb2.changed(cb2e);
  //bullseye/3cir lat/lon locator
  cb3 = createCheckbox("Bullseye", true);
  cb3.position(cb3X, cb3Y);
  cb3.changed(cb3e);
  //eqpmarcs
  cb4 = createCheckbox("eq/pm/ac", false);
  cb4.position(cb4X, cb4Y);
  cb4.changed(cb4e);
  //sphere
  cb5 = createCheckbox("Sphere", true);
  cb5.position(cb5X, cb5Y);
  cb5.changed(cb5e);
  //lines
  cb6 = createCheckbox("Lines", false);
  cb6.position(cb6X, cb6Y);
  cb6.changed(cb6e);
  //arcs
  cb7 = createCheckbox("Arcs", false);
  cb7.position(cb7X, cb7Y);
  cb7.changed(cb7e);
  //cyls
  cb8 = createCheckbox("Cyls", true);
  cb8.position(cb8X, cb8Y);
  cb8.changed(cb8e);
  //planes
  cb9 = createCheckbox("Planes", false);
  cb9.position(cb9X, cb9Y);
  cb9.changed(cb9e);
  //lat vals
  latS = createSlider(-90, 90, 0, 0.5);
  //latS.changed(latsE);
  latS.position(latSX, latSY);
  latS.size(Ssize);
  //lon vals
  lonS = createSlider(-180, 180, 0, 0.5);
  lonS.position(lonSX, lonSY);
  lonS.size(Ssize);
  //cir radius max sphere rad
  cradS = createSlider(0, srad, crad, 0.0001);
  cradS.position(cradSX, cradSY);
  cradS.size(Ssize);
  //4 arc rad val
  radS = createSlider(1.01, 1.5, 1.01, 0.0001);
  radS.position(W, H - 265);
  radS.size(100);
  //radS.hide(); // unhide to find R val for arc rad prob with slerp?
  //radS.changed(radSe); // & line 274
  //cyl multiplyer
  //rmS = createSlider(0, 2, 1,0.0001);
  // rmS = createSlider(srad, srad * 2, srad * 1.5 - 2, 0.0001);
  // rmS.position(W + 5, H - 150);
  // rmS.changed(rmSe);
  //glob mult zoom
  // multS = createSlider(0, 2, 1, 0.0001);
  // multS.position(W + 5, H - 175);
  //multS.changed(rmSe);
  cb10 = createCheckbox("eq arc/gc", false);
  cb10.position(W, H - 220);
  cb10.changed(cb10e);
  //single plane
  cb11 = createCheckbox("1Plane", false);
  cb11.position(W, H - 240);
  cb11.changed(cb11e);

  //stars
  sf = new SF(500, W, H);

  //circle on sphere
  let dir = createVector(0, 0, 0);
  //(x, y, z, radius, dir, stkw, col, num) +1 bc strkwht ?
  cir = new DC(0, 0, 0, cradS.value(), dir, 1.5, color(100, 0, 0), 5);

  //LON rung ...OK here bc it only needs to by Y rotated. no real update
  let lonang = createVector(0, 0, 0);
  //(x, y, z, radius, dir, stkw, col, num) +1 bc strkwht
  LON = new DC(0, 0, 0, srad, lonang, 1.5, color(150, 0, 0), 5); //eq

  //txt FPS
  fc = createDiv("FPS = 0");
  fc.position(fcX, fcY); //fps
  //lat/lon/radius txt
  latST = createDiv("Lat = 0"); //lat
  latST.position(latSTX, latSTY);
  lonST = createDiv("Lon = 0"); //lon
  lonST.position(lonSTX, lonSTY);
  cradST = createDiv("Rad = 0");
  cradST.position(cradSTX, cradSTY); //fps
  // gxr = createDiv("gxr = 0");
  // gxr.position(gxrTX, gxrTY); //gxr
  // gyr = createDiv("gyr = 0");
  // gyr.position(gyrTX, gyrTY); //gyr
  // gzr = createDiv("gzr = 0");
  // gzr.position(gzrTX, gzrTY); //gzr
  sd1T = createDiv("sd1 = 0");
  sd1T.position(sd1TX, sd1TY); //arc surf dists
  sd2T = createDiv("sd2 = 0");
  sd2T.position(sd2TX, sd2TY); //arc surf dists
  sd3T = createDiv("sd3 = 0");
  sd3T.position(sd3TX, sd3TY); //arc surf dists
  //angs between vecs
  a12T = createDiv("a12 = 0");
  a12T.position(W + 5, H - 100);
  a23T = createDiv("a23 = 0");
  a23T.position(W + 5, H - 120);
  a31T = createDiv("a31 = 0");
  a31T.position(W + 5, H - 140);
  //sum
  angST = createDiv("angS = 0");
  angST.position(W + 5, H - 160);
  //bev
  eqlatT = createDiv("eqlat = 0");
  eqlatT.position(W + 5, H - 200);

  //4 WGL anti-alias ?
  smooth(6);

  //evts right click block ... some browsers? ... same as in preload ?
  window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  }); //resize wr()better but jic
} //su()

function draw() {
  background(0);
  orbitControl(1);
  
  //desmo();
  
// var elt = document.getElementById("calculator");
// var calculator = Desmos.GraphingCalculator(elt);

  mult = radS.value();

  //console.log(rotX);
  let mx = map(rotX, 0, 2 * PI, 0, (rotX % 2) * PI);

  //do NOT push/pop like global axis rel to orbitctl()
  //better to use rot matrix bc no quaternions
  translate(tranx, trany, tranz); //only need z really
  rotateZ(zrot);
  rotateY(xrot); //x & y swap don't even ask
  rotateX(yrot);
  //scale(mult);

  // Draw the sphere & texture
  if (sph) {
    push();
    noStroke(0);
    //stroke(0);
    ambientLight(175);
    pointLight(100, 100, 100, -width / 2, -height / 2, 500);
    //ambientMaterial(100);
    specularMaterial(100);
    shininess(3);
    rotateY(PI);
    if (grid === true) texture(img1);
    if (grid === false) texture(img2);
    sphere(srad, 48, 48); //.rotateY(angleY);
    pop();
  } //fi sp

  // Get values from sliders
  let lat = latS.value();
  let lon = lonS.value();
  let newcrad = cradS.value();
  //rv = radS.value();
  //console.log(rv);

  //draw the text
  //less frequent display for less jitter
  if (frameCount % 20 === 0) fc.html("FPS = " + round(frameRate()));
  latST.html("Lat = " + lat);
  lonST.html("Lon = " + lon);
  sd1T.html("sd1 = " + sd1); //sufr dists
  sd2T.html("sd2 = " + sd2);
  sd3T.html("sd3 = " + sd3);
  //angs
  a12T.html("a12 = " + round(ang1, 2));
  a23T.html("a23 = " + round(ang2, 2));
  a31T.html("a31 = " + round(ang3, 2));
  angST.html("angS = " + angS); //sum
  if (c3) eqlatT.html("eqlat = " + c3);

  // If the circle radius changes, update it
  if (newcrad !== crad) {
    crad = newcrad;
    let dir = createVector(0, 0, 0);
    //(x, y, z, radius, dir, stkw, col, num) +1 bc strkwht ?
    cir = new DC(0, 0, 0, crad, dir, 1.5, color(100, 0, 0), 5); //Beye circ
  } //fi cir rad

  // Convert latitude and longitude to radians
  phi = radians(90 + lat);
  theta = radians(90 - lon);

  // sphereical to cartesian. glad this was well known
  X = srad * sin(phi) * cos(theta);
  Y = srad * cos(phi);
  Z = srad * sin(phi) * sin(theta);

  // set circle's perimeter along sphere's normal by sqrt(Srad^2 - Crad^2)
  cper = createVector(X, Y, Z);
  cper.normalize();
  cper.mult(sqrt(srad ** 2 - crad ** 2));

  //here ratio of regular 2D radius to surf arclenth of circ on sphere
  //ah ha! accurate enough, F haversine, but does loose precision when small
  let b = srad * asin(crad / srad);
  let c = map(b, 0, 274.889, 0, 0.25 * 2 * PI * 3959); //247 based on 175
  //console.log(c);//above is 1/4 circum 6218
  //m2 = map(SR1,0, 6218, 0, 3959);
  let Rc = map(crad, 0, srad, 0, 3959);
  //let m1 = map(srad, 0, 175, 0, 0.25 * 2 * PI * 3959);
  //let a  = sqrt((m1**2 + R**2) - (m1**2 - R**2));//close but no!
  let d = map(srad, 0, 175, 0, 3959);
  deep = srad - sqrt(srad ** 2 - crad ** 2); //like sagita/drop
  deepM = d - sqrt(d ** 2 - Rc ** 2); //like sagita
  cradST.html(
    "Rad = " +
      round(Rc, 2) +
      " Srad = " +
      round(c, 2) +
      " Sagita = " +
      round(deepM, 2)
  );
  //todo redo ALL mappings bc pixel space Vs actual r-vals for txt#'s'

  //for new copy
  cperc = createVector(X, Y, Z);
  cperc.normalize();
  cperc.mult(sqrt(srad ** 2 - crad ** 2) + deep);
  cpercY = PI / 2 - theta;
  cpercX = HALF_PI + phi;
  cpercZ = 0;

  //set copy 1
  b1.mousePressed(() => {
    cper1 = createVector(X, Y, Z);
    cper1.normalize();
    cper1.mult(sqrt(srad ** 2 - crad ** 2));
    let dir = createVector(0, 0, 0);
    //(x, y, z, radius, dir, stkw, col, num) +1 bc strkwht ?
    cir1 = new DC(0, 0, 0, crad, dir, 0.5, color(0, 0, 0), 5);
    RY1 = PI / 2 - theta;
    RX1 = HALF_PI + phi;
    //});
    cper1c = createVector(X, Y, Z);
    cper1c.normalize();
    cper1c.mult(sqrt(srad ** 2 - crad ** 2) + deep);
    cper1cY = PI / 2 - theta;
    cper1cX = HALF_PI + phi;
    cper1Z = 0;
    //deep1 = deep;

    //cyl1
    X1 = X;
    Y1 = Y;
    Z1 = Z;

    cyl1V = createVector(X, Y, Z);
    cyl1V.normalize();
    deep1 = srad - sqrt(srad ** 2 - crad ** 2);
    cyl1V.mult(sqrt(srad ** 2 - crad ** 2)); //+deep kinda works but we want the cir copies to be 0 rad anyway for the main demo
    let dir2 = createVector(PI / 2, 0, 0);
    //(x, y, z, radius, dir)
    cyl1 = new CYL(0, 0, 0, srad / 2, dir2);
    if (cyl1V) cyl1V.mult(1.01);
    //if (cyl1V) cyl1V.z = (deepM);

    cyl1Y = PI / 2 - theta;
    cyl1X = HALF_PI + phi;
    cyl1Z = 0;
    p1 = true;
    //l1=true;
    t1 = theta;
  });

  if (cyl1V) {
    //cyl1V = null;
    //cyl1 = null;
    cyl1V = createVector(X1, Y1, Z1);
    cyl1V.normalize();
    cyl1V.mult(sqrt(srad ** 2 - crad ** 2) + deep);
    let dir1 = createVector(PI / 2, 0, 0);
    //(x, y, z, radius, dir)
    cyl1 = new CYL(0, 0, 0, srad / 2, dir1);
    cyl1V.mult(mult);
  } //fi

  //set copy 2
  b2.mousePressed(() => {
    cper2 = createVector(X, Y, Z);
    cper2.normalize();
    cper2.mult(sqrt(srad ** 2 - crad ** 2));
    let dir = createVector(0, 0, 0);
    //(x, y, z, radius, dir, stkw, col, num) +1 bc strkwht ?
    cir2 = new DC(0, 0, 0, crad, dir, 0.5, color(0, 0, 0), 5);
    RY2 = PI / 2 - theta;
    RX2 = HALF_PI + phi;
    //});
    cper2c = createVector(X, Y, Z);
    cper2c.normalize();
    cper2c.mult(sqrt(srad ** 2 - crad ** 2) + deep);
    cper2cY = PI / 2 - theta;
    cper2cX = HALF_PI + phi;
    cper2Z = 0;

    //cyl2
    X2 = X;
    Y2 = Y;
    Z2 = Z;
    //deep2 = deep;

    cyl2V = createVector(X, Y, Z);
    cyl2V.normalize();
    deep2 = srad - sqrt(srad ** 2 - crad ** 2);
    cyl2V.mult(sqrt(srad ** 2 - crad ** 2));
    let dir3 = createVector(PI / 2, 0, 0);
    //(x, y, z, dir)
    cyl2 = new CYL(0, 0, 0, srad / 2, dir3);
    if (cyl2V) cyl2V.mult(1.01);
    cyl2Y = PI / 2 - theta;
    cyl2X = HALF_PI + phi;
    cyl2Z = 0;
    //p1 = true;
    //cb6.checked(true); //lines
    //lines = true;
    p2 = true;
    l1 = true;
    l2 = true;
    //l2 = true;
    a1 = true;
    //a2 = true;
    t2 = theta;
    //4 Bev *3.05
    t3 = t2 - t1;
    //3.05 / deg
    //360*2*PI*srad
    //6908.72
    //GE 2844 P 2840 3D
    c1 = srad * cos(radians(lat));
    c2 = c1 * t3;
    c3 = abs(round(map(c2, 0, 2 * PI * 175, 0, 2 * PI * 3959), 2));
    //console.log(m);
    //let s1 = srad * -sin(radians(t3));
  });

  if (cyl2V) {
    //cyl2V = null;
    //cyl2 = null;
    cyl2V = createVector(X2, Y2, Z2);
    cyl2V.normalize();
    cyl2V.mult(sqrt(srad ** 2 - crad ** 2) + deep);
    let dir2 = createVector(PI / 2, 0, 0);
    //(x, y, z, radius, dir)
    cyl2 = new CYL(0, 0, 0, srad / 2, dir2);
    cyl2V.mult(mult);
  } //fi

  //set copy 3
  b3.mousePressed(() => {
    cper3 = createVector(X, Y, Z);
    cper3.normalize();
    cper3.mult(sqrt(srad ** 2 - crad ** 2));
    let dir = createVector(0, 0, 0);
    //(x, y, z, radius, dir, stkw, col, num) +1 bc strkwht ?
    cir3 = new DC(0, 0, 0, crad, dir, 0.5, color(0, 0, 0), 5);
    RY3 = PI / 2 - theta;
    RX3 = HALF_PI + phi;
    // to auto clear after #3 set
    // cb2.checked(false); //grd
    // grid = false;
    // cb4.checked(false); //eq
    // eqpmarcs = false;
    //});
    cper3c = createVector(X, Y, Z);
    cper3c.normalize();
    cper3c.mult(sqrt(srad ** 2 - crad ** 2) + deep);
    cper3cY = PI / 2 - theta;
    cper3cX = HALF_PI + phi;
    cper3cZ = 0;

    //cyl3
    X3 = X;
    Y3 = Y;
    Z3 = Z;
    //deep3 = deep;

    cyl3V = createVector(X, Y, Z);
    cyl3V.normalize();
    deep3 = srad - sqrt(srad ** 2 - crad ** 2);
    cyl3V.mult(sqrt(srad ** 2 - crad ** 2));
    let dir4 = createVector(PI / 2, 0, 0);
    //(x, y, z, radius, dir)
    cyl3 = new CYL(0, 0, 0, srad / 2, dir4);
    if (cyl3V) cyl3V.mult(1.01);
    cyl3Y = PI / 2 - theta;
    cyl3X = HALF_PI + phi;
    cyl3Z = 0;
    p3 = true;
    l2 = true;
    l3 = true;
    a2 = true;
    a3 = true;
    //cb3.checked(false); //beye
    //bullseye = false;
    //arcs=true;
  });

  if (cyl3V) {
    //cyl3V = null;
    //cyl3 = null;
    cyl3V = createVector(X3, Y3, Z3);
    cyl3V.normalize();
    cyl3V.mult(sqrt(srad ** 2 - crad ** 2) + deep);
    let dir3 = createVector(PI / 2, 0, 0);
    //(x, y, z, radius, dir)
    cyl3 = new CYL(0, 0, 0, srad / 2, dir3);
    cyl3V.mult(mult);
  } //fi

  //starfield
  push();
  noFill();
  if (stars) sf.show();
  pop();

  //order can matter bc transparency
  drawbullseye();
  drawarcs();
  drawlines(cyl1V, cyl2V, cyl3V);
  drawcirsofea();
  drawcyls(cyl1V, cyl2V, cyl3V);
  drawtropics();
  drawplanes();
  clearstuff();

  getkybdin();
  angs();
  dists();
} //dr()

//clear / rst /defaults
function clearstuff() {
  b4.mousePressed(() => {
    cper1 = null;
    cper2 = null;
    cper3 = null;
    cir1 = null;
    cir2 = null;
    cir3 = null;
    RY1 = null;
    RX1 = null;
    RY2 = null;
    RX2 = null;
    RY3 = null;
    RX3 = null;
    //unclear to defs
    // cb2.checked(false); //grd
    // grid = false; //just a bool
    // cb3.checked(true); //beye
    // bullseye = true;normalize()
    eqpmarcs = false;
    cyl1 = null;
    cyl2 = null;
    cyl3 = null;
    planes = false;
    p1 = false;
    p2 = false;
    p3 = false;
    lines = false; //lines
    cyl1V = null;
    cyl2V = null;
    cyl3V = null;
    arcs = false;
    a1 = false;
    a2 = false;
    a3 = false;
    arc1 = null;
    arc2 = null;
    arc3 = null;
    l1 = false;
    l2 = false;
    l3 = false;
    clys = false;
    cper1c = null;
    cper2c = null;
    cper3c = null;
    sd1 = 0;
    sd2 = 0;
    sd3 = 0;
    //c3 = 0;
    //eqlat = 0;
  });
} //cc()
