import React, { useState } from "react";
import styled from "styled-components";

import Cell from "./components/Cell";
import StatsBar from "./components/StatsBar";
import SettingsModal from "./components/SettingsModal";
import { useGameManager } from "./hooks";

function App() {
  const [showSettings, setShowSettings] = useState(true);
  const { gameState, selectCell, changeSettings } = useGameManager({});
  const {
    currentSettings: { size },
    cells,
  } = gameState;

  return (
    <Wrapper>
      {showSettings && (
        <SettingsModal
          changeSettings={changeSettings}
          onClose={() => {
            setShowSettings(false);
          }}
        />
      )}
      <Nav>
        <Brand>memory</Brand>
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
      <StatsBar gameState={gameState} />
    </Wrapper>
  );
}

const Nav = styled.nav`
  padding: 0 2em;
  display: flex;
  align-items: center;
`;

const Brand = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr 3fr;
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
