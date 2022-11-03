import './App.css'

const Square = (props: { value: number }) => {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

const Board = () => {
  return (
    <div>
      <div className="board-row">
        <Square value={0} />
        <Square value={1} />
        <Square value={2} />
      </div>
      <div className="board-row">
        <Square value={3} />
        <Square value={4} />
        <Square value={5} />
      </div>
      <div className="board-row">
        <Square value={6} />
        <Square value={7} />
        <Square value={8} />
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
