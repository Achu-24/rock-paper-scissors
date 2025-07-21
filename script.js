let playerScore = 0;
let computerScore = 0;
let round = 1;
const totalRounds = 5;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const messageEl = document.getElementById("message");
const roundDisplay = document.getElementById("round-display");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function playSound(result) {
  if (result === "win") winSound.play();
  else if (result === "lose") loseSound.play();
  else drawSound.play();
}

function makeChoice(playerChoice) {
  if (round > totalRounds) return;

  const computerChoice = getComputerChoice();

  playerChoiceEl.textContent = playerChoice;
  computerChoiceEl.textContent = computerChoice;

  let result = "";

  if (playerChoice === computerChoice) {
    result = "draw";
    messageEl.textContent = "It's a draw!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "win";
    playerScore++;
    messageEl.textContent = "You won this round!";
  } else {
    result = "lose";
    computerScore++;
    messageEl.textContent = "Computer won this round!";
  }

  playSound(result);

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  round++;
  if (round <= totalRounds) {
    roundDisplay.textContent = `Round ${round}/5`;
  } else {
    roundDisplay.textContent = `Game Over`;
    if (playerScore > computerScore) {
      messageEl.textContent = "🎉 You won the game!";
      playSound("win");
    } else if (playerScore < computerScore) {
      messageEl.textContent = "💻 Computer won the game!";
      playSound("lose");
    } else {
      messageEl.textContent = "It's a tie!";
      playSound("draw");
    }
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  playerChoiceEl.textContent = "?";
  computerChoiceEl.textContent = "?";
  messageEl.textContent = "Make your choice!";
  roundDisplay.textContent = "Round 1/5";
}
