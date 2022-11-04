import { useCallback, useMemo, useState } from 'react';
import './App.css'

const Square = (props: { value: string, onClick: () => void, highLight?: boolean }) => {
  return (
    <button className="square" onClick={props.onClick} style={{ backgroundColor: props.highLight ? "blue" : ""}}>
      {props.value}
    </button>
  );
}

const Board = (props: { squares: string[], onClick: (i: number) => void , highLight: number[] | null }) => {
  return (
    <div>
      <div className="board-row">
        <Square value={props.squares[0]} onClick={() => props.onClick(0)} highLight={props.highLight?.includes(0)} />
        <Square value={props.squares[1]} onClick={() => props.onClick(1)} highLight={props.highLight?.includes(1)}  />
        <Square value={props.squares[2]} onClick={() => props.onClick(2)} highLight={props.highLight?.includes(2)}  />
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onClick={() => props.onClick(3)} highLight={props.highLight?.includes(3)} />
        <Square value={props.squares[4]} onClick={() => props.onClick(4)} highLight={props.highLight?.includes(4)} />
        <Square value={props.squares[5]} onClick={() => props.onClick(5)} highLight={props.highLight?.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onClick={() => props.onClick(6)} highLight={props.highLight?.includes(6)}  />
        <Square value={props.squares[7]} onClick={() => props.onClick(7)} highLight={props.highLight?.includes(7)}  />
        <Square value={props.squares[8]} onClick={() => props.onClick(8)} highLight={props.highLight?.includes(8)}  />
      </div>
    </div>
  );
}

const Game = () => {
  const calculateWinner = (squares: string[]): { winner: string, line: number[] } | null => {
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
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }

  const [history, setHistory] = useState<{ squares: string[] }[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState<boolean>(false);

  const current = useMemo(() => history[stepNumber], [history, stepNumber]);
  const winner = useMemo(() => calculateWinner(current.squares)?.winner, [current]);
  const winLine = useMemo(() => calculateWinner(current.squares)?.line ?? null, [current]);
  const status = useMemo(
    () => {
      if (winner)
        return 'Winner: ' + winner
      else
        return (stepNumber <= 9) ? 'Next player: ' + (xIsNext ? 'X' : 'O') : 'Draw';
    },
    [xIsNext, winner, stepNumber]
  );

  const jump = useCallback(
    (step: number) => {
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
    },
    []
  );
  const moves = useMemo(() => {
    return history.map((_, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jump(move)}>{desc}</button>
        </li>
      );
    });
  }, [history, jump]);

  const handleClick = useCallback(
    (i: number) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const newSquares = history[newHistory.length - 1].squares.slice();
      if (winner || newSquares[i]) return;
      newSquares[i] = xIsNext ? 'X' : 'O';
      setHistory(newHistory.concat({ squares: newSquares }));
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    },
    [history, stepNumber, xIsNext, winner],
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} highLight={winLine} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
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
