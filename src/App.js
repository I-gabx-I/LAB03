import { useState } from "react"; // Hook para manejar estados en React

function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button
      className="square"
      onClick={onSquareClick} // Ejecuta la función al hacer clic
      style={{ backgroundColor: isHighlighted ? "yellow" : "white" }} // Resalta si es la última jugada
    >
      {value} {/* Muestra "X", "O" o null */}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, lastMove }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return; // No hace nada si hay ganador o la casilla está ocupada
    }
    const nextSquares = squares.slice(); // Crea una copia del estado actual
    nextSquares[i] = xIsNext ? "X" : "O"; // Asigna el símbolo según el turno
    onPlay(nextSquares, i); // Envía la jugada al componente padre
  }

  const winner = calculateWinner(squares); // Verifica si hay un ganador
  let status = winner
    ? `Winner: ${winner}` // Muestra el ganador
    : `Next player: ${xIsNext ? "X" : "O"}`; // Muestra de quién es el turno

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isHighlighted={lastMove === 0} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isHighlighted={lastMove === 1} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isHighlighted={lastMove === 2} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isHighlighted={lastMove === 3} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isHighlighted={lastMove === 4} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isHighlighted={lastMove === 5} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isHighlighted={lastMove === 6} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isHighlighted={lastMove === 7} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isHighlighted={lastMove === 8} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // Guarda el historial de tableros
  const [currentMove, setCurrentMove] = useState(0); // Índice del turno actual
  const [lastMove, setLastMove] = useState(null); // Última jugada realizada
  const xIsNext = currentMove % 2 === 0; // Determina si es el turno de X
  const currentSquares = history[currentMove]; // Tablero actual

  function handlePlay(nextSquares, index) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Crea nueva historia recortando si se volvió atrás
    setHistory(nextHistory); // Actualiza la historia
    setCurrentMove(nextHistory.length - 1); // Avanza al siguiente turno
    setLastMove(index); // Guarda la última jugada
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // Vuelve a un movimiento anterior
    setLastMove(null); // Quita el resaltado de jugadas pasadas
  }

  const moves = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move > 0 ? `Go to move #${move}` : "Go to game start"} {/* Botón para ir a un punto de la partida */}
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
        <ol>{moves}</ol> {/* Lista de movimientos */}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6], // Diagonales
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Retorna el símbolo ganador
    }
  }
  return null; // Si no hay ganador
}
