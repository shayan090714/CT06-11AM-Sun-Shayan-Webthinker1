let nounInput
let verbInput
let adjectiveInput
let adverbInput
let placeInput
let button


function setup(){
    createCanvas(600,700)
    storytemplates = [
        "The {adjective} {noun} decided to {verb} {adverb}"
    ]



    nounInput = createInput
    nounInput.position(width/2,100)
    
    verbInput = createInput()
    verbInput.position(width/2,140)

    adjectiveInput = createInput()
    adjectiveInput.position(width/2,180)

    adverbInput = createInput()
    adverbInput.position(width/2,220)

    placeInput = createInput()
    placeInput = position(width/2,260)

    button = createButton("Generate")
    button.position(width/2,200)
    button.mousePressed(updateStory)
}
function draw(){
background(220)
textSize(18)
textAlign(RIGHT,CENTER)
text("Enter a noun",width/2-10,100)
text("Enter a verb",width/2-10,140)
text("Enter a adjective",width/2-10,180)
text("Enter a adverb",width/2-10,220)
text("Enter a place",width/2-10,260)
}
function updateStory(){

}