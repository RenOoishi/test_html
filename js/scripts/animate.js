export function animate(objects, centerX, centerY) {
  const eye = objects[0];
  const mouth = objects[1];
  const face = objects[2];

  function step() {
    eye.x += (eye.targetX - eye.x) * eye.speed;
    eye.y += (eye.targetY - eye.y) * eye.speed;
    eye.el.style.left = `${eye.x}px`;
    eye.el.style.top = `${eye.y}px`;

    const eyeOffsetX = eye.x - (centerX + eye.offsetX);
    const eyeOffsetY = eye.y - (centerY + eye.offsetY);
    const faceTargetX = centerX + face.offsetX + eyeOffsetX * 0.5;
    const faceTargetY = centerY + face.offsetY + eyeOffsetY * 0.5;

    const mouthYOffset = eyeOffsetY >= 0 ? eyeOffsetY * 0.7 : eyeOffsetY;
    const mouthTargetX = centerX + mouth.offsetX + eyeOffsetX;
    const mouthTargetY = centerY + mouth.offsetY + mouthYOffset;

    face.x += (faceTargetX - face.x) * face.speed;
    face.y += (faceTargetY - face.y) * face.speed;
    face.el.style.left = `${face.x}px`;
    face.el.style.top = `${face.y}px`;

    mouth.x += (mouthTargetX - mouth.x) * mouth.speed;
    mouth.y += (mouthTargetY - mouth.y) * mouth.speed;
    mouth.el.style.left = `${mouth.x}px`;
    mouth.el.style.top = `${mouth.y}px`;

    requestAnimationFrame(step);
  }

  step();
}
