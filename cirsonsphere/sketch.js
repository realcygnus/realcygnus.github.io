//globs
let sphereRad = 225; //sphere radius

//slider vars lat/lon & radius
let lat1, lon1, r1;
let lat2, lon2, r2;
let lat3, lon3, r3;

let cb1, cb2, cb3, cb4; //checkbox

let imgt; //globe texture
let textImg; //intersection area texture img

let cir1, cir2, cir3; //4 new circles class
let c1, c2, c3; //handles for s2c(vex) TODO: cut down on globs
let v1, v2, v3; //vex for cirs
let V1X, V1Y, V2X, V2Y, V3X, V3Y; // dirs to rot cir vex

//boolz
//let kb1b; //keybrd
let cb1b, cb2b, cb3b, cb4b; //chkbox sw for changed cb's ... init in createc()
let lon1b = false;
let lat1b = false;
let r1b = false;
let lon2b = false;
let lat2b = false;
let r2b = false;
let lon3b = false;
let lat3b = false;
let r3b = false;
let oc = 1; //orbit
//div txt
let d1lon, d1lat, d1rad, d2lon, d2lat, d2rad, d3lon, d3lar, d3rad;
let r1m, r2m, r3m; //rads mapped to globe for text vals
let r1mr, r2mr, r3mr; //& in revsere for txt float input
//txt float inputs
let ilon1, ilat1, ir1, olon2, ilat2, ir2, ilon3, ilat3, ir3;

//let ang1, ang2, ang3; //if needed for ang3d
//let phi1, theta1, phi2, theta2, phi3, theta3; //no glob now
let circles = []; //as used by getTex() TODO:pass my OG cirs instead

//no async/wait
function preload() {
  imgt = loadImage("e2.jpg");
  //grd3 = loadImage("gridis.jpg");
} //pl()

function setup() {
  createCanvas(windowWidth, windowHeight - 100, WEBGL);
  //pixelDensity(1); //BS
  p5.disableFriendlyErrors = true; //both BS

  lon1 = createSlider(-180, 180, 2.3, 0.00001); // //25
  lon1.changed(lon1cb);
  lat1 = createSlider(-90, 90, -4.65, 0.00001); // 10
  lat1.changed(lat1cb);
  r1 = createSlider(0, sphereRad, 76.13, 0.00001); //50
  r1.changed(r1cb);

  d1lon = createDiv("lon1 = " + round2(lon1.value(), 4));
  d1lat = createDiv("lat1 = " + round2(lat1.value(), 4));
  r1m = map(r1.value(), 0, sphereRad, 0, 3959);
  d1rad = createDiv("rad1 = " + round2(r1m, 3));

  lon2 = createSlider(-180, 180, 34.14, 0.00001); //.5 //30
  lon2.changed(lon2cb);
  lat2 = createSlider(-90, 90, 22.5, 0.00001); //1 //40
  lat2.changed(lat2cb);
  r2 = createSlider(0, sphereRad, 120.74, 0.00001); //75
  r2.changed(r2cb);

  d2lon = createDiv("lon2 = " + round2(lon2.value(), 4));
  d2lat = createDiv("lat2 = " + round2(lat2.value(), 4));
  r2m = map(r2.value(), 0, sphereRad, 0, 3959);
  d2rad = createDiv("rad2 = " + round2(r2m, 3));

  lon3 = createSlider(-180, 180, -38.79, 0.00001); //.5 -20
  lon3.changed(lon3cb);
  lat3 = createSlider(-90, 90, 50.04, 0.00001); //1 //5
  lat3.changed(lat3cb);
  r3 = createSlider(0, sphereRad, 177.47, 0.00001);
  r3.changed(r3cb);

  d3lon = createDiv("lon3 = " + round2(lon3.value(), 4));
  d3lat = createDiv("lat3 = " + round2(lat3.value(), 4));
  r3m = map(r3.value(), 0, sphereRad, 0, 3959);
  d3rad = createDiv("rad3 = " + round2(r3m, 3));

  cb1 = createCheckbox(" Intersection Areas ", true);
  cb1.style("color:darkred");
  cb1.changed(cb1cb);

  cb2 = createCheckbox(" GPs ", true);
  cb2.style("color:darkred");
  cb2.changed(cb2cb);

  cb3 = createCheckbox(" GP Rays ", true);
  cb3.style("color:darkred");
  cb3.changed(cb3cb);

  cb4 = createCheckbox(" Intersection Points ", true);
  cb4.style("color:darkred");
  cb4.changed(cb4cb);

  cb1cb(); //like runOnce()
  cb2cb();
  cb3cb();
  cb4cb();

  //txt float inputs
  ilon1 = createInput();
  ilon1.changed(ilon1cb);
  ilon1.size(60);

  ilat1 = createInput();
  ilat1.changed(ilat1cb);
  ilat1.size(60);

  ir1 = createInput();
  ir1.changed(ir1cb);
  ir1.size(60);

  ilon2 = createInput();
  ilon2.changed(ilon2cb);
  ilon2.size(60);

  ilat2 = createInput();
  ilat2.changed(ilat2cb);
  ilat2.size(60);

  ir2 = createInput();
  ir2.changed(ir2cb);
  ir2.size(60);

  ilon3 = createInput();
  ilon3.changed(ilon3cb);
  ilon3.size(60);

  ilat3 = createInput();
  ilat3.changed(ilat3cb);
  ilat3.size(60);

  ir3 = createInput();
  ir3.changed(ir3cb);
  ir3.size(60);

  windowResized();

  alert(
    "Sliders = lon, lat & radius for circles 1,2 & 3 ... Mouse L = rotate ... Mousewheel = zoom. Or just enter lons, lats & radii in DECIMAL manually to be more precise. lons range = -180 to 180, lats range = -90 to 90 & rads range = 0 to 3959."
  );

  smooth(); //GL anti-alias ... still needed?
} //su()

