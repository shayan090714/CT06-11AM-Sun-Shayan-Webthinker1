let textInput
let secondInput
let button


function setup(){
    

    textInput = createInput
    textInput.position(width/2,100)
    
    secondInput = createInput()
    secondInput.position(width/2,140)

    button = createButton("Generate")
    button.position(width/2,200)
    button.mousePressed(updateStory)
}
function draw(){

createCanvas(600,400)
background(220)


}