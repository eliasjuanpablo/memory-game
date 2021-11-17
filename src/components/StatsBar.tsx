import { IGameState, IPlayer } from "../types";
import "./StatsBar.css";

interface StatsBarProps {
  gameState: IGameState;
}

function Player(props: IPlayer & { name: string; selected: boolean }) {
  const { name, selected, points } = props;
  return (
    <>
      <div className={`player ${selected && "selected"}`}>
        <div className="player__name">{`P${name}`}</div>
        <div className="player__points">{points}</div>
        {selected && <div className="player__arrow player__arrow--tc"></div>}
      </div>
    </>
  );
}

export default function StatsBar(props: StatsBarProps) {
  const {
    gameState: { players, currentTurn },
  } = props;

  return (
    <div className="stats-wrapper">
      {players.length > 1 &&
        players.map(({ points }, i) => (
          <Player
            name={(i + 1).toString()}
            selected={currentTurn === i}
            points={points}
          />
        ))}
    </div>
  );
}
