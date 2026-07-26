function setup(){
    createCanvas(600,600)
    background('lightblue')
}
function draw(){
    let xpos = 50;
    let ypos = 50;
    for (let i = 0;i<5;i++){
        fill(0);
        circle(xpos,ypos,50);
        xpos = xpos + 50
        ypos = ypos + 50
    }   
}