function draw() {
  background(50);
  //loop();
  //nifty but not perfect
  //if (oc === 1) {
  orbitControl(oc);
  //} //fi}

  // //0lat,0lon surf org cent
  // push();
  // let C0 = createVector(0, 0, sphereRad);
  // normalMaterial();
  // translate(C0);
  // sphere(3);
  // pop();

  //0,0 coord sys
  push();
  normalMaterial();
  sphere(5);
  pop();

  //sphere
  push();
  //blendMode(REPLACE);
  noStroke();
  rotateY(PI);
  texture(imgt);
  sphere(sphereRad, 64, 64);
  pop();

  //check display order
  //bad every frame but for now
  makeCirs();

  //cir cents / sart GP's
  if (cb2b) {
    push();
    noStroke();
    C1 = createVector(c1.x, c1.y, c1.z);
    C1.normalize().mult(sphereRad);
    translate(C1);
    ambientLight(200, 0, 0);
    //pointLight(200,0,0,0,0,500);
    ambientMaterial(200, 0, 0);
    //specularMaterial(255);
    sphere(3);
    pop();

    push();
    noStroke();
    C2 = createVector(c2.x, c2.y, c2.z);
    C2.normalize().mult(sphereRad);
    translate(C2);
    ambientLight(200, 0, 0);
    ambientMaterial(200, 0, 0);
    sphere(3);
    pop();

    push();
    noStroke();
    C3 = createVector(c3.x, c3.y, c3.z);
    C3.normalize().mult(sphereRad);
    translate(C3);
    ambientLight(200, 0, 0);
    ambientMaterial(200, 0, 0);
    sphere(3);
    pop();
  } //fi

  //GP rays
  if (cb3b) {
    push();
    strokeWeight(1);
    stroke(0);
    let V2 = v2.copy().mult(10000);
    line(0, 0, 0, V2.x, V2.y, V2.z);
    pop();

    push();
    strokeWeight(1);
    stroke(0);
    let V1 = v1.copy().mult(10000);
    line(0, 0, 0, V1.x, V1.y, V1.z);
    pop();

    push();
    strokeWeight(1);
    stroke(0);
    let V3 = v3.copy().mult(10000);
    line(0, 0, 0, V3.x, V3.y, V3.z);
    pop();
  } //fi

  //show cirs
  push();
  translate(v1);
  rotateY(v1Y);
  rotateX(v1X);
  cir1.show();
  pop();

  push();
  translate(v2);
  rotateY(v2Y);
  rotateX(v2X);
  cir2.show();
  pop();

  push();
  translate(v3);
  rotateY(v3Y);
  rotateX(v3X);
  cir3.show();
  pop();

  //show intersect img as texture
  if (
    (cb1b && lon1b) ||
    lat1b ||
    r1b ||
    lon2b ||
    lat2b ||
    r2b ||
    lon3b ||
    lat3b ||
    r3b
  ) {
    push();
    //blendMode(DIFFERENCE);
    blendMode(MULTIPLY);
    texture(textImg);
    noStroke();
    rotateY(PI);
    sphere(sphereRad + 2, 64, 64);
    pop();
  } //fi

  //intersection points
  if (cb4b) {
    push();
    noStroke();
    lights();
    normalMaterial();
    rotateY(PI / 2);
    for (let p of ipts) {
      //vl.push(p);
      push();
      translate(p);
      sphere(3);
      pop();
    } //4
    pop();
  } //fi
} //dr()

