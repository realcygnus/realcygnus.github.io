//circles of equal alts
function drawcirsofea() {
  if (coea) {
    //cir copy1
    push();
    if (cper1) translate(cper1);
    if (RY1) rotateY(RY1);
    if (RX1) rotateX(RX1);
    if (cir1) cir1.show();
    pop();
     //just for the sphere in center of bullseye
    if (cper1c) {
      push();
      translate(cper1c);
      normalMaterial();
      sphere(3);
      pop();
    } //fi

    //cir copy2
    push();
    if (cper2) translate(cper2);
    if (RY2) rotateY(RY2);
    if (RX2) rotateX(RX2);
    if (cir2) cir2.show();
    pop();
     //just for the sphere in center of bullseye
    if (cper2c) {
      push();
      translate(cper2c);
      normalMaterial();
      sphere(3);
      pop();
    } //fi

    //cir copy3
    push();
    if (cper3) translate(cper3);
    if (RY3) rotateY(RY3);
    if (RX3) rotateX(RX3);
    if (cir3) cir3.show();
    pop();
     //just for the sphere in center of bullseye
    if (cper3c) {
      push();
      translate(cper3c);
      normalMaterial();
      sphere(3);
      pop();
    } //fi
  } //fi
} //dcoea()
