//arcs 
function drawarcs() {
  if (arcs) {
    if (cyl1V && cyl2V) {
      push();
      noFill();
      strokeWeight(1.5);
      stroke(150, 0, 0, 200);
      //v1,v2,rad,1 for arc or 0 for great circle
      arc1 = new Ark(cyl1V, cyl2V, srad*mult-1,cb10V);//wtf not srad*1.5 !?
      arc1.show();              // 248 found empirically bad
      strokeWeight(12);// ah ha is srad*1,5 IF radius is fixed to 0
      stroke(100,100,100,200);
      point(cyl1V);
      point(cyl2V);
      pop();
      // let al1 = arclen(cyl1V,cyl2V,srad);
      // let m1 = map(al1, 0, 2*PI*srad,0,2*PI*3959);
      // //console.log("v1-v2 - " + m1);
      // sd1 = abs(round(m1,2));
      //if (cyl1V) console.log(cyl1V.mag(cyl1V));
    } //fi;
    if (cyl1V && cyl2V && cyl3V) {
      push();
      noFill();
      strokeWeight(1.5);
      stroke(150, 0, 0, 200);
      arc2 = new Ark(cyl2V, cyl3V, srad*mult-1,1);
      arc2.show();
      arc3 = new Ark(cyl3V, cyl1V, srad*mult-1,1);
      arc3.show();
      strokeWeight(12);
      stroke(100,100,100,200);
      point(cyl3V);
      pop();
      
      // let al2 = arclen(cyl2V,cyl3V,srad);
      // let m2 = map(al2, 0, 2*PI*srad,0,2*PI*3959);
      // //console.log("v1-v2 - " + m2);
      // sd2 = abs(round(m2,2));
      // let al3 = arclen(cyl3V,cyl1V,srad);
      // let m3 = map(al3, 0, 2*PI*srad,0,2*PI*3959);
      // //console.log("v1-v2 - " + m3);
      // sd3 = abs(round(m3,2));
    } //fi;
  } //fi
} //drawarcs()
