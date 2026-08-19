let angle = 0;
let w = 80;
let rows, cols;
let curves;
let loop1 = true;
let s1, s2;
let cb1;
let speed, zoom;
let n = 1;
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(30);
  //pixelDensity(1);
  colorMode(HSB);
  cols = floor(windowWidth / w) - 1;
  rows = floor(windowHeight / w) -1;
  curves = make2DArray(rows, cols);

  for (let j = 0; j < rows; j += n) {
    for (let i = 0; i < cols; i += n) {
      curves[j][i] = new Curve();
    }//5
  }//4

  s1 = createSlider(0, 0.1, 0.015, 0.001);
  //s1.size(80);
  s1.position(-56, 90);
  s1.style('rotate', -90);
  s2 = createSlider(50, 200, 100, 10);
  //s2.size(50);
  s2.style('rotate', 90);
  s2.changed(rst);
  //cb1 = createCheckbox('Toggle: Capture screen ONLY after 1st cycle', false);
  //cb1.style('rotate', 90);
  //cb1.style('color', 'red');
  //cb1.changed(ck);
  //evts
  window.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });
  window.addEventListener( 'resize', function() {
    rst();
    console.log('resized');
  })//
  rst();//run once
}//setup()

function draw() {
  background(0);
  noStroke();
  strokeWeight(1);
  fill(280, 360, 360, 255);
  text("" + int(frameRate()), 10, 8);

  let d = w - (0.25 * w);
  let r = d * 0.5;

  s2.position(-56, windowHeight - (95));
  //cb1.position(d * 2, (windowHeight - 22));
  speed = map(s1.value(), 0, 0.1, 0, 100);
  zoom = map(s2.value(), 50, 200, 100, 0);

  for (let j = 0; j < rows; j += n) {
    for (let i = 0; i < cols; i += n) {

      let cx1 = (w + 25) + (i * w) + (w * 0.5);
      let cy1 = w * 0.5;
      let cx2 = (w + 50) * 0.5;
      let cy2 = w + (j * w) + (w * 0.5);

      let x1 = r * cos(angle * (i + 1) - HALF_PI);
      let y1 = r * sin(angle * (i + 1) - HALF_PI);
      let x2 = r * cos(angle * (j + 1) - HALF_PI);
      let y2 = r * sin(angle * (j + 1) - HALF_PI);

      //2 0x0 phantom
      //curves[j][i].setX(cx2 + x2);
      //curves[j][i].setY(cy1 + y1);
      curves[j][i].setX(cx1 + x1);
      curves[j][i].setY(cy2 + y2);
      curves[j][i].addPoint();
      curves[j][i].show();

      //cirs
      noFill();
      strokeWeight(1);
      stroke(255);
      ellipse(cx1, cy1, d, d);
      ellipse(cx2, cy2, d, d);
      //lines
      stroke(50, 75);
      strokeWeight(1);
      line(cx2 + x2, cy2 + y2, cx1 + x1, cy2 + y2);
      line(cx1 + x1, cy1 + y1, cx1 + x1, cy2 + y2);
      //points
      strokeWeight(8);
      stroke(200);
      point(cx1 + x1, cy1 + y1);
      point(cx2 + x2, cy2 + y2);
      //phantom @ 0x0
      strokeWeight(2);
      point(cx2 + x2 - 3, cy1 + y1 + 3);
      //txt
      noStroke();
      fill(50);
      textAlign(CENTER, CENTER);
      text("Z", 12, windowHeight - (158));
      text(int(zoom), 12, windowHeight - (8));
      text("S", 10, 28);
      text(int(speed), 10, 178);
      text((j + 1) + 'x', cx2, cy2);
      text((i + 1) + 'x', cx1, cy1);
      fill(200, 360, 360);
      text((cols) + 'x' + (rows), cx2 - 6, cy1 + (r * 0.25));
    }//5
  }//4

  angle -= s1.value();//0.015;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows; j += n) {
      for (let i = 0; i < cols; i += n) {
        if(loop1 == true) {
          //saveCanvas("lj.png");
          console.log("savefile");
          //console.log(loop1)
        }//fi
        curves[j][i].reset();
      }//5
    }//4
    angle = 0;
  }//fi

// if(count == 50) {
//   cb1.checked(true);
//   //rst();
//   //ck();
//   for (let j = 0; j < rows; j += n) {
//     for (let i = 0; i < cols; i += n) {
//       //curves[j][i].reset();
//       curves[j][i] = new Curve();
//     }//5
//   }//4
//   angle = 0;
// }//fi
//
// if(count == 100) {
//   cb1.checked(false);
//   //ck();
//   for (let j = 0; j < rows; j += n) {
//     for (let i = 0; i < cols; i += n) {
//       //curves[j][i].reset();
//       curves[j][i] = new Curve();
//       //curves[j][i].reset();
//     }//5
//   }//4
//   angle = 0;
// }//fi

count ++;
}//draw();

function make2DArray(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }//4
  return arr;
}//make2DAkarry()

function rst() {
  resizeCanvas(windowWidth, windowHeight);
  w = s2.value();
  cols = floor(windowWidth / w) - 1;
  rows = floor(windowHeight / w) - 1;
  curves = make2DArray(rows, cols);

  for (let j = 0; j < rows; j += n) {
    for (let i = 0; i < cols; i += n) {
      curves[j][i] = new Curve();
    }//5
  }//4
  console.log('rst()');
  //cb1.checked(false);
} //rst()

function mousePressed() {
  if (mouseButton == LEFT) {
    loop();
    console.log('resume')
  }//fi
  if (mouseButton == RIGHT) {
    noLoop();
    console.log('pause');
  }//fi
} //mp

function ck() {
  if (cb1.checked()) {
    loop1 = true;
    console.log('capture screen on: after 1st cycle of every resize/reset');
    rst();
  } else {
    loop1 = false;
    console.log('capture screen off');
    rst();
  }//esle
}//ck()