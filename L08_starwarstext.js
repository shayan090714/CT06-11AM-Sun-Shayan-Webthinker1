let storyText = [
    "A long time ago in a galaxy far",
    "far away",
    "It is a period of learning",
    "Our adventure begins here",
    "Anything is possible",
]
function setup(){
    createCanvas(600,400);
}
let yPos = 400;
let lineGap = 60;
let sound
function draw(){
    background(0);
    
    
    fill(255,255,0);
    textSize(40);
    textAlign(CENTER);
    for (let i = 0;i<storyText.length;i++){
        text(storyText[i],width/2,yPos+i*lineGap);
    }
    yPos -= 0.6;
if(yPos< -storyText.length*lineGap){
    yPos = height;
}

}