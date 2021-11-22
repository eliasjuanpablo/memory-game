import styled from "styled-components";

import { IGameState, IPlayer } from "../types";

interface StatsBarProps {
  gameState: IGameState;
  elapsedTime: string;
}

function Player(props: IPlayer & { name: string; selected: boolean }) {
  const { name, selected, points } = props;
  return (
    <>
      <PlayerWrapper selected={selected}>
        <Name>{`P${name}`}</Name>
        <Points>{points}</Points>
        {selected && <Arrow></Arrow>}
      </PlayerWrapper>
    </>
  );
}

export default function StatsBar(props: StatsBarProps) {
  const {
    gameState: { players, currentTurn, movesCount },
    elapsedTime,
  } = props;

  return (
    <Wrapper>
      {players.length > 1 ? (
        players.map(({ points, name }, i) => (
          <Player
            key={i}
            name={name}
            selected={currentTurn === i}
            points={points}
          />
        ))
      ) : (
        <>
          <Stat>
            <StatName>Moves</StatName>
            <StatValue>{movesCount}</StatValue>
          </Stat>
          <Stat>
            <StatName>Time</StatName>
            <StatValue>{elapsedTime}</StatValue>
          </Stat>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const PlayerWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 1.5em;
  background: ${(props) => props.theme.colors.grey};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;

  ${(props) =>
    props.selected &&
    `
  background: ${props.theme.colors.primary};
  color: ${props.theme.colors.neutral};
  `}

  & + & {
    margin-left: 1em;
  }
`;

const Name = styled.div``;
const Points = styled.div`
  font-size: 2rem;
`;

const Arrow = styled.div`
  /* Size */
  height: 16px;
  width: 16px;

  position: absolute;

  /* Position at the top center */
  left: 50%;
  top: 0px;

  /* Border */
  transform: translate(-50%, -50%) rotate(45deg);
  background: ${(props) => props.theme.colors.primary};
`;

const Stat = styled.div`
  padding: 1em 2em;
  background: ${(props) => props.theme.colors.grey};
  border-radius: 10px;
  text-align: center;
  font-weight: bold;

  & + & {
    margin-left: 1em;
  }
`;

const StatName = styled.div`
  color: ${(props) => props.theme.colors.secondary};
`;

const StatValue = styled.div`
  margin-top: 0.5em;
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.secondary};
`;
