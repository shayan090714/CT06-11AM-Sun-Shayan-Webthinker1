// let size = 5;
// let colour = "blue";

// function setup(){
//     createCanvas(600,400);
//     background('grey');
    
// }
// function draw(){
    
// }

// function mousePressed(){
//         size = 5;
//         colour = color(random(0,255),random(0,255),random(0,255));
//     }
//     function mouseDragged(){
//     fill(colour);
//     circle(mouseX,mouseY,size);
//     size = size + 0.5;
//     }


// let size = 250;
let colour = "white";
// let showCircle = false;
// let showRect = false;
// let showSquare = false;

let xpos = 0;
let ypos = 0;


function setup(){
    createCanvas(600,400)
    background("grey")

    xpos = width/2;
    ypos = height/2;
}
function draw(){
     background("grey");
    //  if (showCircle)
        //  fill(colour);
         circle(width/2,height/2,size);

     }
    // if (showRect){
    //     fill("red")
    //     rect(width/2-size,height/2-size,size,size*2);
    // }
    // if (showSquare){
    //     fill("blue")
    //     rect(width/2,height/2,size,size);
    // }
// function keyPressed(){
//     print(key);
//     print(keyCode);

    if(keyCode===RIGHT_ARROW) {
        xpos = xpos +2;
    }
    if(keyCode===LEFT_ARROW) {
        xpos = xpos - 2;
    }

    if(keyCode===UP_ARROW) {
        ypos = ypos +2;
    }
    if(keyCode===DOWN_ARROW) {
        ypos = ypos - 2;
    }
