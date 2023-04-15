import {
  SNAKE_SPEED,
  updateSnake,
  drawSnake,
  getHead,
  snakeIntersection,
} from "./snake_obj.js";
import { draw as drawFood, update as updateFood } from "./food_obj.js";
let restartBtn = document.getElementById("restart");
let gameboard = document.getElementById("game-board");

let lastRenderTime = 0;
let lose = false;

function main(currentTime) {
  if (lose) {
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", () => {
      location.reload();
      restartBtn.style.display = "none";
    });
    return;
  }
  window.requestAnimationFrame(main);
  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake(gameboard);
  updateFood();
  checkDeath();
}
function draw() {
  gameboard.innerHTML = "";
  drawSnake(gameboard);
  drawFood(gameboard);
}

function checkDeath() {
  lose = outsideGrid(getHead()) || snakeIntersection();
}

function outsideGrid(head) {
  return head.x < 1 || head.y < 1 || head.x > 21 || head.y > 21;
}
