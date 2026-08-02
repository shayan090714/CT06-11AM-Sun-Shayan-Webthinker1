let size = 5;
let colour = "blue";

function setup(){
    createCanvas(600,600)
    background('grey')
}
function draw(){
    function mousePressed(){
        size = 5;
        colour = color(random(0,255),random(0,255),random(0,255))
    }
   function mouseDragged(){
    fill(colour);
    CSSNumericValue(mouseX,mouseY,size);
    size = size + 0.5
}
}