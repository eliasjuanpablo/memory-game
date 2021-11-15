import { useEffect, useState } from "react";
import { GameManager } from "./domain";

export function useGameManager(size: number = 4) {
  const [gameState, setGameState] = useState(GameManager.getInstance().state);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  function selectCell(index: number): void {
    const gm = GameManager.getInstance();
    const newState = gm.selectCell(index);
    setGameState(newState);
    setSelectedIndex(index);
  }

  useEffect(() => {
    if (selectedIndex) {
      setTimeout(() => {
        const gm = GameManager.getInstance();
        const newState = gm.checkMatch();
        setGameState(newState);
      }, 2000);
    }
  }, [selectedIndex]);

  return { gameState, selectCell };
}
