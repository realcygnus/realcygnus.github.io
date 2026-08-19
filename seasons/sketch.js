//globs
let etex; //texture handle
let erad = 75; // erf radii
let srad = 20; // sun
let orad = 400; //orbit
let epos, spos, sgp, distpt; //pos vex
let otheta, etheta; //angle vars
let cb1, cb2; //checkbox handles
let orbcir, pm, eq, tcan, tcap, ncir, scir; //main cirs
let term; //teminator line
let t1, t2, t3, t4, t5, t6, t7, t8;
let mycol = [0, 200, 200]; //mac
let cg;
let d1;
//boolz
let Texture = false;
let pause = false;

//no async/wait
function preload() {
  etex = loadImage("e2.jpg");
} //pl()

//p5.disableFriendlyErrors = true; // BS

function setup() {
  createCanvas(windowWidth, windowHeight - 100, WEBGL);
  cg = createGraphics(100,100);
  //setAttributes({ antialias: false });
  //pixelDensity(1); // both BS

  //slids
  otheta = createSlider(0, 2 * PI, 0, 0.00001);
  etheta = createSlider(0, PI * 2, 0, 0.00001);

  //cbs
  cb1 = createCheckbox(" Texture", false);
  cb1.style("color:black");
  cb1.changed(cb1x);

  cb2 = createCheckbox(" Pause Rot", false);
  cb2.style("color:black");
  cb2.changed(cb2x);

  //txt
  t1 = createDiv("Jan Sol");
  t1.style("color:teal");
  t2 = createDiv("Sping EQ");
  t2.style("color:teal");
  t3 = createDiv("June Sol");
  t3.style("color:teal");
  t4 = createDiv("Fall EQ");
  t4.style("color:teal");
  t5 = createDiv("Jan Sol");
  t5.style("color:teal");
  t6 = createDiv("to Rot when paused");
  t6.style("color:teal");
  t7 = createDiv("Mouse: L = Rot cam, Wheel = Zoom, R = Pan");
  t7.style("color:black");
  t8 = createDiv("");
  t8.style("color:black");
  
  //dyn txt
  d1 = createDiv(" FPS = 0");
  d1.style("color:black");

  //erf orb
  let orbdir = createVector(PI / 2, 0, 0);
  //x, y, z, radius, dir, stkw, col, 1/num-segs
  orbcir = new DC(0, 0, 0, orad, orbdir, 1, color(10, 10, 10), 2);

  //pm
  let pmdir = createVector(0, PI / 2, 0);
  pm = new DC(0, 0, 0, erad, pmdir, 2, color(20, 175, 175), 2);

  //eq
  let eqdir = createVector(PI / 2, 0, 0);
  eq = new DC(0, 0, 0, erad, eqdir, 2, color(mycol), 2);

  //tcan
  let tcandir = createVector(PI / 2, 0, 0);
  let rtcan = erad * Math.cos(radians(23.5));
  let ytcan = erad * -Math.sin(radians(23.5));
  tcan = new DC(0, ytcan, 0, rtcan, tcandir, 2, color(mycol), 2);

  //tcap
  let tcapdir = createVector(PI / 2, 0, 0);
  let rtcap = erad * Math.cos(radians(-23.5));
  let ytcap = erad * -Math.sin(radians(-23.5));
  tcap = new DC(0, ytcap, 0, rtcap, tcapdir, 2, color(mycol), 2);

  //ncir
  let ncirdir = createVector(PI / 2, 0, 0);
  let rncir = erad * Math.cos(radians(66.5));
  let yncir = erad * -Math.sin(radians(66.5));
  ncir = new DC(0, yncir, 0, rncir, ncirdir, 2, color(mycol), 2);

  //scir
  let scirdir = createVector(PI / 2, 0, 0);
  let scirr = erad * Math.cos(radians(-66.5));
  let yscir = erad * -Math.sin(radians(-66.5));
  //x,y,z,rad,dir,strkw,col,360/num
  scir = new DC(0, yscir, 0, scirr, scirdir, 2, color(mycol), 2);

  //terminator
  let termdir = createVector(0, PI / 2, 0);
  term = new DC(0, 0, 0, erad, termdir, 2, color(175, 20, 20), 2);

  smooth(); //gl anti-alias still needed?
} //su

