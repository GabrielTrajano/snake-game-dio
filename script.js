const canvas = document.querySelector("#canvas")
const context = canvas.getContext("2d")
const box = 16

let snake = []
snake[0] = {
    x: 15 * box,
    y: 15 * box
}

let direction = "right"

let food = {
    x: Math.floor(Math.random() * 31 + 1) * box,
    y: Math.floor(Math.random() * 31 + 1) * box
}

function createBackground(){
    context.fillStyle = "black"
    context.fillRect(0, 0, 32 * box, 32 * box)
}

function createSnake(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "#00E300"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = "#FF0000"
    context.fillRect(food.x, food.y, box, box)
}

function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}


// FUNÇÃO PRINCIPAL
function startGame(){

    // Efeito de parede sem colisão, ou seja, cobra andando em looping no canvas.
    if(snake[0].x > 31*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 31*box;
    if(snake[0].y > 31*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 31*box;
   

    // Garantindo a colisão da cabeça da cobra com o corpo da mesma.
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game)
            alert("GAME OVER!")
        }
    }
    
    
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    // Fazendo a cobra andar de acordo com a última seta pressionada.
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;    
    

    // Fazendo a cobra aumentar de tamanho caso ela coma a comida(food).
    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    } else {
        food.x = Math.floor(Math.random() * 31 + 1) * box,
        food.y = Math.floor(Math.random() * 31 + 1) * box
    }
    
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead)

    createBackground()
    createSnake()
    drawFood()
}

document.addEventListener("keydown", update)
const game = setInterval(startGame, 100)