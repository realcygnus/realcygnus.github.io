//stars
function cb1e() {
  if (cb1.checked()) {
    stars = true;
    //console.log('Checking!');
  } else {
    stars = false;
    //console.log('Unchecking!');
  } //fi
} //cb1e()

//grid
function cb2e() {
  if (cb2.checked()) {
    grid = true;
    //console.log('Checking!');
  } else {
    grid = false;
    //console.log('Unchecking!');
  } //fi
} //cb2e()

//bullseye
function cb3e() {
  if (cb3.checked()) {
    bullseye = true;
    //console.log('Checking!');
  } else {
    bullseye = false;
    //console.log('Unchecking!');
  } //fi
} //cb3e()

//eqpmarcs
function cb4e() {
  if (cb4.checked()) {
    eqpmarcs = true;
    //console.log('Checking!');
  } else {
    eqpmarcs = false;
    //console.log('Unchecking!');
  } //fi
} //cb4e()

//sphere
function cb5e() {
  if (cb5.checked()) {
    sph = true;
    cb2.show();
    //console.log('Checking!');
  } else {
    sph = false;
    cb2.hide();
    //console.log('Unchecking!');
  } //fi
} //cb5e()

//lines
function cb6e() {
  if (cb6.checked()) {
    lines = true;
    //console.log('Checking!');
  } else {
    lines = false;
    //console.log('Unchecking!');
  } //fi
} //cb6e()

//arcs
function cb7e() {
  if (cb7.checked()) {
    arcs = true;
    //console.log('Checking!');
  } else {
    arcs = false;
    //console.log('Unchecking!');
  } //fi
} //cb7e()

//cyls
function cb8e() {
  if (cb8.checked()) {
    cyls = true;
    //console.log('Checking!');
  } else {
    cyls = false;
    //console.log('Unchecking!');
  } //fi
} //cb8e()

//planes
function cb9e() {
  if (cb9.checked()) {
    planes = true;
    //console.log('Checking!');
  } else {
    planes = false;
    //console.log('Unchecking!');
  } //fi
} //cb8e()

//planes
function cb10e() {
  if (cb10.checked()) {
    cb10V = 0;
    //console.log('Checking!');
  } else {
    cb10V = 1;
    //console.log('Unchecking!');
  } //fi
} //cb8e()

//single planes
function cb11e() {
  if (cb11.checked()) {
    p4 = true;
    //console.log('Checking!');
  } else {
    p4 = false;
    //console.log('Unchecking!');
  } //fi
} //cb8e()



function getkybdin() {
  //kybd
  gxrT = map(xrot, 0, 2 * PI, 0, 360);
  gyrT = map(yrot, 0, 2 * PI, 0, 360);
  gzrT = map(zrot, 0, 2 * PI, 0, 360);
  // fails with switch/case dumb
  if (keyIsDown(73)) {
    //i
    tranz += 5;
  } //fi
  if (keyIsDown(79)) {
    //o
    tranz -= 5;
  } //fi
  if (keyIsDown(38)) {
    //up arrow
    yrot += 0.01;
    //gyr.html("gyr = " + round(gyrT%360,2));
  } //fi
  if (keyIsDown(40)) {
    //down arrow
    yrot -= 0.01;
    //gyr.html("gyr = " + round(gyrT%360,2));
  } //fi
  if (keyIsDown(39)) {
    //right arrow
    xrot += 0.01;
    //gxr.html("gxr = " + round(gxrT%360,2));
  } //fi
  if (keyIsDown(37)) {
    //left arrow
    xrot -= 0.01;
    //gxr.html("gxr = " + round(gxrT%360,2));
  } //fi
  if (keyIsDown(65)) {
    //a
    zrot += 0.01;
    //gzr.html("gzr = " + round(gzrT%360,2));
  } //fi
  if (keyIsDown(90)) {
    //z
    zrot -= 0.01;
    //gzr.html("gzr = " + round(gzrT%360,2));
    //console.log(grz);
  } //fi
} //getkyb()

//staic txt msg
function alert1() {
  alert(
    "Mouse Left(on canvas) = rotate\n & wheel = zoom\n Keyboard arrow keys = global rotate X & Y\n i and o keys = global translate Z\n 'global' relative to preferred mouse rotations\n P5 has no quaternions nor does this include any matrix rotations so, there may be unexpected behaviors\n As it is, keyboard input is just to add a little extra positioning functionality over the mouses orbitcontrol(), which just moves the camera. Perhaps use translate before rotate typically, for instance."
  );
} //alert1()

