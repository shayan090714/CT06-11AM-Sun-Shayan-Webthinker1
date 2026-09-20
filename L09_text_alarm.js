let countdown = 5
function setup(){
    createCanvas(400, 400);
    textAlign(CENTER,CENTER)
}

function draw(){
    background(220)
    let h = hour();
    let m = minute();
    let sec = second();
    fill(0);
    textSize(72);
    text(nf(h,2)+":"+ nf(m,2)+":"+sec,width/2,height/2) ;
    fill(red);
    textSize(32);
    text(countdown,width/2,height/2+75);
    textSize(16);
    text("Click here to start countdown")
}