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
let 


function setup(){
    createCanvas(600,400)
    background("skyblue")
}
function draw(){
    background("skyblue");
    if (showCircle){
        showCircle(width/2,height/2,size);
    }
}
function keyPressed(){
    if(key === 'c')
        showCircle=!showCircle;

}