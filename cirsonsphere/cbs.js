//callbacks
// //moved to cb changed()
// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//   } //fi
//   if (keyCode === LEFT_ARROW) {
//   } //fi
// } //kp()

//checkbox callback-ish
function cb1cb() {
  if (cb1.checked()) {
    getTex();
    getIntersectionPoints();

    cb1b = true;
    lon1b = true;
    lat1b = true;
    r1b = true;
    lon2b = true;
    lat2b = true;
    r2b = true;
    lon3b = true;
    lat3b = true;
    r3b = true;
  } else {
    cb1b = false;
    lon1b = false;
    lat1b = false;
    r1b = false;
    lon2b = false;
    lat2b = false;
    r2b = false;
    lon3b = false;
    lat3b = false;
    r3b = false;
  } //fi
} //cbx

function cb2cb() {
  if (cb2.checked()) {
    cb2b = true;
  } else {
    cb2b = false;
  } //cb1x
} //cbx

function cb3cb() {
  if (cb3.checked()) {
    cb3b = true;
  } else {
    cb3b = false;
  } //fi
} //cbx

function cb4cb() {
  getTex();
  getIntersectionPoints();
  if (cb4.checked()) {
    cb4b = true;
  } else {
    cb4b = false;
  } //fi
} //cbx

function lon1cb() {
  getTex();
  getIntersectionPoints();
  d1lon.html("lon1 = " + round2(lon1.value(), 4));
  ilon1.value(null);
  if (cb1b) {
    //textImg = null;
    lon1b = true;
  } //fi
} //lon1cb()

function lat1cb() {
  getTex();
  getIntersectionPoints();
  d1lat.html("lat1 = " + round2(lat1.value(), 4));
  ilat1.value(null);
  if (cb1b) {
    lat1b = true;
  } //fi
} //lat1cb()

function r1cb() {
  getTex();
  getIntersectionPoints();
  r1m = map(r1.value(), 0, sphereRad, 0, 3959);
  d1rad.html("rad1 = " + round2(r1m, 3));
  ir1.value(null);
  if (cb1b) {
    r1b = true;
  } //fi
} //r1cb()

function lon2cb() {
  getTex();
  getIntersectionPoints();
  d2lon.html("lon2 = " + round2(lon2.value(), 4));
  ilon2.value(null);
  if (cb1b) {
    lon2b = true;
  } //fi
} //lon2cb()

function lat2cb() {
  getTex();
  getIntersectionPoints();
  d2lat.html("lat2 = " + round2(lat2.value(), 4));
  ilat2.value(null);
  if (cb1b) {
  } //fi
} //lat2cb()

function r2cb() {
  getTex();
  getIntersectionPoints();
  r2m = map(r2.value(), 0, sphereRad, 0, 3959);
  d2rad.html("rad2 = " + round2(r2m, 3));
  ir2.value(null);
  if (cb1b) {
    r2b = true;
  } //fi
} //r2cb()

function lon3cb() {
  getTex();
  getIntersectionPoints();
  d3lon.html("lon3 = " + round2(lon3.value(), 4));
  ilon3.value(null);
  if (cb1b) {
    lon3b = true;
  } //fi
} //lon3cb()

function lat3cb() {
  getTex();
  getIntersectionPoints();
  d3lat.html("lat3 = " + round2(lat3.value(), 4));
  ilat3.value(null);
  if (cb1b) {
    lat3b = true;
  } //fi
} //lat3cb()

function r3cb() {
  getTex();
  getIntersectionPoints();
  r3m = map(r3.value(), 0, sphereRad, 0, 3959);
  d3rad.html("rad3 = " + round2(r3m, 3));
  ir3.value(null);
  if (cb1b) {
    r3b = true;
  } //fi
} //r3cb()

//txt float inputs
function ilon1cb() {
  lon1.value(ilon1.value());
  lon1cb();
} //cbx

function ilat1cb() {
  lat1.value(ilat1.value());
  lat1cb();
} //cbx

function ir1cb() {
  r1mr = map(ir1.value(),0,3959,0,sphereRad);
  r1.value(r1mr);
  r1cb();
} //cbx

//txt float inputs
function ilon2cb() {
  lon2.value(ilon2.value());
  lon2cb();
} //cbx

function ilat2cb() {
  lat2.value(ilat2.value());
  lat2cb();
} //cbx

function ir2cb() {
  r2mr = map(ir2.value(),0,3959,0,sphereRad);
  r2.value(r2mr);
  r2cb();
} //cbx

//txt float inputs
function ilon3cb() {
  lon3.value(ilon3.value());
  lon3cb();
} //cbx

function ilat3cb() {
  lat3.value(ilat3.value());
  lat3cb();
} //cbx

function ir3cb() {
  r3mr = map(ir3.value(),0,3959,0,sphereRad);
  r3.value(r3mr);
  r3cb();
} //cbx



