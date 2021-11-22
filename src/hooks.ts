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
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      const newState = gm.checkMatch();
      setGameState(newState);
    }, checkDelay);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [selectedIndex, checkDelay, gm]);

  useEffect(() => {
    setGameState(gm.state);
  }, [gm]);

  function changeSettings(settings: IGameSettings) {
    const gm = new GameManager(settings);
    setGm(gm);
  }

  return { gameState, selectCell, changeSettings };
}
