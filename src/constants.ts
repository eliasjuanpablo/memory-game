import { IGameSettings, ITheme } from "./types";

export const DEFAULT_SETTINGS: IGameSettings = {
  players: 1,
  size: 4,
};

export const theme: ITheme = {
  colors: {
    primary: "#fea112",
    secondary: "#31485a",
    grey: "#bbceda",
    neutral: "white",
  },
};
