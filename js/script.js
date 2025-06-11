import { createObjects } from "./config/objects.js";
import { animate } from "./scripts/animate.js";
import { setupCustomCursor } from "./scripts/cursor.js";

setupCustomCursor();

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

const objects = createObjects(centerX, centerY);

function updateTargets(clientX, clientY) {
  for (const obj of objects) {
    const refCenterX = centerX + obj.offsetX;
    const refCenterY = centerY + obj.offsetY;
    const dx = clientX - refCenterX;
    const dy = clientY - refCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= obj.maxRadius) {
      obj.targetX = clientX;
      obj.targetY = clientY;
    } else {
      const ratio = obj.maxRadius / dist;
      obj.targetX = refCenterX + dx * ratio;
      obj.targetY = refCenterY + dy * ratio;
    }
  }
}

document.addEventListener("mousemove", (e) => {
  updateTargets(e.clientX, e.clientY);
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateTargets(touch.clientX, touch.clientY);
    }
  },
  { passive: true }
);

function resetPosition() {
  for (const obj of objects) {
    const baseX = centerX + obj.offsetX;
    const baseY = centerY + obj.offsetY;
    obj.x = baseX;
    obj.y = baseY;
    obj.targetX = baseX;
    obj.targetY = baseY;
    obj.el.style.left = `${baseX}px`;
    obj.el.style.top = `${baseY}px`;
  }
}

resetPosition();

window.addEventListener("resize", () => {
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
  resetPosition();
});

// 開始
animate(objects, centerX, centerY);
