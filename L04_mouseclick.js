let shapeColor = "blue";

function setup(){
    createCanvas(600,600)
    background('lightblue')
}
function draw(){
    // let xpos = 550;
    // let ypos = 50;
    // let ggcolour = 0;
    // for (let i = 0;i<11;i++){
    //     fill(0,ggcolour,0);
    //     circle(xpos,ypos,50);
    //     xpos = xpos - 50;
    //     ypos = ypos + 50;
    //     ggcolour = ggcolour + 50
    // }  
    fill(shapeColor);
    circle(width/2,height/2,200);
    }
    function mousePressed(){
        shapeColor = color(random(0,255));
    }
    function mouseReleased(){
        shapeColor = "white";
    }
    function mouseMoved(){
        circle(mousex,mousey,10)
    }
