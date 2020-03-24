const canvas    = document.getElementById("body");
const ctx       = canvas.getContext('2d');
const ground    = new Image();
const food      = new Image();
const head      = new Image();
let box         = 32;
let score       = 0;
let orin;
ground.src      = "/img/bg.png";
food.src        = "/img/food.png";
let meal = {
    x: Math.floor(Math.random() * 19 + 1.5) * box,
    y: Math.floor(Math.random() * 10 + 1) * box
}
let snake = [];
snake[0] = {
    x: 10 * box,
    y: 5 * box
}
document.addEventListener("keydown", orientation);
function orientation(event) {
    if (event.keyCode == 37 && orin != "right") {
        orin = "left";
    } else if (event.keyCode == 38 && orin != "down") {
        orin = "up";
    } else if (event.keyCode == 39 && orin != "left") {
        orin = "right";
    } else if (event.keyCode == 40 && orin != "up") {
        orin = "down";
    }
}
function eatItself(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
        }
    }
}
function draw() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, meal.x, meal.y);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i % 2 == 0 ? "#171717" : "#0E0E0E";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    let snX = snake[0].x;
    let snY = snake[0].y;
    if (snX == meal.x && snY == meal.y) {
        score++;
        meal.x = Math.floor(Math.random() * 19 + 1.5) * box;
        meal.y = Math.floor(Math.random() * 10 + 1) * box;
    } else {
        snake.pop()
    }
    console.log(snX, snY)
    if (snX < box || snX > box * 20 || snY < box || snY > box * 11) {
        alert("Over")
        clearInterval(game);
    }
    if (orin == "left") snX -= box;
    if (orin == "right") snX += box;
    if (orin == "up") snY -= box;
    if (orin == "down") snY += box;
    let new_head = {
        x: snX,
        y: snY
    }

    eatItself(new_head, snake);
    snake.unshift(new_head);
}
let game = setInterval(draw, 100);