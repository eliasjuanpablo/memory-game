import Cell from "./components/Cell";
import { useGameManager } from "./hooks";
import StatsBar from "./components/StatsBar";
import "./App.css";

function App() {
  const { gameState, selectCell } = useGameManager({ players: 3 });

  return (
    <div className="wrapper">
      <nav>
        <div className="brand">memory</div>
        {/* <div className="menu">menu</div> */}
      </nav>
      <div className="grid-wrapper">
        <div className="grid">
          {gameState.cells.map(({ value, status }, index) => (
            <Cell
              key={index}
              value={value}
              status={status}
              onClick={() => {
                selectCell(index);
              }}
            />
          ))}
        </div>
      </div>
      <StatsBar gameState={gameState} />
    </div>
  );
}

export default App;
