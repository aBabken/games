const ctx       = document.getElementById("body").getContext('2d');
const ground    = new Image();
const food      = new Image();
const head      = new Image();
const body      = new Image();
let box         = 32;
let score       = 0;
let snake       = [];
let bodies      = ["/img/body-middle.png", "/img/body-middle-angle.png", "/img/head-down.png", "/img/head-left.png", "/img/head-right.png", "/img/head-up.png", "/img/tail.png"]
ground.src      = "/img/bg.png";
food.src        = "/img/food.png";
head.src        = bodies[2];
body.src        = "/img/body-middle.png"
let meal        = { x: Math.floor(Math.random() * 19 + 1.5) * box, y: Math.floor(Math.random() * 10 + 1) * box }
snake[0]        = { x: 10 * box, y: 5 * box }
let orin;
document.addEventListener("keydown", orientation);
function orientation(event) {
    if (event.keyCode == 37 && orin != "right") {
        orin = "left";
        head.src = bodies[3];
    } else if (event.keyCode == 38 && orin != "down") {
        orin = "up";
        head.src = bodies[5];
    } else if (event.keyCode == 39 && orin != "left") {
        orin = "right";
        head.src = bodies[4];
    } else if (event.keyCode == 40 && orin != "up") {
        orin = "down";
        head.src = bodies[2];
    }
}
function eatItself(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
        }
    }
}
function snakeDraw(body, x, y) {
    ctx.drawImage(body, x, y);
}
function draw() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, meal.x, meal.y);
    
    for (let i = 0; i < snake.length; i++) {
        
            snakeDraw(head, snake[0].x, snake[0].y);
            
            if (i == snake.length - 1 && i > 0) {
                
                console.log(snake[i].x, snake[i].y);
                ctx.fillStyle = "#736D6A";
                ctx.beginPath();
                ctx.ellipse(snake[i].x + 15, snake[i].y + 15, 12, 12, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            if (i > 1) {
                ctx.fillStyle = "#736D6A";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
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
let game = setInterval(draw, 120);