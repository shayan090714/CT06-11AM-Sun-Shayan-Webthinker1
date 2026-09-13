let arrname=["Pizza","Burger","Sushi","Tacos","Pasta"]
function setup(){
    createCanvas(600,400);
}
let yPos = 400;
function draw(){
    background(0);
    // textSize(20);
    // text("I am Shayan",50,50);
    
    textSize(20);
    textAlign(LEFT);
    text("My Favourite Foods:")
    for (let i=0;i<list.length;i++)(
        text((i+1)+"."+list[i],50,i*30)
    )
    yPos -= 0.6;
}