import { useState } from "react";

function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: isHighlighted ? "yellow" : "white" }}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, lastMove }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isHighlighted={lastMove === 0}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isHighlighted={lastMove === 1}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isHighlighted={lastMove === 2}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isHighlighted={lastMove === 3}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isHighlighted={lastMove === 4}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isHighlighted={lastMove === 5}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isHighlighted={lastMove === 6}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isHighlighted={lastMove === 7}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isHighlighted={lastMove === 8}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, index) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setLastMove(index);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setLastMove(null);
  }

  const moves = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move > 0 ? `Go to move #${move}` : "Go to game start"}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          lastMove={lastMove}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}
