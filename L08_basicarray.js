let ypos = 0;
let lineY = 0;
let storyText = [];

function setup(){
    createCanvas(600,600);
    ypos = height
}
function draw(){
background(220);
textSize(18);

text("Hello everybody",200,ypos);
text("Second line",200,ypos + 18);

ypos = ypos - 0.5;
}