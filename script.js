const choices = document.querySelectorAll(".choice");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("result");
const yourChoiceEl = document.getElementById("your-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const roundCountEl = document.getElementById("round-count");
const playAgainBtn = document.getElementById("play-again");

let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

const choiceEmojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

choices.forEach(button => {
    button.addEventListener("click", () => {
        if (round > maxRounds) return;

        const playerChoice = button.getAttribute("data-choice").toLowerCase();
        const computerChoice = getComputerChoice();

        yourChoiceEl.textContent = choiceEmojis[playerChoice] || "?";
        computerChoiceEl.textContent = choiceEmojis[computerChoice] || "?";

        const winner = getWinner(playerChoice, computerChoice);
        updateScores(winner);
        round++;
        roundCountEl.textContent = round <= maxRounds ? round : maxRounds;

        if (round > maxRounds) {
            showFinalResult();
        }
    });
});

playAgainBtn.addEventListener("click", resetGame);

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) return "draw";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    }
    return "computer";
}

function updateScores(winner) {
    if (winner === "player") {
        playerScore++;
        resultEl.textContent = "You Win this Round!";
        resultEl.style.color = "#7CFC00"; // light green
    } else if (winner === "computer") {
        computerScore++;
        resultEl.textContent = "Computer Wins this Round!";
        resultEl.style.color = "#FF6347"; // tomato red
    } else {
        resultEl.textContent = "It's a Draw!";
        resultEl.style.color = "#FFD700"; // gold
    }

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

function showFinalResult() {
    if (playerScore > computerScore) {
        resultEl.textContent = "🎉 You Won the Game!";
        resultEl.style.color = "#00FF7F";
    } else if (computerScore > playerScore) {
        resultEl.textContent = "💻 Computer Won the Game!";
        resultEl.style.color = "#FF4500";
    } else {
        resultEl.textContent = "🤝 It's a Tie Game!";
        resultEl.style.color = "#1E90FF";
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;

    playerScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    roundCountEl.textContent = "1";

    yourChoiceEl.textContent = "?";
    computerChoiceEl.textContent = "?";
    resultEl.textContent = "Make Your Choice!";
    resultEl.style.color = "#FFFFFF";
}
