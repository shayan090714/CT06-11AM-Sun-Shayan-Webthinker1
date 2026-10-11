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
    submitButton.position(width/2+75,height/2)
    submitButton.style("font-style","20px")
    submitButton.mousePressed(checkAnswer)

    hidden = random(WORDS)
    console.log(hidden)
    hints = hidden[0] +" _ _ _ _"
}

function checkAnswer(){
    let answer = guessInput.inputvalue()
    answer = answer.toUppercae()

    if (answer===hidden){
        message = "You won the game!"
    }
    else{
        message = "Wrong!"
    }
}
function draw(){
    background(220)
    fill("black")
    textSize(44)
    textAlign(CENTER,CENTER)
    text("Guess the hidden word",width/2,75)
    text("Attempts: "+ attempts,width/2,135)
    text("Hint:" + hints,width/2,185)
    fill("red")
    textSize(28)
    text(message,width/2,height/2+150)
}
    