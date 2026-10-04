let nounInput
let verbInput
let button


function setup(){
    createCanvas(600,400)

    nounInput = createInput
    nounInput.position(width/2,100)
    
    verbInput = createInput()
    verbInput.position(width/2,140)

    button = createButton("Generate")
    button.position(width/2,200)
    button.mousePressed(updateStory)
}
function draw(){
background(220)
textSize(18)
textAlign(RIGHT,CENTER)


}