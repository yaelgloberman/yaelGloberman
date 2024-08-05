import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { themes } from "./constants";

const ThemeContext = createContext({
  mode: "blue",
  changeModeColor: () => {},
});

const themeKeys = Object.keys(themes);

const ThemeProvider = ({ children }) => {
  const [modeIndex, setModeIndex] = useState(0);

  const changeModeColor = () => {
    setModeIndex((prevModeIndex) => (prevModeIndex + 1) % themeKeys.length);
  };

  const mode = themeKeys[modeIndex];
  const primaryColor = themes[mode];

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: primaryColor,
          },
        },
        components: {
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: primaryColor,
              },
            },
          },
        },
        typography: {
          fontFamily: '"Heebo",  sans-serif',
        },
      }),
    [primaryColor]
  );

  return (
    <ThemeContext.Provider value={{ mode, changeModeColor }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

export const useTheme = () => useContext(ThemeContext);
