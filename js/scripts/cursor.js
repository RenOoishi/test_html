export function setupCustomCursor() {
  const cursor = document.getElementById("custom-cursor");

  const updateCursor = (x, y) => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  // マウス対応
  document.addEventListener("mousemove", (e) => {
    updateCursor(e.clientX, e.clientY);
  });

  // タッチデバイス対応（タッチ位置をカーソルに反映）
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateCursor(touch.clientX, touch.clientY);
    }
  }, { passive: true });
}
