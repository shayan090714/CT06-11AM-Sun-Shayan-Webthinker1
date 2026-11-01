function setup(){
createCanvas(600,400)
background("black")
}
function draw(){
    if(!gamestarted){
        drawStartScreen()
        return
    }
    fill("white")
    textSize(14)
    textAlign(CENTERCENTER)
    fill("white")
    textSize(44)
    textAlign(CENTER,CENTER)
    Text("Press SPACE to start",width/2,height/2)

}