function makeCirs() {
  //inst cirs from class
  //silly AF but OK for now...TODO:change to slider change or whatever
  cir1 = null;
  cir2 = null;
  cir3 = null;

  let dir = createVector(0, 0, 0);
  //startang, endang radius, dir, stkw, col, num
  cir1 = new DC(0, 360, r1.value(), dir, 1.75, color(5, 5, 5), 2);
  cir2 = new DC(0, 360, r2.value(), dir, 1.75, color(5, 5, 5), 2);
  cir3 = new DC(0, 360, r3.value(), dir, 1.75, color(5, 5, 5), 2);

  alignCirs(); //seperate for now
} //mkcirs()

//core ... just add to makecir()?
function alignCirs() {
  // Convert latitude and longitude to radians
  let phi1 = radians(90 + lat1.value());
  let theta1 = radians(90 - lon1.value());
  let phi2 = radians(90 + lat2.value());
  let theta2 = radians(90 - lon2.value());
  let phi3 = radians(90 + lat3.value());
  let theta3 = radians(90 - lon3.value());

  //sphere to cart
  c1 = s2c(sphereRad, theta1, phi1); //p = x & t = y
  v1 = createVector(c1.x, c1.y, c1.z);
  v1.normalize();
  v1.mult(sqrt(sphereRad ** 2 - r1.value() ** 2));
  v1Y = PI / 2 - theta1;
  v1X = HALF_PI + phi1;

  c2 = s2c(175, theta2, phi2); //p = x & t = y
  v2 = createVector(c2.x, c2.y, c2.z);
  v2.normalize();
  v2.mult(sqrt(sphereRad ** 2 - r2.value() ** 2));
  v2Y = PI / 2 - theta2;
  v2X = HALF_PI + phi2;

  c3 = s2c(175, theta3, phi3); //p = x & t = y
  v3 = createVector(c3.x, c3.y, c3.z);
  v3.normalize();
  v3.mult(sqrt(sphereRad ** 2 - r3.value() ** 2));
  v3Y = PI / 2 - theta3;
  v3X = HALF_PI + phi3;
} //ac()

