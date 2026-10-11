hiddenwords = [
        "GREEN","Messy","Arrow","Apple","Table","Sharp","Clean","Close","Small","Skull"
    ]
let guessInput
let submitButton
let message = ""
let hidden
let hints
let attempts = 0

function setup(){
    createCanvas(800,650)
    guessInput = createInput()
    guessInput.position(width/2-200,height/2)
    guessInput.style("font-size","20px")
    
    submitButton = createButton("Submit")
    submitButton.position(width/2+75,height/2)
    submitButton.style("font-style","20px")
    submitButton.mousePressed(checkAnswer)

    hidden = random(hiddenwords)
    console.log(hidden)
    hints = hidden[0] +" _ _ _ _"
}

function checkAnswer(){
    let answer = guessInput.value()
    answer = answer.toUpperCase()

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
    