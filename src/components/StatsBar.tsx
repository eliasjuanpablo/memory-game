import styled from "styled-components";
import { IGameState, IPlayer } from "../types";

interface StatsBarProps {
  gameState: IGameState;
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
    gameState: { players, currentTurn },
  } = props;

  return (
    <Wrapper>
      {players.length > 1 &&
        players.map(({ points }, i) => (
          <Player
            key={i}
            name={(i + 1).toString()}
            selected={currentTurn === i}
            points={points}
          />
        ))}
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
  background: #bbceda;
  color: #31485a;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;

  ${(props) =>
    props.selected &&
    `
  background: #fea112;
  color: white;
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

  background-color: #fff;
  position: absolute;

  /* Position at the top center */
  left: 50%;
  top: 0px;

  /* Border */
  transform: translate(-50%, -50%) rotate(45deg);
  background-color: #fea112;
`;
