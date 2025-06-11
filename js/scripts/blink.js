export function startBlinking(minInterval = 3000, maxInterval = 8000) {
  const eye = document.getElementById("eye");

  function blink() {
    // 現在位置を基準にして上下移動（まばたき）
    const originalY = parseFloat(eye.style.top);

    eye.style.transition = "transform 0.1s ease";
    eye.style.transform = "translate(-50%, -50%) translateY(5px)";

    setTimeout(() => {
      eye.style.transform = "translate(-50%, -50%)";
    }, 100);

    // 次回のまばたきまでのランダム間隔
    const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval;
    setTimeout(blink, nextInterval);
  }

  blink(); // 最初の呼び出し
}