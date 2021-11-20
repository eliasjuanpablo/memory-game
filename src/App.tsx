import { useEffect, useState } from "react";
import styled from "styled-components";

import Cell from "./components/Cell";
import StatsBar from "./components/StatsBar";
import SettingsModal from "./components/SettingsModal";
import { useGameManager } from "./hooks";
import Button from "./components/Button";
import { useStopwatch } from "react-timer-hook";

function App() {
  const [showSettings, setShowSettings] = useState(true);
  const { gameState, selectCell, changeSettings } = useGameManager({});
  const {
    currentSettings: { size, players },
    cells,
    finished,
  } = gameState;
  const { minutes, seconds, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (!showSettings && players === 1) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, showSettings]);

  useEffect(() => {
    if (finished) {
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  return (
    <Wrapper>
      {showSettings && (
        <SettingsModal
          changeSettings={changeSettings}
          onClose={() => {
            setShowSettings(false);
          }}
          currentSettings={gameState.currentSettings}
        />
      )}
      <Nav>
        <Brand>memory</Brand>
        <Menu>
          <Button
            onClick={() => {
              changeSettings(gameState.currentSettings);
              reset();
            }}
          >
            Restart
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowSettings(true);
            }}
          >
            New Game
          </Button>
        </Menu>
      </Nav>
      <GridWrapper size={size}>
        <Grid size={size}>
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
        </Grid>
      </GridWrapper>
      <StatsBar
        gameState={gameState}
        elapsedTime={`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      />
    </Wrapper>
  );
}

const Nav = styled.nav`
  padding: 0 2em;
  display: flex;
  align-items: center;
  margin: auto;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Brand = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Menu = styled.div`
  display: flex;
  margin-left: auto;

  & > * + * {
    margin-left: 1em;
  }

  @media (max-width: 1024px) {
    margin-left: 3em;
    font-size: 0.75rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  max-width: 100vw;
`;

const GridWrapper = styled.div<{ size: number }>`
  display: block;
  margin: auto;

  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: ${(props) => props.size > 4 && "1.2rem"};
  }
`;

const Grid = styled.div<{ size: number }>`
  display: grid;
  gap: 0.5em 0.5em;
  max-width: 500px;
  grid-template-columns: ${(props) => `repeat(${props.size}, auto)`};
  grid-template-rows: ${(props) => `repeat(${props.size}, auto)`};
`;

export default App;
