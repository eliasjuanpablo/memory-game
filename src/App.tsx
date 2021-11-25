import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useStopwatch } from "react-timer-hook";

import Cell from "./components/Cell";
import StatsBar from "./components/StatsBar";
import SettingsModal from "./components/SettingsModal";
import Button from "./components/Button";
import GameOverModal from "./components/GameOverModal";
import { theme } from "./constants";
import { GameManager } from "./domain";
import { useGameManager } from "./hooks";

function formatElapsed(seconds: number, minutes: number): string {
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export interface AppProps {
  gm?: GameManager;
  checkDelay?: number;
  useIcons?: boolean;
}

function App(props: AppProps) {
  const [showSettings, setShowSettings] = useState(true);
  const [useIcons, setUseIcons] = useState(props.useIcons || false);
  const { gameState, selectCell, changeSettings } = useGameManager(
    props.gm,
    props.checkDelay
  );
  const {
    currentSettings: { size, players },
    cells,
    finished,
  } = gameState;
  const { minutes, seconds, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  const [lastTime, setLastTime] = useState("");

  useEffect(() => {
    if (!showSettings && players === 1) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, showSettings]);

  useEffect(() => {
    if (finished) {
      setLastTime(formatElapsed(seconds, minutes));
      pause();
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function restartGame() {
    changeSettings(gameState.currentSettings);
    reset();
  }

  function newGame() {
    setShowSettings(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {finished && (
          <GameOverModal
            gameState={gameState}
            onRestart={restartGame}
            onNewGame={newGame}
            lastTime={lastTime}
          />
        )}
        {showSettings && (
          <SettingsModal
            changeSettings={(settings) => {
              const { useIcons, ...rest } = settings;
              setUseIcons(useIcons);
              changeSettings(rest);
            }}
            onClose={() => {
              setShowSettings(false);
            }}
            currentSettings={gameState.currentSettings}
          />
        )}
        <Nav>
          <Brand>memory</Brand>
          <Menu>
            <Button onClick={restartGame}>Restart</Button>
            <Button variant="secondary" onClick={newGame}>
              New Game
            </Button>
          </Menu>
        </Nav>
        <GridWrapper size={size}>
          <Grid size={size} data-testid="grid">
            {cells.map(({ value, status }, index) => (
              <Cell
                key={index}
                value={value}
                status={status}
                onClick={() => {
                  selectCell(index);
                }}
                useIcons={useIcons}
              />
            ))}
          </Grid>
        </GridWrapper>
        <StatsBar
          gameState={gameState}
          elapsedTime={formatElapsed(seconds, minutes)}
        />
      </Wrapper>
    </ThemeProvider>
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
