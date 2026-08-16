
let pico;
let xpos,ypos;
let bgm,sfx
function preload(){
    pico = loadImage("assets/pico-a.png");
    bgm = loadSound("assets/bossaNova.mp3");
    sfx = loadSound("assests/")
}


function setup(){
     createCanvas(350,350);
     background('lightblue');
    xpos = 0;
    bgm.loop()
 }
 function draw(){
    background("lightblue");
    image(pico,0,0,110,133);
    sfx = XXXX

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
 function keyPressed(){
    if (key === 's'){
        bgm.stop();
    }
    if (key === 'c'){
        bgm.play();
    }
 }
 