function draw() {
  otheta.position(10, windowHeight - 100 + 30);
  otheta.size(windowWidth - 25);
  etheta.position(windowWidth / 4, windowHeight - 100 + 65);
  etheta.size(windowWidth / 2 - 25);
  cb1.position(10, windowHeight - 100 - 60);
  cb2.position(10, windowHeight - 100 - 30);
  t1.position(10, windowHeight - 100 + 5);
  t2.position(windowWidth / 2 - windowWidth / 4, windowHeight - 100 + 5);
  t3.position(windowWidth / 2, windowHeight - 100 + 5);
  t4.position(windowWidth / 2 + windowWidth / 4, windowHeight - 100 + 5);
  t5.position(windowWidth - 60, windowHeight - 100 + 5);
  t6.position(windowWidth / 2 - 40, windowHeight - 100 + 50);
  t7.position(windowWidth / 2 - 160, 20);
  t8.position(windowWidth / 2 - 160, 50);
  
  d1.position(20, 20);
  if (frameCount % 10 === 0) d1.html("FPS = " + round(frameRate()));

  background(75);
  orbitControl(); //auto rot
  //ortho();
  //scale(1.5);
  rotateX(radians(-8)); //def view

  //revolve
  let X = orad * Math.sin(PI / 2 + otheta.value());
  let Y = orad * Math.cos(PI / 2 + otheta.value());

  let epos = createVector(X, 0, Y);
  let spos = createVector(0, 0, 0);

  //gp & light dir
  sgp = p5.Vector.sub(spos, epos);
  sgp.normalize().mult(erad + 3);
  distpt = sgp.copy();
  distpt.mult(8); // 5 og

  //lights(); //shit

  //erf
  push();
  noStroke();
  fill(250);
  ambientLight(50);
  //pointLight(200,200,200,0,-200,0);
  //pointLight(color(175), distpt.copy());
  //pointLight(200,200,200,0,200,0);
  directionalLight(150, 150, 150, distpt.copy().mult(-1));
  //spotLight(color(255),distpt.copy(),epos.copy(),PI/3,10);
  //ambientMaterial(50);
  specularMaterial(50);
  //shininess(100);
  translate(epos);
  rotateZ(radians(23.5));
  rotateY(PI + etheta.value());
  if (!pause) rotateY(frameCount / 100);
  if (Texture) texture(etex);
  sphere(erad, 64, 64);
  pop();

  //test dist pt for better light loc since N2S
  // push();
  // translate(distpt);
  // strokeWeight(10);
  // stroke(200, 0, 0);
  // point(distpt);
  // pop();

  //erfaxis
  push();
  translate(epos);
  rotateZ(radians(23.5));
  strokeWeight(2);
  stroke(10);
  line(0, -150, 0, 0, 150, 0);
  pop();

  //sunaxis/orb plane
  push();
  strokeWeight(2);
  stroke(10);
  line(0, -150, 0, 0, 150, 0);
  pop();

  //gp ray
  push();
  strokeWeight(1);
  stroke(10);
  //linePerspective(true);
  line(spos.x, spos.y, spos.z, epos.x, epos.y, epos.z);
  pop();

  //sun
  push();
  emissiveMaterial(250, 150, 0);
  noStroke();
  sphere(srad);
  pop();

  //orb
  push();
  orbcir.show();
  pop();

  //pm
  push();
  translate(epos);
  rotateZ(radians(23.5));
  rotateY(etheta.value());
  if (!pause) rotateY(frameCount / 100);
  pm.show();
  pop();

  //eq
  push();
  translate(epos);
  rotateZ(radians(23.5));
  eq.show();
  pop();

  //tcan
  push();
  translate(epos);
  rotateZ(radians(23.5));
  tcan.show();
  pop();

  //tcap
  push();
  translate(epos);
  rotateZ(radians(23.5));
  tcap.show();
  pop();

  //ncir
  push();
  translate(epos);
  rotateZ(radians(23.5));
  ncir.show();
  pop();

  //sxir
  push();
  translate(epos);
  rotateZ(radians(23.5));
  scir.show();
  pop();

  //term
  push();
  translate(epos);
  rotateY(otheta.value());
  term.show();
  pop();

  //gp
  push();
  translate(epos);
  strokeWeight(10);
  stroke(200, 0, 0);
  point(sgp);
  pop();
  
  //clear bad but ez
  epos = null;
  xpos = null;
  X = null;
  Y = null;
  sgp = null;
  distpt = null;
} //dr

//callbacks
function cb1x() {
  if (cb1.checked()) {
    Texture = true;
  } else {
    Texture = false;
  } //cb1x
} //cbx

function cb2x() {
  if (cb2.checked()) {
    pause = true;
  } else {
    pause = false;
  } //cb1x
} //cbx

// Resize the canvas when the browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 100);
}//wres()
