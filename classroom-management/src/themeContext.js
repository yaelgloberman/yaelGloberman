import React, { createContext, useState, useMemo } from "react";

// Style
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { BLUE, PINK } from "./constants";


const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "pink" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === "pink" ? "light" : mode,
          primary: {
            main: mode === "pink" ? PINK : BLUE, 
          },
        },
        components: {
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === "pink" ? PINK : BLUE, 
              },
            },
          },
        },
        typography: {
          fontFamily: '"Rubik", "Arial", sans-serif', 
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
