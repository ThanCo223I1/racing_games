let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let carImage = new Image();
carImage.src = 'carImage.png';
let rockImage = new Image();
rockImage.src = 'rockImage.png';
function Car(x, y, speed, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;

    this.moveLeft = function () {
        if (this.x > 9.5) {
            this.x -= this.speed;
        }
    };
    this.moveRight = function () {
        if (this.x < canvas.width - this.width - 5) {
            this.x += this.speed;
        }
    };
    this.drawCar = function () {
        ctx.drawImage(carImage, this.x, this.y, this.width, this.height);
    }

}

let myCar = new Car(130, 500, 15, 70, 80);

function Rock(x,y,speed,width,height){
    this.x = Math.floor(Math.random()*canvas.width);
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;

    this.drawRock = function (){
        ctx.drawImage(rockImage, this.x, this.y, this.width, this.height);
    }
}
let aRock = new Rock (0,0, 5, 60,60);

function detectCollision() {
    let distance = Math.sqrt(Math.pow(myCar.x - aRock.x, 2) + Math.pow(myCar.y - aRock.y, 2));
    if (distance < 30){
        clearInterval(gameLoop);
        alert("Game Over!");
    }
}
document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowLeft") {
        myCar.moveLeft();
    } else if (event.code === "ArrowRight") {
        myCar.moveRight();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.code === "ControlLeft") {
        aRock.speed *=2;
    }
});
document.addEventListener("keyup", function (event) {
    if (event.code === "ControlLeft") {
        aRock.speed = 10;
    }
});
function setGamePlay(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    aRock.y += aRock.speed;
    aRock.drawRock();
    myCar.drawCar();
    detectCollision();
    if (aRock.y > canvas.height){
        aRock.x = Math.floor(Math.random()*canvas.width);
        aRock.y = 0;
    }else if (aRock.x < 0 || aRock.x + aRock.width > canvas.width) {
        aRock.x = Math.floor(Math.random()*canvas.width);
        aRock.y = 0;
    }
}
let gameLoop = setInterval(setGamePlay,20);