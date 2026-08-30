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
background(220);
textSize(18);

lineY = 0
for(let count= 0;count< storyText.length;count++)
text(storyText[count],100,ypos + lineY)
lineY = lineY + 20;

ypos = ypos - 0.5;
}