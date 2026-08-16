let bgm;
let pico;
let xpos,ypos;
let bgm,sfx
function preload(){
    pico = loadImage("assets/pico-a.png");
    bgm = loadSound("assets/bossanova-a-png")
}


function setup(){
     createCanvas(600,400);
     background('lightblue');
    xpos = 0;
 }
 function draw(){
    background("lightblue");
    image(pico,0,0,110,133);

    if(keyIsDown(RIGHT_ARROW)){
        xpos = xpos + 2;
    }
    if(keyIsDown(LEFT_ARROW)){
        xpos = xpos - 2;
    }
    if(keyIsDown(UP_ARROW)){
        ypos = ypos + 2;
    }
    if(keyIsDown(DOWN_ARROW)){
        ypos = ypos - 2;
    }
 }
