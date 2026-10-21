let W = 800;
let H = 600;
let X = [];
let Y = [];
let num = 5;

let stepX = [];
let stepY = [];

let cb, s1, size;
//field mags
let sizes = [250, 500, 1000, 1500, 2500];

// Precomputed squared distances
let xDist = [];
let yDist = [];

function setup() {
  createCanvas(W, H);
  pixelDensity(1);

  randomSeed(33);

  for (let k = 0; k < num; k++) {
    X[k] = random(W);
    Y[k] = random(H);

    stepX[k] = random([-1, 1]) * random(0.5, 2.5);
    stepY[k] = random([-1, 1]) * random(0.5, 2.5);

    xDist[k] = new Float32Array(W);
    yDist[k] = new Float32Array(H);
  }//4

  s1 = createSlider(0, 2500, 1000);
  s1.position(10,H+5);
  cb = createCheckbox("pause", false);
  cb.position(150, H+5);
  cb.changed(cbe);

  //windowResized();
}//su()

function draw() {
  loadPixels();

  size = s1.value();

  // Precompute squared distances for each ball
  for (let k = 0; k < num; k++) {
    for (let x = 0; x < W; x++) {
      let dx = x - X[k];
      xDist[k][x] = dx ** 2;
    }//4

    for (let y = 0; y < H; y++) {
      let dy = y - Y[k];
      yDist[k][y] = dy ** 2;
    }//5
  }//6

  const px = pixels;
  const threshold = size > 0 ? 105 / size : Infinity;

  for (let y = 0; y < H; y++) {
    let row = y * W;

    for (let x = 0; x < W; x++) {
      let sum = 0;

      for (let k = 0; k < num; k++) {
        sum += sizes[k] /
          (xDist[k][x] + yDist[k][y] + 0.0001);

        // The softstep is already fully saturated
        if (sum >= threshold) break;
      }//4

      let a = 0;

      if (size > 0 && sum * size > 100) {
        let t = Math.min(1, (sum * size - 100) / 5);
        t = t ** 2 * (3 - 2 * t);
        a = 255 * t;
      }//fi

      let index = 4 * (row + x);

      px[index] = 0;
      px[index + 1] = a;
      px[index + 2] = a;
      px[index + 3] = 255;
    }//5
  }//6

  updatePixels();
  ani();
}//dr()

function ani() {
  for (let k = 0; k < num; k++) {
    X[k] += stepX[k];
    Y[k] += stepY[k];

    if (X[k] >= W || X[k] <= 0) {
      stepX[k] *= -1;
      X[k] = constrain(X[k], 0, W);
    }//fi

    if (Y[k] >= H || Y[k] <= 0) {
      stepY[k] *= -1;
      Y[k] = constrain(Y[k], 0, H);
    }//fi
  }//4
}//ani()

function cbe() {
  if (cb.checked()) {
    noLoop();
  } else {
    loop();
  }//fi
}//cb()

// function windowResized() {
//   resizeCanvas(W, H);
//   s1.position(10,H+10);
//   cb.position(150, H+10);
// }//wres()
