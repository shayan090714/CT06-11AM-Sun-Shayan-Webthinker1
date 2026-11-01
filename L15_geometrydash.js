function setup(){
createCanvas(600,400)
background("black")
}
function draw(){
    if(!gameStarted){
        drawStartScreen()
        return
    }
    fill("white")
    textSize(14)
    textAlign(CENTER,CENTER)
    Text("Press SPACE to jump",width/2,50)
    function drawStartScreen(){
    fill("white")
    textSize(44)
    textAlign(CENTER,CENTER)
    Text("Press SPACE to start",width/2,height/2)
}

}