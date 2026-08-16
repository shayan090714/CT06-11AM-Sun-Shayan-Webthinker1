let bgm;
let pico;
let xpos;
function preload(){
    pico = loadImage("assets/pico-a.png");
}


function setup(){
     createCanvas(350,350);
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
