export function createObjects(centerX, centerY) {
  return [
    {
      el: document.getElementById("eye"),
      x: centerX,
      y: centerY,
      targetX: centerX,
      targetY: centerY,
      maxRadius: 30,
      speed: 0.08,
      offsetX: 0,
      offsetY: -40,
    },
    {
      el: document.getElementById("mouth"),
      x: centerX,
      y: centerY,
      targetX: centerX,
      targetY: centerY,
      maxRadius: 20,
      speed: 0.08,
      offsetX: 0,
      offsetY: 0,
    },
    {
      el: document.getElementById("face"),
      x: centerX,
      y: centerY,
      maxRadius: 20,
      speed: 0.04,
      offsetX: 0,
      offsetY: 0,
    },
  ];
}
