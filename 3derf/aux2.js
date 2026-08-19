//cart to sphere
function c2s(x, y, z) {
  let phi, theta, r;
  
  //phi & theta are typically swapped
  r = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  phi = Math.atan2(z, x);
  theta = Math.acos(y / Math.sqrt(x ** 2 + y ** 2 + z ** 2));

  return {r, theta, phi};
} //c2s()
//usage: 
// let sc = c2s(80,20,15);
// console.log(sc.r,sc.theta,sc.phi);

//sphere to cart
function s2c(r, t, p) {
  let x, y, z;
  
  //y & z are typically swapped 
  x = r * Math.sin(p) * Math.cos(t);
  y = r * Math.cos(p);
  z = r * Math.sin(p) * Math.sin(t);

  return {x, y, z};
} //c2s()
//usage:
// let cc = s2c(100, 0.5, 0.25);
// console.log(cc.x,cc.y,cc.z);

function arclen(v1, v2, r) {
  // get angle between the two vectors
  let angle = p5.Vector.angleBetween(v1, v2);

  // al = radius * angle
  let arcLength = r * angle;

  return arcLength;
} //al()

//useage
function angs() {
  if (cyl1V && cyl2V && cyl3V) {
    let angs;
    ang1 = ang3D(cyl2V, cyl1V, cyl3V);
    ang2 = ang3D(cyl1V, cyl2V, cyl3V);
    ang3 = ang3D(cyl1V, cyl3V, cyl2V);
    angS = round(ang1 + ang2 + ang3, 2);
    //console.log(angS);
  } //fi
} //angs

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

function dists() {
  if (cyl1V && cyl2V) {
    let al1 = arclen(cyl1V, cyl2V, srad);
    let m1 = map(al1, 0, 2 * PI * srad, 0, 2 * PI * 3959);
    //console.log("v1-v2 - " + m1);
    sd1 = abs(round(m1, 2));
  } //fi

  if (cyl2V && cyl3V) {
    let al2 = arclen(cyl2V, cyl3V, srad);
    let m2 = map(al2, 0, 2 * PI * srad, 0, 2 * PI * 3959);
    //console.log("v1-v2 - " + m2);
    sd2 = abs(round(m2, 2));
  } //fi

  if (cyl3V && cyl1V) {
    let al3 = arclen(cyl3V, cyl1V, srad);
    let m3 = map(al3, 0, 2 * PI * srad, 0, 2 * PI * 3959);
    //console.log("v1-v2 - " + m3);
    sd3 = abs(round(m3, 2));
  } //fi
} //dst()

// Custom line function for 3D vectors
function dl3D(v1, v2) {
  beginShape();
  vertex(v1.x, v1.y, v1.z);
  vertex(v2.x, v2.y, v2.z);
  endShape();
} //dl3d()
