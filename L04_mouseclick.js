function setup(){
    createCanvas(600,600)
    background('blackpink')
}
function draw(){
    for (let i = 0;i<100;i++)
        fill(i)
        circle(50*i+50,200,100)
}