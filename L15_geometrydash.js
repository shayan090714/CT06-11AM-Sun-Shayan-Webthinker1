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
    textAlign(CENTER,CENTER)
    Text("Press")
    fill("white")
    textSize(44)
    textAlign(CENTER,CENTER)
    Text("Press SPACE to start",width/2,height/2)

}