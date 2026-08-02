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


let size = 250;
let colour = "blue";
let showCircle = false;
let showRect = false;
let showSquare = false;


function setup(){
    createCanvas(600,300)
    background("grey")
}
function draw(){
     background("grey");
    //  if (showCircle)
         fill(colour)
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
function keyPressed(){
    print(key);
    print(keyCode);


    if(keyCode===UP_ARROW) {
        colour="red";
    }
    if(keyCode===DOWN_ARROW) {
        colour="black";
    }
}