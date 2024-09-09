'use strict';

// Selecting elements

const player0El = document.querySelector('.player--0'); //Selecting player 1
const player1El = document.querySelector('.player--1'); //Selecting player 2

const score0El = document.querySelector('#score--0'); //Selecting score of player 1
const score1El = document.getElementById('score--1'); //Selecting score of player 2

const current0El = document.getElementById('current--0'); //Selecting current score of player 1
const current1El = document.getElementById('current--1'); //Selecting current score of player 2

const diceEl = document.querySelector('.dice'); //Selecting dice

const btnNew = document.querySelector('.btn--new'); //Selecting new game button
const btnRoll = document.querySelector('.btn--roll'); //Selecting roll dice button
const btnHold = document.querySelector('.btn--hold'); //Selecting hold button

let scores, currentScore, activePlayer, playing; //Declaring variables

// Starting conditions

const init = function () {
  scores = [0, 0]; //Array of scores of player 1 and player 2
  currentScore = 0; //Current score
  activePlayer = 0; //Active player
  playing = true; //Game is playing

  score0El.textContent = 0; //Set score of player 1 to 0
  score1El.textContent = 0; //Set score of player 2 to 0
  current0El.textContent = 0; //Set current score of player 1 to 0
  current1El.textContent = 0; //Set current score of player 2 to 0

  diceEl.classList.add('hidden'); //Hide dice
  player0El.classList.remove('player--winner'); //Remove player--winner class
  player1El.classList.remove('player--winner'); //Remove player--winner class
  player0El.classList.remove('player--looser'); //Remove player--looser class
  player1El.classList.remove('player--looser'); //Remove player--looser class
  player0El.classList.add('player--active'); //Add player--active class
  player1El.classList.remove('player--active'); //Remove player--active class
};
init();

//Switch player function-------------------
const switchPlayer = function () {
  //Switch to the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Set current score to 0
  currentScore = 0; //Set current score to 0
  activePlayer = activePlayer === 0 ? 1 : 0; //If activePlayer is 0 then activePlayer = 1 else activePlayer = 0

  player0El.classList.toggle('player--active'); //Toggle player--active class
  player1El.classList.toggle('player--active'); //Toggle player--active class
};

//Roll btn functionality-------------------

btnRoll.addEventListener('click', function () {
  if (playing) {
    //
    //Genarete a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //Generate random number between 1 and 6

    //Display dice
    diceEl.classList.remove('hidden'); //Show dice
    diceEl.src = `dice-${dice}.png`; //Display dice image

    //Check for rolled 1
    if (dice !== 1) {
      //If dice is not equal to 1

      //Add dice to current score
      currentScore += dice; //currentScore = currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Display current score
    } else {
      //If dice is equal to 1

      //switch to the next player
      switchPlayer();
    }
  }
});

//Hold btn functionality----------------------

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore; //scores[activePlayer] = scores[activePlayer] + currentScore
    //scores[0] = scores[0] + currentScore -------------> Player 1 -  (Example)

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //Display score

    //check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false; // Game is not playing at the morment
      diceEl.classList.add('hidden'); //Hide the dice

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //Add player--winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //Remove player--active class

      document
        .querySelector(`.player--${1 - activePlayer}`)
        .classList.add('player--looser'); //Add player--looser class document.querySelector(`.player--${activePlayer}`).classList.add('player--looser'); //Add player--looser class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //Remove player--active class
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//New game btn functionality-------------------

btnNew.addEventListener('click', init); //Call init function when new game button is clicked


let theSong = document.getElementById('song');
let logo = document.getElementById('logo');

logo.onclick = function () {
  if (theSong.paused) {
    theSong.play();
    logo.src = 'pause.png';
  } else {
    theSong.pause();
    logo.src = 'play.jpg';
  }
};
