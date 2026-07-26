function setup(){
    createCanvas(600,600)
    background('lightblue')
}
function draw(){
    let xpos = 550;
    let ypos = 550;
    let ggcolour = 0;
    for (let i = 0;i<5;i++){
        fill(0);
        circle(xpos,ypos,50);
        xpos = xpos - 50;
        ypos = ypos - 50;
        ggcolour = ggcolour + 50
    }   
}