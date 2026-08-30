let ypos = 0;
let lineY = 0;
let storyText = [];
let center = heigth

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
textAlign(Center,Center)

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