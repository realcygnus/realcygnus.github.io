//cart to sphere
function c2s(x, y, z) {
  let phi, theta, r;

  //phi & theta are typically swapped?
  r = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  phi = Math.atan2(z, x);
  theta = Math.acos(y / Math.sqrt(x ** 2 + y ** 2 + z ** 2));

  return { r, theta, phi };
} //c2s()
//usage:
// let sc = c2s(80,20,15);
// console.log(sc.r,sc.theta,sc.phi);

//sphere to cart
function s2c(r, t, p) {
  let x, y, z;

  //y & z are typically swapped ... my weird p5 way
  x = r * Math.sin(p) * Math.cos(t);
  y = r * Math.cos(p);
  z = r * Math.sin(p) * Math.sin(t);

  return { x, y, z };
} //c2s()
//usage:
// let cc = s2c(100, 0.5, 0.25);
// console.log(cc.x,cc.y,cc.z);

//the guts
function makeTex(w, h, circles) {
  let img = createImage(w, h);
  img.loadPixels();

  for (let j = 0; j < h; j++) {
    let phi = -map(j, 0, h, 0, PI); // polar angle from Y-axis
    for (let i = 0; i < w; i++) {
      let theta = map(i, 0, w, 0, TWO_PI); // azimuthal angle around Y-axis

      // Unit vector from spherical coordinates (my weird p5 format)
      let x = sin(phi) * cos(theta);
      let y = cos(phi);
      let z = sin(phi) * sin(theta);
      let P = createVector(x, y, z); //norm?

      // Count how many spherical circles P is inside
      let count = 0;
      for (let c of circles) {
        //the clever bit
        if (P.dot(c.center) > cos(c.radius)) {
          count++;
        } //fo
      } //4

      let idx = 4 * (j * w + i);

      if (count === 3) {
        img.pixels[idx + 0] = 255; // Red where all 3 circles intersect
        img.pixels[idx + 1] = 0;
        img.pixels[idx + 2] = 0;
      } else if (count === 2) {
        img.pixels[idx + 0] = 128;
        img.pixels[idx + 1] = 128; //gray where just any 2 cirs cross
        img.pixels[idx + 2] = 128;
      } else {
        img.pixels[idx + 0] = 255;
        img.pixels[idx + 1] = 255; //white/clear handled by blendMode(MULTIPLY)
        img.pixels[idx + 2] = 255;
      } //fi
      img.pixels[idx + 3] = 255; // Always set alpha to opaque
    } //4
  } //5

  img.updatePixels();
  return img;
} //mkTxt()

function latLonToVec(lat, lon) {
  let latRad = radians(lat);
  let lonRad = radians(lon);
  let x = cos(latRad) * cos(lonRad);
  let y = sin(latRad);
  let z = cos(latRad) * sin(lonRad);
  return createVector(x, y, z); //no need normalize?
} //l2v()

//ha was NOT *2.. damn AI
function pixRadToAng(pixRad, spherePixRad) {
  return asin(pixRad / spherePixRad);
} //pr2a()

function circleIntersections(c1, r1, c2, r2) {
  let axis = p5.Vector.cross(c1, c2);
  if (axis.magSq() < 1e-8) return []; // circles parallel or identical
  axis.normalize();
  let d = acos(c1.dot(c2));
  let a = (cos(r2) - cos(r1) * cos(d)) / (sin(r1) * sin(d));
  if (abs(a) > 1) return [];

  let angle = acos(a);
  let m = p5.Vector.cross(axis, c1).normalize();

  let p1 = p5.Vector.add(
    p5.Vector.mult(c1, cos(r1)),
    p5.Vector.add(
      p5.Vector.mult(m, sin(r1) * cos(angle)),
      p5.Vector.mult(axis, sin(r1) * sin(angle))
    )
  ).normalize();

  let p2 = p5.Vector.add(
    p5.Vector.mult(c1, cos(r1)),
    p5.Vector.add(
      p5.Vector.mult(m, sin(r1) * cos(-angle)),
      p5.Vector.mult(axis, sin(r1) * sin(-angle))
    )
  ).normalize();

  return [p1, p2];
} //cirint()

function intersectionPoints(circles) {
  let points = [];
  let pairs = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];

  for (let [i, j] of pairs) {
    let c1 = circles[i];
    let c2 = circles[j];
    let pList = circleIntersections(c1.center, c1.radius, c2.center, c2.radius);
    for (let p of pList) {
      // Apply correction to match your coordinate convention
      let v = p.copy();
      let corrected = createVector(-v.x, -v.y, v.z);
      points.push(corrected.mult(sphereRad + 1));
    } //4
  } //5

  return points;
} //csi()

function arclen(v1, v2, r) {
  // get angle between the two vectors
  let angle = p5.Vector.angleBetween(v1, v2);

  // al = radius * angle
  let arcLength = r * angle;

  return arcLength;
} //al()

function ang3D(v1, v2, v3) {
  //call in 3 different orders middle v2 is main ref
  // 1st copy and normalize the input vectors even though we'll try to use static methods AKA the triple product & is a friend here
  let V1 = v1.copy().normalize();
  let V2 = v2.copy().normalize();
  let V3 = v3.copy().normalize();

  //sub 1 from 2 then 3 from 2 to get main working triangle vertex vecs
  let Va = p5.Vector.sub(V1, V2).normalize(); //for acos
  let Vb = p5.Vector.sub(V3, V2).normalize(); //not mormed if atan

  //1st cross
  //let cross = p5.Vector.cross(Va, Vb);

  //get the cross of the crosses
  let a = p5.Vector.cross(Va, V2);
  let b = p5.Vector.cross(Vb, V2);

  // & the dot & mags a&b;
  let dot = p5.Vector.dot(a, b);
  let mag = a.mag() * b.mag();

  let ang = (Math.acos(dot / mag) * 180.0) / Math.PI;

  return Math.round(ang * 1000) / 1000;
} //ang3d2()

function round2(num, places) {
  const multiplier = Math.pow(10, places);
  return Math.round(num * multiplier) / multiplier;
}//round2()
