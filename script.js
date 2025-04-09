 
const Player = (name, marker) => {
    return { name, marker };
  };
  
  // Gameboard Module
  const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const setCell = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, setCell, resetBoard };
  })();
  
  
  const GameController = (() => {
    const player1 = Player("Player 1", "X"); //player 1 with marker X
    const player2 = Player("Player 2", "O"); //Player 2 with marker O
    let currentPlayer = player1;
    let gameOver = false;
  
    const info = document.getElementById("info"); //to display game info
    const gameboardDiv = document.getElementById("gameboard");
    const restartBtn = document.getElementById("restart");
  
    const winningCombos = [
      [0, 1, 2], //top row
      [3, 4, 5], //middle row
      [6, 7, 8], // bottom rows
      [0, 3, 6], // first clm
      [1, 4, 7], //second clm
      [2, 5, 8], // third clm
      [0, 4, 8], //left diagonal
      [2, 4, 6], // right diagonals
    ];
  
    const renderBoard = () => {
      gameboardDiv.innerHTML = "";
      Gameboard.getBoard().forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell"); 
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => handleMove(index));
        gameboardDiv.appendChild(cellDiv);
      });
    };
  
    const handleMove = (index) => {
      if (gameOver || !Gameboard.setCell(index, currentPlayer.marker)) return;
      renderBoard();
      if (checkWin(currentPlayer.marker)) {
        info.textContent = `${currentPlayer.name} wins!`;
        gameOver = true;
      } else if (Gameboard.getBoard().every(cell => cell !== "")) {
        info.textContent = "It's a tie!";
        gameOver = true;
      } else {
        switchPlayer();
        info.textContent = `${currentPlayer.name}'s turn`;
      }
    };
  
    const checkWin = (marker) => {
      return winningCombos.some(combo =>
        combo.every(index => Gameboard.getBoard()[index] === marker)
      );
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  // reset game state
    const restartGame = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      gameOver = false;
      info.textContent = `${currentPlayer.name}'s turn`;
      renderBoard();
    };
  
    restartBtn.addEventListener("click", restartGame);
  
    
    info.textContent = `${currentPlayer.name}'s turn`;
    renderBoard();
  })();
  