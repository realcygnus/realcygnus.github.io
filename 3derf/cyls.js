function drawcyls(cyl1V,cyl2V,cyl3V){
//cyl1
if(cyls){
  push();
  //if(cyl1V) vc1 = cyl1V.copy();
  if(cyl1V)translate(cyl1V.x,cyl1V.y,cyl1V.z);
  if (cyl1Z) rotateZ(cyl1Z);
  if (cyl1Y) rotateY(cyl1Y);
  if (cyl1X) rotateX(cyl1X);
  //if(vc1)translate(0,0,deep);
  //console.log(deep);
  if (cyl1) cyl1.show();
  pop();
  
   //cyl2
  push();
  if(cyl2V)translate(cyl2V.x,cyl2V.y,cyl2V.z);
  if (cyl2Z) rotateZ(cyl2Z);
  if (cyl2Y) rotateY(cyl2Y);
  if (cyl2X) rotateX(cyl2X);
  //if (cyl1X) translate(0,0,srad-deepM);
  if (cyl2) cyl2.show();
  pop();
  
  //cyl3
  push();
  if(cyl3V)translate(cyl3V.x,cyl3V.y,cyl3V.z);
  if (cyl3Z) rotateZ(cyl3Z);
  if (cyl3Y) rotateY(cyl3Y);
  if (cyl3X) rotateX(cyl3X);
  //if (cyl1X) translate(0,0,srad-deepM);
  if (cyl3) cyl3.show();
  pop();
}//fi
}//drwcyls()