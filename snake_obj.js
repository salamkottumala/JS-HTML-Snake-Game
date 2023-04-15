import getInputDirection from "./input_keys.js";
let upBtn = document.getElementById("up");
let downBtn = document.getElementById("down");
let speed = document.getElementById("speed");
upBtn.addEventListener("click", () => {
  SNAKE_SPEED += 1;
  speed.innerText = `Speed ${SNAKE_SPEED}`;
});
downBtn.addEventListener("click", () => {
  if (SNAKE_SPEED <= 1) return;
  SNAKE_SPEED -= 1;
  speed.innerText = `Speed ${SNAKE_SPEED}`;
});

export let SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11 }];
let newSegment = 0;

export function updateSnake() {
  addNewSegment();
  // console.log(newSegment);
  let inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function drawSnake(gameboard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameboard.appendChild(snakeElement);
  });
}
export function expandSnake(expandRate) {
  newSegment += expandRate;
}
export function onSnake(currentPosition, { ignoreHead = false } = {}) {
  return snakeBody.some((sigment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(sigment, currentPosition);
  });
}

function equalPosition(snakePosition, foodPosition) {
  return (
    snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y
  );
}
function addNewSegment() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegment = 0;
}
export function getHead() {
  return snakeBody[0];
}
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
