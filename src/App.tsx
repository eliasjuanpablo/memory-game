import Cell from "./components/Cell";
import { useGameManager } from "./hooks";
import "./App.css";

function App() {
  const {
    gameState: { cells },
    selectCell,
  } = useGameManager();

  return (
    <div className="wrapper">
      <div className="grid">
        {cells.map(({ value, status }, index) => (
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
  );
}

export default App;
