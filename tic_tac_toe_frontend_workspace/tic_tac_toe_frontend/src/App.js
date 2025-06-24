import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main Tic Tac Toe game component with interactive gameplay,
   * two-player mode, winner detection, and restart functionality.
   */
  
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  // Check for winner after each move
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setGameOver(true);
    } else if (board.every(square => square !== null)) {
      setGameOver(true);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  const calculateWinner = (squares) => {
    /**
     * Calculate if there's a winner on the board.
     * Returns object with winner and winning line, or null if no winner.
     */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: lines[i]
        };
      }
    }
    return null;
  };

  // PUBLIC_INTERFACE
  const handleClick = (index) => {
    /**
     * Handle square click - make a move if valid.
     * @param {number} index - Index of the clicked square
     */
    if (board[index] || gameOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    /**
     * Reset the game to initial state.
     */
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameOver(false);
    setWinningLine([]);
  };

  // PUBLIC_INTERFACE
  const getGameStatus = () => {
    /**
     * Get the current game status message.
     * @returns {string} Status message
     */
    if (winner) {
      return `🎉 Player ${winner} Wins!`;
    } else if (gameOver) {
      return "🤝 It's a Draw!";
    } else {
      return `Player ${isXNext ? 'X' : 'O'}'s Turn`;
    }
  };

  // PUBLIC_INTERFACE
  const Square = ({ value, onClick, index }) => {
    /**
     * Individual square component for the tic tac toe board.
     * @param {string|null} value - X, O, or null
     * @param {function} onClick - Click handler
     * @param {number} index - Square index
     */
    const isWinningSquare = winningLine.includes(index);
    const squareClass = `square ${value ? value.toLowerCase() : ''} ${isWinningSquare ? 'winning' : ''}`;
    
    return (
      <button
        className={squareClass}
        onClick={onClick}
        disabled={value || gameOver}
        aria-label={`Square ${index + 1}, ${value || 'empty'}`}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">Tic Tac Toe</h1>
        
        <div className={`game-status ${winner ? 'winner' : 'current-player'}`}>
          {getGameStatus()}
        </div>

        <div className="game-board">
          {board.map((square, index) => (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
              index={index}
            />
          ))}
        </div>

        <div className="game-controls">
          <button className="btn" onClick={resetGame}>
            New Game
          </button>
        </div>

        <div className="game-info">
          <p>Two players take turns. Get three in a row to win!</p>
          <p>Player X always goes first.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
