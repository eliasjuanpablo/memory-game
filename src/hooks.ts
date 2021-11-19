import { useEffect, useState } from "react";
import { GameManager } from "./domain";
import { IGameSettings } from "./types";

export function useGameManager(
  settings: Partial<IGameSettings>,
  checkDelay: number = 2000
) {
  const [gm, setGm] = useState(new GameManager(settings));
  const [gameState, setGameState] = useState(gm.state);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  function selectCell(index: number): void {
    const newState = gm.selectCell(index);
    setGameState(newState);
    setSelectedIndex(index);
  }

  useEffect(() => {
    if (selectedIndex) {
      setTimeout(() => {
        const newState = gm.checkMatch();
        setGameState(newState);
      }, checkDelay);
    }
  }, [selectedIndex, checkDelay, gm]);

  useEffect(() => {
    setGameState(gm.state);
  }, [gm]);

  function changeSettings(settings: IGameSettings) {
    setGm(new GameManager(settings));
  }

  return { gameState, selectCell, changeSettings };
}
