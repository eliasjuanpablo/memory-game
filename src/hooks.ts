import { useEffect, useRef, useState } from "react";
import { GameManager } from "./domain";

export function useGameManager(size: number = 4, checkDelay: number = 2000) {
  const gm = useRef(new GameManager(size));
  const [gameState, setGameState] = useState(gm.current.state);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  function selectCell(index: number): void {
    const newState = gm.current.selectCell(index);
    setGameState(newState);
    setSelectedIndex(index);
  }

  useEffect(() => {
    if (selectedIndex) {
      setTimeout(() => {
        const newState = gm.current.checkMatch();
        setGameState(newState);
      }, checkDelay);
    }
  }, [selectedIndex, checkDelay]);

  return { gameState, selectCell };
}
