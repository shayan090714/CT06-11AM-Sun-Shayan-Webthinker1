let ypos = 0;

function setup(){
    createCanvas(200,400);
    ypos = height
}
function draw(){
background(220);
textSize(18);

text("Hello everybody",200,ypos);
text("Second line",200,ypos + 18);

ypos = ypos 0.5;
}