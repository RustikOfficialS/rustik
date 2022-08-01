const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const ground = new Image();
ground.src = "images/ground.png"

const apple = new Image();
apple.src = "images/apple.png"

const strawberry = new Image();
strawberry.src = "images/strawberry.png"

const orange = new Image();
orange.src = "images/orange.png"

foodsArray = [apple, strawberry, orange]

let foodImg

function randomFood() {
    let randomFood = Math.floor(Math.random() * foodsArray.length)
    foodImg = foodsArray[randomFood]
}

randomFood()

let box = 32

let score = 0

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction)

let dir

function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left"
    }
    else if (event.keyCode == 38 && dir != "down") {
        dir = "up"
    }
    else if (event.keyCode == 39 && dir != "left") {
        dir = "right"
    }
    else if (event.keyCode == 40 && dir != "up") {
        dir = "down"
    }
}

function eatTail(head, arr) {
    
    for (let i = 1; i < snake.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game)
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0)

    ctx.drawImage(foodImg, food.x, food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "lightgreen"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX == food.x && snakeY == food.y) {
        randomFood()
        score++

        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
    } else {
        snake.pop()
    }

    if (snakeX < box) {
        if (snakeX == 0) {
            snakeX = 1
        }
        snakeX = 576
    } else if (snakeX > box * 17) {
        snakeX = 0
    }

    if (snakeY < 3 * box) {
        snakeY = 576
    } else if (snakeY > box * 17) {
        snakeY = 64
    }

    if (dir == "left") snakeX -= box
    if (dir == "down") snakeY += box
    if (dir == "right") snakeX += box
    if (dir == "up") snakeY -= box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)

}

let game = setInterval(drawGame, 100)
