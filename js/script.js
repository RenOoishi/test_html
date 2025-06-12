import { createObjects } from "./config/objects.js";
import { animate } from "./scripts/animate.js";
import { setupCustomCursor } from "./scripts/cursor.js";
import { startBlinking } from './scripts/blink.js';

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

// 頭をなでると目が変化
const hotSpot = document.getElementById("hot_spot");
const eye = document.getElementById("eye");
let isDragging = false;
let dragStarted = false;

hotSpot.addEventListener("mousedown", () => {
  isDragging = true;
  dragStarted = false;
  hotSpot.classList.add("dragging");
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    dragStarted = false;
    hotSpot.classList.remove("dragging");
    // eye画像を元に戻す
    eye.src = "images/glase.png";
  }
});

window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    if (!dragStarted) {
      dragStarted = true;
      // eye画像をドラッグ用に切替え
      eye.src = "hoge.png"; // 変更したい画像パス
    }
    // 必要ならドラッグ中の動作追加
  }
});



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

startBlinking(1000, 5000);