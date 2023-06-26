const grid = document.querySelector('.grid'); // holding grid element
const start = document.getElementById('start');
const score_display = document.getElementById('score-board');
const start_screen = document.getElementById('start-screen');
const reset = document.getElementById('reset');
const game_over = document.getElementById('game-over');
const high_score_display  = document.getElementById('hi-score-board');
const game_over_score_board = document.getElementById('game-score-board');
let isPause = true;


let squares = []; // contains all div's
let currentSnake = [2,1,0];
let direction = 1;
let appleIndex=0;
let score = 0;
const speedMultiplier = 0.9
const initialIntervalTime = 200
let intervalTime = initialIntervalTime
let timerId =0;
let hiscore =11;


//-------------------------------------High Score Logic Part --------------------------------------------------------------------------

if(localStorage.getItem('hi-score-key')){

  high_score_display.textContent = `${JSON.parse(localStorage.getItem('hi-score-key'))}`;
}

function getsetHighScore(){

    if(localStorage.getItem('hi-score-key')){

      if(score>JSON.parse(localStorage.getItem('hi-score-key'))){
        hiscore = score;
        localStorage.setItem('hi-score-key',`${hiscore}`);

        

      }
      
    }
    else{
      
      hiscore = score;
      
      localStorage.setItem('hi-score-key',`${hiscore}`)
     

    }
}

getsetHighScore();

//----------------------------------------High Score logic Part End----------------------------------------------------------
document.addEventListener('keydown', handleKeyInput);

document
  .querySelectorAll('.d-btn')
  .forEach(item => item.addEventListener('click', handleKeyInput))




// Generating grid <div>'s  and inserting into grids.
let width = 20;
const height = 15;
function createGrid(){

for(let i=0;i<width*height;i++){

        // generating elements
        const square = document.createElement('div');

        // adding square class to div's
        square.classList.add('square');
        
        // putting element into grid
        grid.appendChild(square);
        squares.push(square);
        

}

}


createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake') );



// move function 

function move(){


    if (hasSnakeHitWall() || hasSnakeHitSelf()) {
      gameover_audio();
      gameOver();
        return clearInterval(timerId);
      }

    
    // deleting the tail of snake
    let tail = currentSnake.pop();
    // removing the styles from removed element
    squares[tail].classList.remove('snake');

    // adding new element to snake
    currentSnake.unshift(currentSnake[0]+direction);

      if(squares[currentSnake[0]].classList.contains('apple')){

            squares[currentSnake[0]].classList.remove('apple');
            // adding snake to grow
            squares[tail].classList.add('snake');
            //grow our snake array
            currentSnake.push(tail);

            //generate apples
            generateApples();
            swallow_audio();
            score++;
            getsetHighScore();
            
            
            score_display.textContent = score;

              // speed up the snake
    clearInterval(timerId)
    intervalTime = intervalTime * speedMultiplier
    timerId = setInterval(move, intervalTime)
          


      }



    //adding styling to see it
    squares[currentSnake[0]].classList.add('snake');

}




// generate apples 


function generateApples(){

    do{

         appleIndex = Math.floor(Math.random()*squares.length)


    }while(squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');



}

generateApples();



// Game Over conditions


function hasSnakeHitWall () {
    const hasSnakeHitTop = currentSnake[0] - width < 0 && direction === -width
  
    const hasSnakeHitBottom =
      currentSnake[0] + width >= width * height && direction === width
  
    const hasSnakeHitLeft = currentSnake[0] % width === 0 && direction === -1
  
    const hasSnakeHitRight =
      currentSnake[0] % width === width - 1 && direction === 1
  
    return (
      hasSnakeHitBottom || hasSnakeHitRight || hasSnakeHitLeft || hasSnakeHitTop
    )
  }
  
  function hasSnakeHitSelf () {
    return squares[currentSnake[0] + direction].classList.contains('snake')
  }






// KeyCodes

document.addEventListener('keydown',handleKeyInput);

function handleKeyInput (event) {
  
  const input = event.type === 'keydown' ? event.key : event.currentTarget.id
  let newDirection

  switch (input) {
    case 'ArrowRight':
    case 'btn-right':
    case 'd':
      newDirection = 1
      break

    case 'ArrowUp':
    case 'btn-up':
    case 'w':
      newDirection = -width
      break

    case 'ArrowLeft':
    case 'btn-left':
    case 'a':
      newDirection = -1
      break

    case 'ArrowDown':
    case 'btn-down':
    case 's':
      newDirection = +width
      break
  }

  changeDirection(newDirection)
}

function changeDirection (newDirection) {
  // so that snake head can only move forward
  if (direction !== -newDirection) {
    direction = newDirection
  }
}


//----------------------------------Game Start logic ----------------------------------------------

start.addEventListener('click',startGame);

function startGame(){

 
 //start.textContent='⏸';
 
  
 button_sound();
  start_screen.style.display = 'none'
  game_over.style.display='none'
  grid.style.display = 'flex';
  

  currentSnake.forEach(index => squares[index].classList.remove('snake'))

  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);
  currentSnake = [2,1,0];
  score =0;
  score_display.textContent = score;

  direction =1;
  intervalTime=initialIntervalTime; 
  generateApples();
  currentSnake.forEach(index=> squares[index].classList.add('snake'));
   timerId = setInterval(move,intervalTime);






}
//Sounds of Game 


function button_sound(){

let press = new Audio('audiofiles/button.mp3');
press.play();


}


// Swallowing apple  Sound
function swallow_audio(){

let eat = new Audio('audiofiles/swallow.mp3');
eat.play();



}

// Gameover Sound

function gameover_audio(){

  let swallow = new Audio('audiofiles/gameover.mp3');
  swallow.play();



}


//------------------------------------Reset Game--------------------------------------------------------------- 

reset.addEventListener('click',resetGame);

function resetGame(){
button_sound();
isPause= true;
clearInterval(timerId);
start_screen.style.display = 'block'
grid.style.display = 'none';
score_display.textContent='0';
game_over.style.display='none'


}




// --------------------------- After Game Over Display Items -------------------------------------------------------

function gameOver(){
isPause = false;

high_score_display.textContent = `${JSON.parse(localStorage.getItem('hi-score-key'))}`;
game_over_score_board.textContent = `${score}`;
game_over.style.display='block'


}
// --------------------------- After Game Over Display Items Ends -------------------------------------------------------














