import styled from "styled-components";

import { IGameState } from "../types";
import Button from "./Button";

interface IGameOverModalProps {
  gameState: IGameState;
  onRestart: Function;
  onNewGame: Function;
}

export default function GameOverModal(props: IGameOverModalProps) {
  const {
    gameState: { players },
    onNewGame,
    onRestart,
  } = props;

  const sortedPlayers = Array.from(players).sort(
    (p1, p2) => p2.points - p1.points
  );

  const bestScore = sortedPlayers[0].points;
  const winners = sortedPlayers.filter((p) => p.points === bestScore);

  return (
    <GameOverModalWrapper>
      <Results>
        <Title>
          {players.length === 1
            ? "You win!"
            : winners.length === 1
            ? `Player ${winners[0].name} wins!`
            : "Tie!"}
        </Title>
        {sortedPlayers.map(({ name, points }, index) => (
          <PlayerResultWrapper
            key={name}
            winner={index === 0 && winners.length === 1}
          >
            <PlayerName>Player {name}</PlayerName>
            <PlayerScore>{points} Pairs</PlayerScore>
          </PlayerResultWrapper>
        ))}
        <Actions>
          <Button
            onClick={() => {
              onRestart();
            }}
          >
            Restart
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              onNewGame();
            }}
          >
            Setup New Game
          </Button>
        </Actions>
      </Results>
    </GameOverModalWrapper>
  );
}

const GameOverModalWrapper = styled.div`
  position: absolute;
  z-index: 100;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  padding: 1em;
  font-size: 1rem;
`;

const Results = styled.div`
  background: white;
  padding: 2em;
  width: 100%;

  & > * + * {
    margin-top: 1em;
  }
`;

const PlayerResultWrapper = styled.div<{ winner: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${(props) => (props.winner ? "#162938" : "#bbceda")};
  color: ${(props) => (props.winner ? "white" : "initial")};
  padding: 1em;
  border-radius: 10px;

  & + & {
    margin-top: 0.5em;
  }
`;

const PlayerName = styled.div``;
const PlayerScore = styled.div`
  margin-left: auto;
  font-size: 1.5em;
  font-weight: bold;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.5em;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
`;
