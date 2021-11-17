import Cell from "./components/Cell";
import { useGameManager } from "./hooks";
import StatsBar from "./components/StatsBar";
import "./App.css";

function App() {
  const size = 6;
  const { gameState, selectCell } = useGameManager({ players: 3, size });

  return (
    <div className="wrapper">
      <nav>
        <div className="brand">memory</div>
        {/* <div className="menu">menu</div> */}
      </nav>
      <div className="grid-wrapper">
        <div
          className="grid"
          style={{
            fontSize: "0.6rem",
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
          }}
        >
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
