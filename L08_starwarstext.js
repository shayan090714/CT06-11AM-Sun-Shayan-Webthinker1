let arrname=["Pizza","Burger","Sushi","Tacos","Pasta"]
function setup(){
    createCanvas(600,400);
}
let yPos = 400;
function draw(){
    background(0);
    // textSize(20);
    // text("I am Shayan",50,50);
    
    fill(255,255,0)
    textSize(24)
    textAlign(CENTER)
    for (let i = 0;i<list.length;i++){
        text((i+1)+".")
    }


    yPos -= 0.6;
}