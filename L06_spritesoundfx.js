let bgm;
let pico;
let xpos;
function preload(){
    pico = loadImage("")
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
 }
