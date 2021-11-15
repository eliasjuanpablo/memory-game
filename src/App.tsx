import Cell from "./components/Cell";
import { useGameManager } from "./hooks";
import "./App.css";

function App() {
  const {
    gameState: { cells },
    selectCell,
  } = useGameManager();

  return (
    <div className="App">
      {cells.map((c, index) => (
        <Cell
          key={index}
          {...c}
          onClick={() => {
            selectCell(index);
          }}
        />
      ))}
    </div>
  );
}

export default App;
