hiddenwords = [
        "Green","Messy","Arrow","Apple","Table","Sharp","Clean","Close","Small","Skull"
    ]
let guessInput
let submitButton
let message = ""
let hidden
let hints

function setup(){
    createCanvas(800,650)
    guessInput = createInput()
    guessInput.position(width/2-200,height/2)
    guessInput.style("font-size","20px")
    
    submitButton = createButton()
    submitButton.position(width/2+75,heigth/2)
    submitButton.style("font-style","20px")

    hidden = random(WORDS)
    console.log(hidden)
    hints = hidden[0]
}
function draw(){
    background(220)
    fill("black")
}
    