function setup(){
    createCanvas(600,600)
    background('pink')
}
function draw(){
    for (let i = 0;i<5;i++)
        circle(50*i+50,200,100)
}