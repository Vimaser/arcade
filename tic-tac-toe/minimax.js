//Below was me testing minimax function. I'm leaving this in, some of this is my code and other parts are modified from resources I gathered.


/* function getPossibleMoves(options){
    const moves = [];
    for (let i = 0; i < options.length; i++) {
        if(options[i] === ""){
            moves.push(i);
        }
    }
    return Moves;
}



function minimax(options, depth, maximizingPlayer) {
    const possibleMoves = getPossibleMoves(options);
    const player = maximizingPlayer ? "O" : "X";
    let bestScore = maximizingPlayer ? -Infinity : Infinity;
    let bestMove;

    //If reached end of game or maximum depth evaluate
    if (possibleMoves.length === 0 || depth === 0) {
        return evaluateBoard(options, player);
    }

    for (let i = 0; i < possibleMoves.length; i++) {
        let move = possibleMoves[i];
        let newBoard = cloneBoard(options);
        newBoard[move[0]][move[1]] = player;
        let score = minimax(newBoard, depth - 1,!maximizingPlayer);
        newBoard[move[0]][move[1]] = '';
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }
    return bestScore;
} */
/* 
function minimax(state) {
    if (checkWinner(state) !== null) {
      return score(state);
    }
  
    let bestScore;
    let bestMove;
  
    if (currentPlayer === "X") {
      bestScore = -Infinity;
      for (let i = 0; i < state.length; i++) {
        if (state[i] === "") {
          const newState = state.slice();
          newState[i] = currentPlayer;
          const score = minimax(newState);
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
    } else {
      bestScore = Infinity;
      for (let i = 0; i < state.length; i++) {
        if (state[i] === "") {
          const newState = state.slice();
          newState[i] = currentPlayer;
          const score = minimax(newState);
          if (score < bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
    }
  
    return bestMove;
  }
   */