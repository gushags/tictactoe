/*
 ** Gameboard function that creates a board that is 3x3
 ** Function should be an array
 ** Each square holds a cell capable of holding X or O.
 ** We will need to expose a method called chooseSquare
 */
function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Fill board with blanks
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }

  const getBoard = () => board;

  return { getBoard }; // Used by DOM to create board
}

const playGame = (function () {
  // Conditions for ending game
  let winner = false;
  let tie = false;

  const myBoard = gameBoard();
  const playerOne = "Player One";
  const playerTwo = "Player Two";
  const players = [
    { name: playerOne, choice: "X" },
    { name: playerTwo, choice: "O" },
  ];
  let playerTurn = 0;
  console.log(myBoard.getBoard());
  console.log(
    "It's Player One's turn. Make a choice by typing 'playGame.playRound(row, column)'."
  );

  // Play a round
  function playRound(row, column) {
    // Set which player's turn it is
    // Set choice to that player's choice (X or O)

    chooseSquare(row, column, players[playerTurn].choice);
    declareWinnerOrTie();
    if (!winner && !tie) {
      playerTurn === 0 ? (playerTurn = 1) : (playerTurn = 0);
      console.log(`It's ${players[playerTurn].name}'s turn.`);
    } else {
      gameOver();
    }
  }

  // Choose the square
  function chooseSquare(row, column, choice) {
    board = myBoard.getBoard();
    if (board[row][column] === "") {
      board[row][column] = choice;
      console.log(board);
    } else {
      throw new Error("That spot is taken.");
    }
  }

  function declareWinnerOrTie() {
    // check for winner across, down or diagonal
    // check for tie if all squares are filled and no winner

    function isX(value) {
      return value === "X";
    }

    function isO(value) {
      return value === "O";
    }

    function checkColumns(choice) {
      for (let j = 0; j < 3; j++) {
        let count = 0;
        for (let i = 0; i < 3; i++) {
          if (board[i][j] === choice) {
            count++;
            if (count === 3) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function checkDiagonal(choice) {
      if (
        (board[0][0] === choice &&
          board[1][1] === choice &&
          board[2][2] === choice) ||
        (board[0][2] === choice &&
          board[1][1] === choice &&
          board[2][0] === choice)
      ) {
        return true;
      } else {
        return false;
      }
    }

    function checkForTie() {
      let newArr = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            newArr.push(1);
          }
        }
      }
      return !newArr.length; // Returns true for empty array
    }

    function declareWinner(player, choice) {
      winner = true;
      console.log(winner);
      console.log(`${player} (${choice}s) is the winner.`);
    }

    // 1st row X or O
    if (
      board[0].filter(isX).length === 3 ||
      board[1].filter(isX).length === 3 ||
      board[2].filter(isX).length === 3
    ) {
      declareWinner(playerOne, players[0].choice);
    } else if (
      board[0].filter(isO).length === 3 ||
      board[1].filter(isO).length === 3 ||
      board[2].filter(isO).length === 3
    ) {
      declareWinner(playerTwo, players[1].choice);
    } else if (checkColumns("X")) {
      declareWinner(playerOne, players[0].choice);
    } else if (checkColumns("O")) {
      declareWinner(playerTwo, players[1].choice);
    } else if (checkDiagonal("X")) {
      declareWinner(playerOne, players[0].choice);
    } else if (checkDiagonal("O")) {
      declareWinner(playerTwo, players[1].choice);
    } else if (checkForTie()) {
      tie = true;
      console.log("It's the cat's game.");
    }
  }

  function gameOver() {
    console.log("Game over.");
    // Actual function needs to disable all buttons and create
    // a New Game button
  }

  return { playRound, declareWinnerOrTie };
})();

playGame.playRound(2, 0);
playGame.playRound(1, 0);
playGame.playRound(2, 1);
playGame.playRound(1, 1);
playGame.playRound(0, 0);
playGame.playRound(2, 2);
playGame.playRound(1, 2);
playGame.playRound(0, 1);
playGame.playRound(0, 1);
