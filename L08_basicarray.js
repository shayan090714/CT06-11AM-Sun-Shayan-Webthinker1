let ypos = 0;

function setup(){
    createCanvas(200,400)
}
function draw(){
background(220)
textSize(64)

text("Hello everybody",200,ypos);
text("Second line",200,ypos + 18);

ypos -= 0.5;
}