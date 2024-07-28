// themeContext.js
import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

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
            main: mode === "pink" ? "#e91e63" : "#1976d2", 
          },
          secondary: {
            main: mode === "pink" ? "#f48fb1" : "#ff4081", 
          },
        },
        components: {
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === "pink" ? "#e91e63" : undefined, 
              },
            },
          },
        },
        typography: {
          fontFamily: '"Rubik", "Arial", sans-serif', // Add your font here
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
