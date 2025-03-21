document.addEventListener("DOMContentLoaded", function () {
  const bubbleContainer = document.querySelector(".hero");
  for (let i = 0; i < 10; i++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    let size = Math.random() * 40 + 10;
    let position = Math.random() * 100;
    let duration = Math.random() * 5 + 5;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${position}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubbleContainer.appendChild(bubble);
  }
});