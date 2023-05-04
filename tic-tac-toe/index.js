const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const playerXScoreElement = document.querySelector('[data-score="playerXScore"]');
const playerOScoreElement = document.querySelector('[data-score="playerOScore"]');
let playerXScore = 0;
let playerOScore = 0;
playerXScoreElement.textContent = playerXScore;
playerOScoreElement.textContent = playerOScore;

let playerXName = '';
let playerOName = '';

getPlayerNames();
document.getElementById("playerXName").innerHTML; 

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function getPossibleMoves(options){
  const moves = [];
  for (let i = 0; i < options.length; i++) {
      if(options[i] === ""){
          moves.push(i);
      }
  }
  return moves;
}


function getPlayerNames() {
  playerXName = prompt("Player X, please enter your name:");
  playerOName = prompt("Player O, please enter your name:");
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer == "X" ? playerXName : playerOName}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer == "X") {
      playerXScore++;
      playerXScoreElement.textContent = playerXScore;
    } else {
      playerOScore++;
      playerOScoreElement.textContent = playerOScore;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer == "X" ? playerXName : playerOName} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  statusText.textContent = `${playerXName}'s turn`;
  running = true;
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

function initializeGame() {
  const gameMode = prompt("Choose a game mode: 1) Player vs Player, 2) Player vs AI");
  if (gameMode === "1") {
    // Player vs Player
    statusText.textContent = `${playerXName}'s turn`;
    running = true;
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  } else if (gameMode === "2") {
    // Player vs AI
    statusText.textContent = `${playerXName}'s turn`;
    running = true;
    cells.forEach((cell) => cell.addEventListener("click", cellClickedAgainstAI));
  }
  restartBtn.addEventListener("click", restartGame);
  const playerXNameElement = document.querySelector("#playerXName");
  const playerONameElement = document.querySelector("#playerOName");
  playerXNameElement.textContent = playerXName;
  playerONameElement.textContent = playerOName;
}


function cellClickedAgainstAI() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
    checkWinner();
  if (running) {
    const possibleMoves = getPossibleMoves(options);
    const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
    const randomMove = possibleMoves[randomMoveIndex];
    const aiCell = cells[randomMove];
    updateCell(aiCell, randomMove);
    checkWinner();
  }
} 

