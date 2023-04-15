import { onSnake, expandSnake } from "./snake_obj.js";
const min = 1;
const max = 21;
let randomNumX = Math.floor(Math.random() * max) + min;
let randomNumY = Math.floor(Math.random() * max) + min;

let food = { x: randomNumX, y: randomNumY };
let EXPAND_RATE_OF_SNAKE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPAND_RATE_OF_SNAKE);
    randomNumCaller();
    food = { x: randomNumX, y: randomNumY };
  }
}

export function draw(gameboard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameboard.appendChild(foodElement);
}

function randomNumCaller() {
  randomNumX = Math.floor(Math.random() * (max - min + 1)) + min;
  randomNumY = Math.floor(Math.random() * max) + min;
}
