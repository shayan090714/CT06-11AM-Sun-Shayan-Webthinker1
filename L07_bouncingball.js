let ballSize = 40
let ballX = 0;
let ballY = 0;
let ballSpeedX = 2;
let ballSpeedY = 2;

function setup(){
createCanvas(600,370)
noStroke();
ballX = width/2;
ballY = height/2;
}

function draw(){
background(0);
fill(200);
circle(ballX,ballY,ballSize)
ballX = ballX + ballSpeedX
ballY = ballY + ballSpeedY
if (ballX > width){
    ballSpeedX = -1 * ballSpeedX
    fill(random(0,255),0,random(0,255));
} 
if (ballX < 0){
    ballSpeedX = -1 * ballSpeedX
    fill(random(0,255),0,random(0,255));
} 
if (ballY > height){
    ballSpeedY = -1 * ballSpeedY
    fill(random(0,255),0,random(0,255));
} 
if (ballY < 0){
    ballSpeedY = -1 * ballSpeedY
    fill(random(0,255),0,random(0,255));
} 
}