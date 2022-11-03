import { useCallback, useMemo, useState } from 'react';
import './App.css'

const Square = (props: { value: string, onClick: () => void }) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = () => {
  const calculateWinner = (squares: string[]) => {
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

  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(false);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const status = useMemo(
    () => winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O'),
    [xIsNext, winner]
  );

  const handleClick = useCallback(
    (i: number) => {
      const newSquares = squares.slice();
      if (winner || newSquares[i]) return;
      newSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
    },
    [xIsNext, squares, winner],
  )

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <div id="errors"></div>
      <div id="root">
        <Game />
      </div>
    </>
  );
}

export default App;
