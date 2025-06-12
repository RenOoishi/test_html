export function animate(objects, centerX, centerY) {
  const background = objects[0];
  const eye = objects[1];
  const mouth = objects[2];
  const face = objects[3];
  const hot_spot = objects[4];

  function step() {
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    window.addEventListener("resize", () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight / 2;
    });
    background.x += (background.targetX - background.x) * background.speed;
    background.y += (background.targetY - background.y) * background.speed;
    background.el.style.left = `${background.x}px`;
    background.el.style.top = `${background.y}px`;

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

    const hot_spotTargetX = centerX + hot_spot.offsetX + eyeOffsetX * 0.5;
    const hot_spotTargetY = centerY + hot_spot.offsetY + eyeOffsetY * 0.5;

    face.x += (faceTargetX - face.x) * face.speed;
    face.y += (faceTargetY - face.y) * face.speed;
    face.el.style.left = `${face.x}px`;
    face.el.style.top = `${face.y}px`;

    mouth.x += (mouthTargetX - mouth.x) * mouth.speed;
    mouth.y += (mouthTargetY - mouth.y) * mouth.speed;
    mouth.el.style.left = `${mouth.x}px`;
    mouth.el.style.top = `${mouth.y}px`;

    hot_spot.x += (hot_spotTargetX - hot_spot.x) * hot_spot.speed;
    hot_spot.y += (hot_spotTargetY - hot_spot.y) * hot_spot.speed;
    hot_spot.el.style.left = `${hot_spot.x}px`;
    hot_spot.el.style.top = `${hot_spot.y}px`;

    requestAnimationFrame(step);
  }

  step();
}
