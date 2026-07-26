function setup(){
    createCanvas(600,600)
    background('pink')
}
function draw(){
    for (let i = 0;i<100;i++)
        circle(5*i+50,200,100)
    if (2%0===1){
         fill ('black')
    }
    else{
        fill('white')
    }
}