//globs
const USER = 0;
const FOURIER = 1;

let x = [];
let fourierX;
let time = 0;
let path = [];
let drawing = [];
let state = -1;

let cb1;
let col = [];
let drw = [];
let cnt = 0;

let ORBIT = false;
let VECTORS = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  cb1 = createCheckbox("Orbits", false);
  cb1.changed(cb1e);

  cb2 = createCheckbox("Vectors", true);
  cb2.changed(cb2e);

  cb3 = createCheckbox("Pause", false);
  cb3.changed(cb3e);

  // //evts right click block
  window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
 
  windowResized();
} //su

function draw() {
  if (state == USER) {
    background(0);
    //randomSeed(17326);
    let pt = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);
    drawing.push(pt);
    drw.push(pt);
    strokeWeight(3);
    stroke(250);
    noFill();
    //drw
    beginShape();
    for (let v of drawing) {
      vertex(v.x + windowWidth / 2, v.y + windowHeight / 2);
    } //4
    endShape();
  } else if (state == FOURIER) {
    background(0);
    //randomSeed(3);
    let v = ec(windowWidth / 2, windowHeight / 2, 0, fourierX);
    path.unshift(v);
    beginShape();
    noFill();
    strokeWeight(3);
    stroke(255, 0, 255);
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    } //4
    endShape();

    //tr
    strokeWeight(0.5);
    stroke(50);
    noFill();
    beginShape();
    for (let v of drw) {
      vertex(v.x + windowWidth / 2, v.y + windowHeight / 2);
    } //4
    endShape();

    const dt = TWO_PI / fourierX.length;
    time += dt;

    if (time > TWO_PI) {
      time = 0;
      path = [];
    } //fi
  } //FI
} //dr

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-35);
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text(
    "RIGHT click to draw(a single continuous 5 second-ish path), & Repeat.",
    windowWidth/2 +10 ,windowHeight / 3);
  text("Note: Rate is also copied.", windowWidth/2+10, windowHeight / 3 + 100);
  colorMode(HSB);
  noFill();

  cb1.position(10, windowHeight -25);
  cb2.position(windowWidth / 2, windowHeight -25);
  cb3.position(windowWidth - 80, windowHeight -25);
} //wr()

//epicycle render
function ec(x, y, rot, fourier) {
  //randomSeed(3);
  col.push(random(250));
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    strokeWeight(10);
    stroke(80);
    point(windowWidth / 2, windowHeight / 2);
    //point(prevx,prevy);

    x += radius * cos(freq * time + phase + rot);
    y += radius * sin(freq * time + phase + rot);

    strokeWeight(3);
    stroke(col[i], 100, 100);

    if (ORBIT === true) {
      strokeWeight(1);
      ellipse(prevx, prevy, radius * 2);
    } //fi

    if (VECTORS === true) {
      strokeWeight(2);
      line(prevx, prevy, x, y);
    } //fi
    //noStroke();

    strokeWeight(8);
    stroke(col[i], 100, 100);
    point(x, y);
  } //4
  return createVector(x, y);
} //ec

function mousePressed() {
  if (mouseButton === RIGHT) {
    state = USER;
    drawing = [];
    x = [];
    time = 0;
    path = [];
    col = [];
    drw = [];
    randomSeed(17326);
  } //fi
} //mr

function mouseReleased() {
  if (mouseButton === RIGHT) {
    state = FOURIER;
    const skip = 1;
    for (let i = 0; i < drawing.length; i += skip) {
      x.push(new Complex(drawing[i].x, drawing[i].y));
    } //4
    fourierX = idft(x);
    fourierX.sort((a, b) => b.amp - a.amp);
  } //fi
} //mr

class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  } //const

  add(c) {
    this.re += c.re;
    this.im += c.im;
  } //add

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  } //mult
} //C cls

//BIG thanks to Dan the man for the JS obj IDFT
function idft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      const c = new Complex(cos(phi), -sin(phi));
      sum.add(x[n].mult(c));
    } //4
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    let freq = k;
    let amp = sqrt(sum.re * sum.re + sum.im * sum.im);
    let phase = atan2(sum.im, sum.re);
    X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
  } //4
  return X;
} //dtf cl

function cb1e() {
  if (cb1.checked()) {
    ORBIT = true;
  } else {
    ORBIT = false;
  } //fi
} //cbe1

function cb2e() {
  if (cb2.checked()) {
    VECTORS = true;
  } else {
    VECTORS = false;
  } //fi
} //cbe2

function cb3e() {
  if (cb3.checked()) {
    noLoop();
  } else {
    loop();
  } //fi
} //cb3e