//the goods to find that textute shape/img .. pass instead?
function getTex() {
  //makeCirs();
  let G1 = latLonToVec(lat1.value(), lon1.value()); // unit vector
  let G2 = latLonToVec(lat2.value(), lon2.value());
  let G3 = latLonToVec(lat3.value(), lon3.value());

  let r1ang = pixRadToAng(r1.value(), sphereRad);
  let r2ang = pixRadToAng(r2.value(), sphereRad);
  let r3ang = pixRadToAng(r3.value(), sphereRad);

  circles = [
    { center: G1, radius: r1ang },
    { center: G2, radius: r2ang },
    { center: G3, radius: r3ang },
  ];

  textImg = makeTex(windowWidth, windowHeight, circles);
} //getTex()

function getIntersectionPoints() {
  ipts = intersectionPoints(circles);

  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      C1 = circles[i];
      C2 = circles[j];

      let pList = circleIntersections(
        C1.center,
        C1.radius,
        C2.center,
        C2.radius
      );
      if (pList.length === 2) {
        p1 = pList[0].copy().normalize();
        p2 = pList[1].copy().normalize();
      } //fi
    } //4
  } //5
} //getipts()

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 100);
  lon1.position(0, windowHeight - 60);
  lon1.size(windowWidth / 4);
  lat1.position(0, windowHeight - 40);
  lat1.size(windowWidth / 4);
  r1.position(0, windowHeight - 20);
  r1.size(windowWidth / 4);

  d1lon.position(5, windowHeight - 125);
  d1lat.position(5, windowHeight - 105);
  d1rad.position(5, windowHeight - 85);

  lon2.position((1.5 * windowWidth) / 4, windowHeight - 60);
  lon2.size(windowWidth / 4);
  lat2.position((1.5 * windowWidth) / 4, windowHeight - 40);
  lat2.size(windowWidth / 4);
  r2.position((1.5 * windowWidth) / 4, windowHeight - 20);
  r2.size(windowWidth / 4);

  d2lon.position((1.5 * windowWidth) / 4 + 5, windowHeight - 125);
  d2lat.position((1.5 * windowWidth) / 4 + 5, windowHeight - 105);
  d2rad.position((1.5 * windowWidth) / 4 + 5, windowHeight - 85);

  lon3.position(windowWidth - windowWidth / 4 - 10, windowHeight - 60);
  lon3.size(windowWidth / 4);
  lat3.position(windowWidth - windowWidth / 4 - 10, windowHeight - 40);
  lat3.size(windowWidth / 4);
  r3.position(windowWidth - windowWidth / 4 - 10, windowHeight - 20);
  r3.size(windowWidth / 4);

  d3lon.position(windowWidth - windowWidth / 4 - 10 + 5, windowHeight - 125);
  d3lat.position(windowWidth - windowWidth / 4 - 10 + 5, windowHeight - 105);
  d3rad.position(windowWidth - windowWidth / 4 - 10 + 5, windowHeight - 85);

  ilon1.position(120, windowHeight - 125);
  ilat1.position(120, windowHeight - 105);
  ir1.position(120, windowHeight - 85);
  ilon2.position((1.5 * windowWidth) / 4 + 5 + 120, windowHeight - 125);
  ilat2.position((1.5 * windowWidth) / 4 + 5 + 120, windowHeight - 105);
  ir2.position((1.5 * windowWidth) / 4 + 5 + 120, windowHeight - 85);
  ilon3.position(
    windowWidth - windowWidth / 4 - 10 + 5 + 120,
    windowHeight - 125
  );
  ilat3.position(
    windowWidth - windowWidth / 4 - 10 + 5 + 120,
    windowHeight - 105
  );
  ir3.position(windowWidth - windowWidth / 4 - 10 + 5 + 120, windowHeight - 85);

  cb1.position(10, 10); //rest rel to this
  cb2.position(windowWidth / 4, 10);
  cb3.position(windowWidth / 2 - 50, 10);
  cb4.position(windowWidth - windowWidth / 3, 10);
} //resize()
