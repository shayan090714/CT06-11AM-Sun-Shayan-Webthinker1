let ypos = 0;
let lineY = 0;
let storyText = [];


function setup(){
    createCanvas(600,600);
    ypos = height
    
    storyText[0] = "Long long long time ago..."
    storyText[1] = "Dinosaurs used to rule the earth"
    storyText[2] = "Then a rock from space killed them"
    storyText[3] = "The End"

    print(storyText)
}
function draw(){
background(0);
textSize(18);
fill("yellow");

lineY = 0
for(let count= 0;count< storyText.length;count++){
text(storyText[count],width/2,ypos + lineY)
lineY = lineY + 20;
}
ypos = ypos - 0.5;
if (ypos<0){
    ypos = height;
}
}


let list=["Pizza","Burger","Sushi","Tacos","Pasta"]
function setup(){
    createCanvas(600,400);
}
let yPos = 400;
let lineGap = 60;
function draw(){
    background(0);
    // textSize(20);
    // text("I am Shayan",50,50);
    
    fill(255,255,0);
    textSize(24);
    textAlign(CENTER);
    for (let i = 0;i<list.length;i++){
        text((i+1)+"."+list[i],width/2,yPos+i*lineGap);
    }
    yPos -= 0.6;
if(yPos< -list.length*lineGap){
    yPos = height;
}

}