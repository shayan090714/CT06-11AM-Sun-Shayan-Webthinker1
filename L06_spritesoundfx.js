let pico;
let xpos,ypos;
let bgm,sfx
function preload(){
    pico = loadImage("assets/pico-a.png");
    bgm = loadSound("assets/bossaNova.mp3");
    sfx = loadSound("assets/pop.mp3");
}


function setup(){
     createCanvas(350,350);
     background('lightblue');
    xpos = 0;
    ypos = 0;
 }
 function draw(){
    background("lightblue");
    image(pico,xpos,ypos,110,133);
    

    if(keyIsDown(RIGHT_ARROW)){
        xpos = xpos + 2;
    }
    if(keyIsDown(LEFT_ARROW)){
        xpos = xpos - 2;
    }
    if(keyIsDown(UP_ARROW)){
        ypos = ypos - 2;
    }
    if(keyIsDown(DOWN_ARROW)){
        ypos = ypos + 2;
    }
    
 }
 function keyPressed(){
    if(keycode===32){
        sfx.play()
    }

    if (key === 's'){
        bgm.stop();
    }
    if (key === 'c'){
        bgm.play();
    }
 }
 