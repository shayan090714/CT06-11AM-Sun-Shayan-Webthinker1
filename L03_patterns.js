let colorValue = 0;
function setup() {
    createCanvas(600,400);
    background(220);
    // noLoop(); // Stops continuous drawing
  }
  
function draw() {
  // let spacing = 75;
  // Recap 1: Repeating Circles
// for(let i=0; i<10; i++){
  // fill(colorValue)
  // // fill(255-(i*50));
  // circle( 100 ,100,40);
  // colorValue +=1


  // Task 1: Colour Gradient

  // Task 2: Colour Loop
//  for(let i=0;i<10;i++){
//     if(i%4 ===0){
//       fill(0,0,0);
//     }else if(i%4===1){
//       fill(255,0,0);
//     }else if(i%4===2){
//       fill(0,255,0);
//     }else{
//       fill(0,0,255);
//     }
//     //your task add in a line to generate circle
//     circle(50+i*50,300,50);
//   }
let circleDiameter = 30
let numCircle = 5
let totalWidth = circleDiameter * numCircle
let startX = (width-totalWidth/2)+circleDiameter/2;
let startY = (height-totalWidth/2)+circleDiameter/2;
for(let row = 0;row<numofcircle;row++){
let y
for(let i=0;i<6;i++){
  if(i%2===0){
    fill(225,0,255)
  }else{
    fill(0,255,0)
  }
  circle(startX + i*circleDiameter,300,circleDiameter)
}
}
 }