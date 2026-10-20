let num = 100000;
//buttons
let b1, cb1;
//sliders
let s1,s2;
//midpoints
let mpx, mpy;
//current points
let cpx, cpy, r;
//arrys
let px = [];
let py= [];
//off canvas html
let fc1,fc2,fc3;
//loop ctr
let count = 0;
let square = false;
let rnd,rndval;

function setup() {
  createCanvas(windowWidth, windowHeight-100);
  background(0);

  s1 = createSlider(0,num,50000,1);
  s1.changed(s1c);
  fc1 = createDiv("num");
  s2 = createSlider(1,250,25,1);
  s2.changed(s2c);
  fc2 = createDiv("count");
  b1 = createButton("reset");
  fc3 = createDiv("rate");
  cb1 = createCheckbox("toggle tri/square ", false);
  cb1.changed(cb1cb);

  noFill();

  windowResized();
}//setup()

function draw() {
  fc1.html("num = " + s1.value());
  fc3.html("rate = " + s2.value());

  // 1. Set up the environment parameters once per frame
  rndval = square ? 8 : 3;
  mult = square ? 3 : 2;

  // 2. SPEED LOOP: Run the math multiple times BEFORE showing it on scrern

  for (let k = 0; k < s2.value(); k++) {
    if (count >= s1.value()) {
      noLoop();
      break; // Stop if we hit the slider's max point limit
    }//fi

    // 3. Ultra-compressed point selector (Replaces your entire 60-line switch block!)
    rnd = int(random(0, rndval));
    let targetX = px[rnd];
    let targetY = py[rnd];

    // 4. Run the Chaos Game distance math cleanly
    mpx = square ? int((cpx + 2 * targetX) / 3) : int((cpx + targetX) / 2);
    mpy = square ? int((cpy + 2 * targetY) / 3) : int((cpy + targetY) / 2);

    // 5. Draw the pixel instantly to the buffer
    stroke(200);
    point(mpx, mpy);

    // 6. Update the current tracker variables
    cpx = mpx;
    cpy = mpy;
    count++;
  }//4

  b1.mousePressed(() => {
  s1.value(25000);
  s2.value(25);
  windowResized();
  clr();
  });

  // Update counter HTML once per frame instead of every pixel
  fc2.html("count = " + count);
}//dr()

function clr(){
  loop();
  count = 0;
  background(0);

  for(i=0;i<px.length;i++){
    strokeWeight(6);
    stroke(0,200,200);
    point(px[i],py[i]);
  }//4
  strokeWeight(1);
  stroke(200);
}//clr()

function s1c(){
 num = s1.value();
 fc1.html("num = " + s1.value());
 clr();
}//s1f()

function s2c(){
 speed = s2.value();
 fc3.html("rate = " + s2.value());
 windowResized();
 clr();
}//s2f()

function cb1cb() {
if (cb1.checked()) {
    square = true;
    adder=2;
  } else {
    square = false;
    adder=0;
  } //fi
  windowResized();
  clr();
} //cbx

function windowResized() {
  resizeCanvas(windowWidth,windowHeight-100);
  background(0);
  count = 0;
  s1.position(10,windowHeight-100+10);
  fc1.position(150, windowHeight-100+10);
  fc2.position(250, windowHeight-100+10);
  s2.position(350, windowHeight-100+10);
  fc3.position(500, windowHeight-100+10);
  b1.position(590, windowHeight-100+10);
  cb1.position(650, windowHeight-100+10);

  //cents
  cpx = windowWidth / 2;
  cpy = windowHeight / 2;
  r = (windowHeight / 2);
  px = [ cpx, cpx + (r * 0.866025), cpx - (r * 0.866025)];
  py = [ (cpy - r)+50, cpy + (r * 0.5), cpy + (r * 0.5)];

if(square===true){
  // Calculate a clean, safe middle point for the visual drawing canvas area
  let canvasMiddleY = (windowHeight - 100) / 2;
  cpx = windowWidth / 2;
  cpy = canvasMiddleY;

  // Set the square bounding box size relative to the canvas height height
  let size = (windowHeight - 100) * 0.4;

  // Calculate clean, balanced border segments
  let left   = cpx - size;
  let midX   = cpx;
  let right  = cpx + size;

  let top    = cpy - size;
  let midY   = cpy;
  let bottom = cpy + size;

  //box
  px = [left, midX, right, right, right,  midX,   left,   left];
  py = [top,  top,  top,   midY,  bottom, bottom, bottom, midY];
}//fi
//here too
for(i=0;i<px.length;i++){
  strokeWeight(6);
  stroke(0,200,200);
  point(px[i],py[i]);
}//4
strokeWeight(1);
stroke(200);
}//wr()
